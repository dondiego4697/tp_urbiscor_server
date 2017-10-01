const routerPlace = require('express').Router();
const createPlaceMiddleware = require('./methods/create');
const deletePlaceMiddleware = require('./methods/delete');
const updatePlaceMiddleware = require('./methods/update');
const getAllMiddleware = require('./methods/getAll');
const getAroundPlaceMiddleware = require('./methods/getAround');
const subscribeUserOnPlaceMiddleware = require('../linkUserPlace/methods/create');
const unsubscribeUserOnPlaceMiddleware = require('../linkUserPlace/methods/delete');
const getPlaceSubscribersMiddleware = require('../linkUserPlace/methods/getPlaceSubscribers');


//TODO create methods: 1) add photos
module.exports = (pool) => {
    return routerPlace
        .post('/create/', createPlaceMiddleware(pool))
        .get('/get-subscribers/:placeId', getPlaceSubscribersMiddleware(pool))
        .get('/get-around/', getAroundPlaceMiddleware(pool))
        .get('/get-all', getAllMiddleware(pool))
        .delete('/delete/', deletePlaceMiddleware(pool))
        .post('/update/', updatePlaceMiddleware(pool))
        .get('/subscribe/', subscribeUserOnPlaceMiddleware(pool))
        .get('/unsubscribe/', unsubscribeUserOnPlaceMiddleware(pool));
};