import {OPlace} from '../../../../src/models/Place';
import {sendData, SUCCESS, WRONG_PARAMS} from '../../../../src/support/http';
import PlaceDAO from '../../../../src/dao/PlaceDAO';
import {readyPlaces} from "../../../../src/support/readyPlaces";
module.exports = (pool) => {
    return (req, res) => {
        const place = new OPlace(req.body);
        const id = place.getId();
        let updateData = place.getDataOnUpdate();
        if (Object.keys(updateData).length === 0) {
            sendData(res, WRONG_PARAMS('no arguments to update'));
            return;
        }
        const {userId} = req.body;
        if (!id || !userId || (place.point && !Array.isArray(place.point))) {
            sendData(res, WRONG_PARAMS({}));
            return;
        }
        PlaceDAO.update(pool, id, userId, updateData).then(data => {
            sendData(res, SUCCESS(readyPlaces(data)));
        }).catch(err => {
            sendData(res, WRONG_PARAMS(err));
        })
    }
};