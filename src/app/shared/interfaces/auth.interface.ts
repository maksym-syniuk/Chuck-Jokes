import { User } from './../models/user.model';

export interface AuthInterface {
    token: string;
    user: User;
}
