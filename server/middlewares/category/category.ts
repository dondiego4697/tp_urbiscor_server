const routerCategory = require('express').Router();
const getAllCategoryMiddleware = require('./methods/getAll');

module.exports = (pool) => {
    return routerCategory
        .get('/get-all/', getAllCategoryMiddleware(pool));
};