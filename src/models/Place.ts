import Base from "./Base";
export interface IPlace {
    id?: number,
    creatorId: number,
    creator_id?: number,
    categoryId: number,
    category_id?: number,
    point: Array<number>
}

export class OPlace extends Base implements IPlace {
    id: number;
    creatorId: number;
    categoryId: number;
    point: Array<number>;

    constructor(data: IPlace){
        super(data, ['creatorId', 'categoryId', 'point']);
        this.id = data.id;
        this.creatorId = data.creatorId || data.creator_id;
        this.categoryId = data.categoryId || data.category_id;
        this.point = data.point;
    }

    getDataOnUpdate() {
        let hash = {
            categoryId: 'category_id'
        };
        return ['point', 'categoryId'].reduce((result, item) => {
            if (this[item]) {
                let key = hash[item] ? hash[item] : item;
                result[key] = this[item];
            }
            return result;
        }, {});
    }
}