import {OLinkUserPlace} from '../../../../src/models/LinkUserPlace';
import {sendData, SUCCESS, WRONG_PARAMS} from '../../../../src/support/http';
import LinkUserPlaceDAO from '../../../../src/dao/LinkUserPlaceDAO';
module.exports = (pool) => {
    return (req, res) => {
        const link = new OLinkUserPlace(req.query);
        if (!link.checkImportantData()) {
            sendData(res, WRONG_PARAMS({}));
            return;
        }
        LinkUserPlaceDAO.delete(pool, link).then(data => {
            sendData(res, SUCCESS(data));
        }).catch(err => {
            sendData(res, WRONG_PARAMS(err));
        })
    }
};