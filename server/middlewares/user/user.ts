const routerUser = require('express').Router();
const createUserMiddleware = require('./methods/create');

module.exports = (pool) => {
    return routerUser
        .post('/create/', createUserMiddleware(pool));
};