"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const environment_1 = require("../common/environment");
const users_model_1 = require("../99 - users/users.model");
exports.tokenParser = (req, res, next) => {
    const token = extractToken(req);
    if (token) {
        jwt.verify(token, environment_1.environment.security.apiSecret, applyBearer(req, next));
    }
    else {
        next();
    }
};
function extractToken(req) {
    // Authorization: Bearer TOKEN
    let token = undefined;
    const authorization = req.header('authorization');
    if (authorization) {
        const parts = authorization.split(' ');
        if (parts.length === 2 && parts[0] === 'Bearer') {
            token = parts[1];
        }
    }
    return token;
}
function applyBearer(req, next) {
    return (error, decoded) => {
        if (decoded) {
            users_model_1.User.findByEmail(decoded.sub).then(user => {
                // associar o usuário no request
                if (user) {
                    req.authenticated = user;
                }
                next();
            }).catch(next);
        }
        else {
            next();
        }
    };
}
