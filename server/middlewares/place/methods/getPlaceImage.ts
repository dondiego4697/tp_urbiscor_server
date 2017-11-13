import {sendData, WRONG_PARAMS} from "../../../../src/support/http";
const fs = require('fs');

module.exports = (req, res) => {
    const placeId = req.params.placeId;
    if (isNaN(Number(placeId))) {
        sendData(res, WRONG_PARAMS({}));
        return;
    }

    fs.readFile(`${__dirname}/../../../../../places-image/place${placeId}.jpg`, (err, data) => {
        if (err) {
            sendData(res, WRONG_PARAMS({}));
            return;
        }

        res
            .set('Content-Type', 'image/jpeg')
            .status(200)
            .send(data);
    });
};