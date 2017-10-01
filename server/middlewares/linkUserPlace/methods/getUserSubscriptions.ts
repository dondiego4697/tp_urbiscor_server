import {sendData, SUCCESS, WRONG_PARAMS} from '../../../../src/support/http';
import LinkUserPlaceDAO from '../../../../src/dao/LinkUserPlaceDAO';
module.exports = (pool) => {
    return (req, res) => {
        const userId = req.params.userId;
        let {limit, offset, desc} = req.query;
        if (isNaN(Number(userId)) || isNaN(Number(limit)) || isNaN(Number(offset))) {
            sendData(res, WRONG_PARAMS({}));
            return;
        }
        desc = desc ? 'DESC' : '';
        LinkUserPlaceDAO.getUserSubscriptions(pool, userId, limit, offset, desc).then(data => {
            sendData(res, SUCCESS(data));
        }).catch(err => {
            sendData(res, WRONG_PARAMS(err));
        })
    }
};