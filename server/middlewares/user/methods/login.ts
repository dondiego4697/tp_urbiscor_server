import {OUser} from '../../../../src/models/User';
import {sendData, SUCCESS, WRONG_PARAMS} from '../../../../src/support/http';
import UserDAO from '../../../../src/dao/UserDAO';
import {code} from '../../../../src/support/token';
import createHash from '../../../../src/support/createHash';
module.exports = (pool) => {
    return (req, res) => {
        const user = new OUser(req.body);
        if (!user.checkImportantData()) {
            sendData(res, WRONG_PARAMS({}));
            return;
        }
        user.password = createHash(user.password);
        UserDAO.getUser(pool, user).then(data => {
            if (data.length > 0) {
                sendData(res, SUCCESS({
                    token: code({
                        login: data[0].login,
                        password: data[0].password
                    }),
                    id: data[0].id,
                    login: data[0].login
                }));
            } else {
                sendData(res, WRONG_PARAMS({}));
            }
        }).catch(err => {
            sendData(res, WRONG_PARAMS(err));
        })
    }
};