import {IPlace} from "../models/Place";

export function readyPlaces(arr : Array<IPlace>): Array<IPlace> {
    return arr.map(place => {
        let p = String(place.point);
        place.point = p.slice(6, p.length - 1).split(' ').map(Number);
        return place;
    });
}
