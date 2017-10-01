import {OUser} from '../../../../src/models/User';
import {sendData, SUCCESS, WRONG_PARAMS} from '../../../../src/support/http';
import UserDAO from '../../../../src/dao/UserDAO';
module.exports = (pool) => {
    return (req, res) => {
        const user = new OUser(req.body);
        if (!user.checkImportantData()) {
            sendData(res, WRONG_PARAMS({}));
            return;
        }
        UserDAO.create(pool, user).then(data => {
            sendData(res, SUCCESS(data));
        }).catch(err => {
            sendData(res, WRONG_PARAMS(err));
        })
    }
};