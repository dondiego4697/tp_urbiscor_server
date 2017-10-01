import Base from "./Base";
export interface ILinkUserPlace {
    id?: number,
    userId: number,
    user_id?: number,
    placeId: number,
    place_id?: number
}

export class OLinkUserPlace extends Base implements ILinkUserPlace {
    id: number;
    userId: number;
    placeId: number;

    constructor(data: ILinkUserPlace){
        super(data, ['userId', 'placeId']);
        this.id = data.id;
        this.userId = data.userId || data.user_id;
        this.placeId = data.placeId || data.place_id;
    }
}