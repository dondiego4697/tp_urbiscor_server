import Base from './Base';
export interface ICategory {
    id?: number,
    slug: string,
    name: string
}

export class OCategory extends Base implements ICategory{
    id: number;
    slug: string;
    name: string;

    constructor(data: ICategory){
        super(data, ['slug', 'name']);
        this.id = data.id;
        this.slug = data.slug;
        this.name = data.name;
    }

    getDataOnUpdate() {
        let hash = {};
        return ['slug', 'name'].reduce((result, item) => {
            if (this[item]) {
                let key = hash[item] ? hash[item] : item;
                result[key] = this[item];
            }
            return result;
        }, {});
    }
}
