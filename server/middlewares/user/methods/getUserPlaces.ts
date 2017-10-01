import {sendData, SUCCESS, WRONG_PARAMS} from '../../../../src/support/http';
import PlaceDAO from '../../../../src/dao/PlaceDAO';
module.exports = (pool) => {
    return (req, res) => {
        const userId = req.params.userId;
        const {limit, offset} = req.query;
        if (isNaN(Number(userId)) || isNaN(Number(limit)) || isNaN(Number(offset))) {
            sendData(res, WRONG_PARAMS({}));
            return;
        }

        PlaceDAO.getUserPlaces(pool, userId, limit, offset).then(data => {
            sendData(res, SUCCESS(data));
        }).catch(err => {
            sendData(res, WRONG_PARAMS(err));
        })
    }
};