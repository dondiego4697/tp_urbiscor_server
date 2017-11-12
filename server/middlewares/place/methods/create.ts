import {OPlace} from '../../../../src/models/Place';
import {sendData, SUCCESS, WRONG_PARAMS} from '../../../../src/support/http';
import PlaceDAO from '../../../../src/dao/PlaceDAO';
import {readyPlaces} from "../../../../src/support/readyPlaces";
module.exports = (pool) => {
    return (req, res) => {
        const place = new OPlace(req.body);
        if (!place.checkImportantData() || !Array.isArray(place.point)) {
            sendData(res, WRONG_PARAMS({}));
            return;
        }
        PlaceDAO.create(pool, place).then(data => {
            sendData(res, SUCCESS(readyPlaces(data)));
        }).catch(err => {
            sendData(res, WRONG_PARAMS(err));
        })
    }
};