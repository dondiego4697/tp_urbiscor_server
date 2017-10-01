export default class Base {
    data: any;
    keys: Array<string>;

    constructor(data: any, keys: Array<string>) {
        this.data = data;
        this.keys = keys;
    }

    getId() {
        return this.data.id;
    }

    checkImportantData(checkId?: boolean) {
        if (checkId && !this.data.id) {
            return false;
        }
        return this.keys.reduce((result, key) => {
            if (!this.data[key]) {
                return false;
            }
            return result;
        }, true);
    }
}
