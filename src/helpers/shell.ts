import { exec } from 'child_process';
import { MyContext } from '~src/middlewares';
import { IUsersModel } from '~src/models/users';

export const runShell = async (command: string, ctx: MyContext, ignoreAuth: boolean = false): Promise<string> => {
  let stdout: string;
  try {
    if (ignoreAuth) await checkPermissions(ctx);
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
      if (error) {
        reject(error);
      }
      if (stderr) {
        reject(stderr);
      }
      resolve(stdout);
    });
  });
};

const checkPermissions = async (ctx: MyContext) => {
  return new Promise(async (resolve, reject) => {
    const result: IUsersModel | undefined = await global.db.get(`SELECT * FROM 'USERS' WHERE id LIKE ${ctx.chat.id}`);
    if (result) resolve(true);
    else {
      reject('user is not authorized yet');
    }
  });
};

export default runShell;
