const TokenSigner = require('jwt-js').TokenSigner;
const decodeToken = require('jwt-js').decodeToken;
const rawPrivateKey = '278a5de700e29faae8e40e366ec5012b5ec63d36ec77e8a2417154cc1d25383f';

export function code(tokenPayload) {
    return new TokenSigner('ES256k', rawPrivateKey).sign(tokenPayload);
}

export function decode(token) {
    return decodeToken(token);
}