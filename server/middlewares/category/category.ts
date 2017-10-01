const routerCategory = require('express').Router();
const createCategoryMiddleware = require('./methods/create');
const updateCategoryMiddleware = require('./methods/update');
const getAllCategoryMiddleware = require('./methods/getAll');

module.exports = (pool) => {
    return routerCategory
        .post('/create/', createCategoryMiddleware(pool))
        .post('/update/', updateCategoryMiddleware(pool))
        .get('/getAll/', getAllCategoryMiddleware(pool));
};