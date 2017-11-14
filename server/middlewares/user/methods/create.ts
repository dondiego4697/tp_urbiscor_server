import {OUser} from '../../../../src/models/User';
import {sendData, SUCCESS, WRONG_PARAMS} from '../../../../src/support/http';
import UserDAO from '../../../../src/dao/UserDAO';
import createHash from '../../../../src/support/createHash';
import {code} from '../../../../src/support/token';
module.exports = (pool) => {
    return (req, res) => {
        const user = new OUser(req.body);
        if (!user.checkImportantData()) {
            sendData(res, WRONG_PARAMS({}));
            return;
        }
        user.password = createHash(user.password);
        UserDAO.create(pool, user).then(data => {
            sendData(res, SUCCESS({
                token: code({
                    login: data[0].login,
                    password: data[0].password
                }),
                id: data[0].id,
                login: data[0].login
            }));
        }).catch(err => {
            sendData(res, WRONG_PARAMS(err));
        })
    }
};