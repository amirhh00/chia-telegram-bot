import { exec } from 'child_process';

export const runShell = async (command: string): Promise<string> => {
  let stdout: string;
  try {
    stdout = await executer(command);
    return stdout;
  } catch (error) {
    console.log('err:  ', error);
  }
};

const executer = (command: string): Promise<string> => {
  const isprod = process.env.NODE_ENV === 'production';
  const addSsh = isprod ? `ssh ${process.env.HOST_USER}@host.docker.internal "` : '';
  const chiaPath = process.env.CHIA_PATH ?? `/home/${process.env.HOST_USER}/chia-blockchain/activate`;
  const fullCommand = `${addSsh}. ${chiaPath} && ${command}${isprod ? `"` : ``}`;
  return new Promise((resolve, reject) => {
    exec(fullCommand, (error, stdout, stderr) => {
      if (stderr.toLowerCase()?.includes('permanently added')) {
        resolve('welcome');
      }
      if (stdout) {
        resolve(stdout);
      }
      if (stderr) {
        resolve(stderr);
      }
      if (error) {
        reject(error);
      }
    });
  });
};

export default runShell;
