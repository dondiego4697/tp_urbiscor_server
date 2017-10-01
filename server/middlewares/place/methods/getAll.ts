import {sendData, SUCCESS, WRONG_PARAMS} from '../../../../src/support/http';
import PlaceDAO from '../../../../src/dao/PlaceDAO';
module.exports = (pool) => {
    return (req, res) => {
        let {limit, offset, desc} = req.query;
        if (isNaN(Number(limit)) || isNaN(Number(offset))) {
            sendData(res, WRONG_PARAMS({}));
            return;
        }
        desc = desc ? 'DESC' : '';
        PlaceDAO.getAll(pool, limit, offset, desc).then(data => {
            sendData(res, SUCCESS(data));
        }).catch(err => {
            sendData(res, WRONG_PARAMS(err));
        })
    }
};