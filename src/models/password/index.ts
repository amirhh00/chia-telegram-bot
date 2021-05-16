const QUERY = `CREATE TABLE IF NOT EXISTS PASSWORDS (id INTEGER PRIMARY KEY AUTOINCREMENT, password nvarchar(50));`;

export const createPasswordTable = async () => {
  try {
    await global.db.exec(QUERY);
  } catch (error) {
    console.log('❌ err: ', error);
  }
};

export interface IPasswordModel {
  id: number;
  password: string;
}
