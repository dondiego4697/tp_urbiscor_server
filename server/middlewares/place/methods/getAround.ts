import {sendData, SUCCESS, WRONG_PARAMS} from '../../../../src/support/http';
import PlaceDAO from '../../../../src/dao/PlaceDAO';
import {readyPlaces} from "../../../../src/support/readyPlaces";
module.exports = (pool) => {
    return (req, res) => {
        const {lat, lng, limit, offset, step, category} = req.query;
        if (!lat || !lng || !limit || !offset || !step) {
            sendData(res, WRONG_PARAMS({}));
            return;
        }
        PlaceDAO.getAround(pool, [lat, lng], limit, offset, step, category).then(data => {
            sendData(res, SUCCESS(readyPlaces(data)));
        }).catch(err => {
            sendData(res, WRONG_PARAMS(err));
        })
    }
};