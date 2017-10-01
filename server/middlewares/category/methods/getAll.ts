import {sendData, SUCCESS, WRONG_PARAMS} from '../../../../src/support/http';
import CategoryDAO from "../../../../src/dao/CategoryDAO";
module.exports = (pool) => {
    return (req, res) => {
        CategoryDAO.getAll(pool).then(data => {
            sendData(res, SUCCESS(data));
        }).catch(err => {
            sendData(res, WRONG_PARAMS(err));
        })
    }
};