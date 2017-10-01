import {sendData, SUCCESS, WRONG_PARAMS} from '../../../../src/support/http';
import PlaceDAO from '../../../../src/dao/PlaceDAO';
module.exports = (pool) => {
    return (req, res) => {
        let {id, userId} = req.body;
        if (!id || !userId) {
            sendData(res, WRONG_PARAMS({}));
            return;
        }
        PlaceDAO.delete(pool, id, userId).then(data => {
            sendData(res, SUCCESS(data));
        }).catch(err => {
            sendData(res, WRONG_PARAMS(err));
        })
    }
};