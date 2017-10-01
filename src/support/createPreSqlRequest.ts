export default function (id: number, data: any) {
    let indexStr = [];
    let argsArr = [id];
    let keys = Object.keys(data);
    let keysStr = keys.reduce((result, key, index) => {
        argsArr.push(data[key]);
        indexStr.push(`$${index += 2}`);
        result.push(`${key}`);
        return result;
    }, []);
    return {
        indexStr: indexStr.join(', '),
        keysStr: keysStr.join(', '),
        argsArr
    }
}