const routerCategory = require('express').Router();
const createCategoryMiddleware = require('./methods/create');
const getAllCategoryMiddleware = require('./methods/getAll');

module.exports = (pool) => {
    return routerCategory
        .post('/create/', createCategoryMiddleware(pool))
        .get('/getAll/', getAllCategoryMiddleware(pool));
};