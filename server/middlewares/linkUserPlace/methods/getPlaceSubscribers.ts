import {sendData, SUCCESS, WRONG_PARAMS} from '../../../../src/support/http';
import LinkUserPlaceDAO from '../../../../src/dao/LinkUserPlaceDAO';
module.exports = (pool) => {
    return (req, res) => {
        const placeId = req.params.placeId;
        const {limit, offset} = req.query;
        if (isNaN(Number(placeId)) || isNaN(Number(limit)) || isNaN(Number(offset))) {
            sendData(res, WRONG_PARAMS({}));
            return;
        }

        LinkUserPlaceDAO.getPlaceSubscribers(pool, placeId, limit, offset).then(data => {
            sendData(res, SUCCESS(data));
        }).catch(err => {
            sendData(res, WRONG_PARAMS(err));
        })
    }
};