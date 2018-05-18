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
class KafkaProxy {
    static getURL(path) {
        return this.kafkaBase + path;
    }
    static kafkaProxy() {
        return (req, res, next) => {
            request({
                method: req.method,
                body: req.body,
                uri: KafkaProxy.getURL(req.path),
                json: true,
            }).then(topicList => {
                res.send(topicList);
            })
                .catch((error) => {
                res.send(error);
            });
        };
    }
    getTopics() {
        return __awaiter(this, void 0, void 0, function* () {
            const topicList = yield request({
                method: 'GET',
                uri: KafkaProxy.getURL('/topics'),
                json: true,
            });
            return topicList;
        });
    }
    postToTopic(topicName, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield request({
                method: 'POST',
                uri: KafkaProxy.getURL('/topics/' + topicName),
                headers: {
                    "Content-Type": "application/vnd.kafka.json.v2+json"
                },
                body: {
                    records: [
                        {
                            value: data
                        }
                    ]
                },
                json: true,
            });
            console.log(result);
        });
    }
}
KafkaProxy.kafkaBase = 'http://localhost:8082';
exports.KafkaProxy = KafkaProxy;
//# sourceMappingURL=KafkaProxy.js.map