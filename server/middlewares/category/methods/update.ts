import {OCategory} from '../../../../src/models/Category';
import {sendData, SUCCESS, WRONG_PARAMS} from '../../../../src/support/http';
import CategoryDAO from '../../../../src/dao/CategoryDAO';
module.exports = (pool) => {
    return (req, res) => {
        const category = new OCategory(req.body);
        const id = category.getId();
        let updateData = category.getDataOnUpdate();
        if (Object.keys(updateData).length === 0) {
            sendData(res, WRONG_PARAMS('no arguments to update'));
            return;
        }
        if (!id) {
            sendData(res, WRONG_PARAMS({}));
            return;
        }
        CategoryDAO.update(pool, id, updateData).then(data => {
            sendData(res, SUCCESS(data));
        }).catch(err => {
            sendData(res, WRONG_PARAMS(err));
        })
    }
};