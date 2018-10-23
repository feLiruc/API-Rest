import * as restify from 'restify';
import * as jwt from 'jsonwebtoken';
import {environment} from '../common/environment';
import {User} from '../99 - users/users.model';

export const tokenParser: restify.RequestHandler =  (
    req: restify.Request, res: restify.Response, next
) => {
    const token = extractToken(req);
    if (token) {
        jwt.verify(token, environment.security.apiSecret, applyBearer(req, next))
    } else {
        next();
    }
};

function extractToken(req: restify.Request) {
    // Authorization: Bearer TOKEN
    let token = undefined
    const authorization = req.header('authorization');
    if (authorization) {
        const parts: string[] = authorization.split(' ');
        if (parts.length === 2 && parts[0] === 'Bearer') {
            token = parts[1];
        }
    }

    return token;
}

function applyBearer(req: restify.Request, next): (error, decoded) => void {
    return (error, decoded) => {
        if (decoded) {
            User.findByEmail(decoded.sub).then(user => {
                // associar o usuário no request
                if (user) {
                    req.authenticated = user;
                }
                next();
            }).catch(next);
        } else {
            next()
        }
    }
}