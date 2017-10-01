import {OLinkUserPlace} from '../../../../src/models/LinkUserPlace';
import {sendData, SUCCESS, WRONG_PARAMS} from '../../../../src/support/http';
import LinkUserPlaceDAO from '../../../../src/dao/LinkUserPlaceDAO';
import PlaceDAO from '../../../../src/dao/PlaceDAO';
module.exports = (pool) => {
    return (req, res) => {
        const link = new OLinkUserPlace(req.body);
        if (!link.checkImportantData()) {
            sendData(res, WRONG_PARAMS({}));
            return;
        }

        PlaceDAO.getById(pool, link.placeId).then(data => {
            if (data.length > 0) {
                if (data[0].creator_id === link.userId) {
                    sendData(res, WRONG_PARAMS({detail: 'you are creator'}));
                    return;
                }
                LinkUserPlaceDAO.create(pool, link).then(data => {
                    sendData(res, SUCCESS(data));
                }).catch(err => {
                    sendData(res, WRONG_PARAMS(err));
                });
            } else {
                sendData(res, WRONG_PARAMS({}));
            }
        }).catch(err => {
            sendData(res, WRONG_PARAMS(err));
        });
    }
};