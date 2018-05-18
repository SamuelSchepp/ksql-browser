"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Helper_1 = require("./Helper");
class Queue {
    constructor(size) {
        this._size = Helper_1.getOrDefault(size, 10000);
        this._data = [];
    }
    append(object) {
        this._data.push(object);
        while (this._data.length > this._size) {
            this._data.splice(0, 1);
        }
    }
    get data() {
        return this._data;
    }
    get length() {
        return this._data.length;
    }
}
exports.Queue = Queue;
//# sourceMappingURL=Queue.js.map