const routerPlace = require('express').Router();
const createPlaceMiddleware = require('./methods/create');
const deletePlaceMiddleware = require('./methods/delete');
const updatePlaceMiddleware = require('./methods/update');
const getAllMiddleware = require('./methods/getAll');
const uploadPlaceImageMiddleware = require('./methods/uploadImage');
const getPlaceImageMiddleware = require('./methods/getPlaceImage');
const getAroundPlaceMiddleware = require('./methods/getAround');
const subscribeUserOnPlaceMiddleware = require('../linkUserPlace/methods/create');
const unsubscribeUserOnPlaceMiddleware = require('../linkUserPlace/methods/delete');
const getPlaceSubscribersMiddleware = require('../linkUserPlace/methods/getPlaceSubscribers');

const multer  = require('multer');
const storage = multer.memoryStorage({
    destination: function (req, file, cb) {
        cb(null, '/places-image');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname);
    }
});
const upload = multer({ storage: storage });

module.exports = (pool) => {
    return routerPlace
        .post('/create/', createPlaceMiddleware(pool))
        .get('/get-subscribers/:placeId', getPlaceSubscribersMiddleware(pool))
        .get('/get-around/', getAroundPlaceMiddleware(pool))
        .get('/get-all', getAllMiddleware(pool))
        .delete('/delete/', deletePlaceMiddleware(pool))
        .post('/update/', updatePlaceMiddleware(pool))
        .get('/subscribe/', subscribeUserOnPlaceMiddleware(pool))
        .get('/unsubscribe/', unsubscribeUserOnPlaceMiddleware(pool))
        .post('/upload-image/:placeId', upload.single('placeImage'), uploadPlaceImageMiddleware)
        .get('/get-image/:placeId', getPlaceImageMiddleware);
};