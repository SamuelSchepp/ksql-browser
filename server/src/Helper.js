"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isNullOrUndefined(value) {
    return value === undefined || value === null;
}
exports.isNullOrUndefined = isNullOrUndefined;
function isDefined(value) {
    return !isNullOrUndefined(value);
}
exports.isDefined = isDefined;
function getOrDefault(optional, _default) {
    return isNullOrUndefined(optional) ? _default : optional;
}
exports.getOrDefault = getOrDefault;
//# sourceMappingURL=Helper.js.map