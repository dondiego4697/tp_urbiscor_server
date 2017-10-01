const PORT = process.env.PORT || 3000;
const express = require('express');
const bodyParser = require('body-parser');
const {CONFIG} = require('./db-config');
const userMiddleware = require('./middlewares/user/user');
const categoryMiddleware = require('./middlewares/category/category');
const placeMiddleware = require('./middlewares/place/place');

const {Pool} = require('pg');

const pool = new Pool(
    CONFIG.database
);

const app = express()
    .use(bodyParser.json())
    .use('/api/user/', userMiddleware(pool))
    .use('/api/category/', categoryMiddleware(pool))
    .use('/api/place/', placeMiddleware(pool));

app.use('/build', express.static('build'));
app.use('/static', express.static('src/static'));

const server = app.listen(PORT, () => {
    console.log(`Server listen ${PORT} port`)
});

module.exports = server;