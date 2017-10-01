const routerUser = require('express').Router();
const createUserMiddleware = require('./methods/create');
const getUserPlacesMiddleware = require('./methods/getUserPlaces');
const getUserSubscriptionsMiddleware = require('../linkUserPlace/methods/getUserSubscriptions');

module.exports = (pool) => {
    return routerUser
        .get('/get-subscriptions/:userId', getUserSubscriptionsMiddleware(pool))
        .get('/get-places/:userId', getUserPlacesMiddleware(pool))
        .post('/create/', createUserMiddleware(pool));
};