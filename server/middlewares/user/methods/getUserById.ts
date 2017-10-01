import {sendData, SUCCESS, WRONG_PARAMS} from '../../../../src/support/http';
import UserDAO from '../../../../src/dao/UserDAO';
module.exports = (pool) => {
    return (req, res) => {
        const userId = req.params.userId;
        if (!userId) {
            sendData(res, WRONG_PARAMS({}));
            return;
        }
        UserDAO.getById(pool, userId).then(data => {
            sendData(res, SUCCESS(data));
        }).catch(err => {
            sendData(res, WRONG_PARAMS(err));
        })
    }
};