import {OCategory} from '../../../../src/models/Category';
import {sendData, SUCCESS, WRONG_PARAMS} from '../../../../src/support/http';
import CategoryDAO from '../../../../src/dao/CategoryDAO';
module.exports = (pool) => {
    return (req, res) => {
        const category = new OCategory(req.body);
        if (!category.checkImportantData()) {
            sendData(res, WRONG_PARAMS({}));
            return;
        }
        CategoryDAO.create(pool, category).then(data => {
            sendData(res, SUCCESS(data));
        }).catch(err => {
            sendData(res, WRONG_PARAMS(err));
        })
    }
};