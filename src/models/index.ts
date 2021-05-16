import { createPasswordTable } from './password';
import { createUserTable } from './users';

export default (async () => {
  // call all create tables here
  await createUserTable();
  await createPasswordTable();
})();
