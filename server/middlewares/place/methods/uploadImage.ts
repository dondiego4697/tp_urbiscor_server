import {sendData, SUCCESS, WRONG_PARAMS} from "../../../../src/support/http";
const fs = require('fs');

module.exports = (req, res) => {
    const placeId = req.params.placeId;
    if (isNaN(Number(placeId))) {
        sendData(res, WRONG_PARAMS({}));
        return;
    }

    const file = req.file;
    fs.writeFile(`${__dirname}/../../../../../places-image/place${placeId}.jpg`, file.buffer, 'utf8', (err) => {
        if (err) {
            sendData(res, WRONG_PARAMS(err));
            return;
        }
        sendData(res, SUCCESS({}));
    });
};