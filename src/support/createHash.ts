const sha256 = require('js-sha256');
export default function (value) {
    return sha256(value);
}