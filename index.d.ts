import {User} from './99 - users/users.model';

declare module 'restify' {
    export interface Request {
        authenticated: User
    }
}