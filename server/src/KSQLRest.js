"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("request-promise");
class KSQLRest {
    constructor() {
        this.ksqlBase = 'http://localhost:8088';
    }
    getURL(path) {
        return this.ksqlBase + path;
    }
    getStreams() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.runKSQLStatement('LIST STREAMS;');
            return result[0]['streams']['streams'];
        });
    }
    describe(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.runKSQLStatement(`DESCRIBE extended ${name};`);
            return result[0];
        });
    }
    runKSQLStatement(statement) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield request(this.getURL('/ksql'), {
                    method: 'POST',
                    json: true,
                    headers: {
                        'Accept': 'application/json'
                    },
                    body: {
                        ksql: statement,
                        streamsProperties: {
                            'ksql.streams.auto.offset.reset': 'earliest',
                        },
                    },
                });
                return result;
            }
            catch (err) {
                console.log(JSON.stringify(err));
                return {};
            }
        });
    }
}
exports.KSQLRest = KSQLRest;
//# sourceMappingURL=KSQLRest.js.map