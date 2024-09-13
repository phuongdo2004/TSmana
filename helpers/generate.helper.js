"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomNumber = exports.generateRandomString = void 0;
const generateRandomString = (length) => {
    const characterString = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
        result +=
            characterString.charAt(Math.floor(Math.random() * characterString.length));
    }
    return result;
};
exports.generateRandomString = generateRandomString;
const generateRandomNumber = (length) => {
    let result = "";
    let characterNumber = "0123456789";
    for (let i = 0; i < length; i++) {
        result += characterNumber.charAt(Math.floor(Math.random() * characterNumber.length));
    }
    return result;
};
exports.generateRandomNumber = generateRandomNumber;
