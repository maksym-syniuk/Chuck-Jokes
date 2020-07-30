import { UserModel } from '../models/user.model';

export interface AuthInterface {
    token: string;
    user: UserModel;
}
