import { auth } from './routes/auth';
import { user } from './routes/user';
import { project } from './routes/project';
import { transaction } from './routes/transaction';

export const useDluznicek = {
	auth,
	user,
	project,
	transaction
};
