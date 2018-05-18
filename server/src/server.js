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
const express = require("express");
const KafkaNode_1 = require("./KafkaNode");
const KafkaProxy_1 = require("./KafkaProxy");
const KSQLRest_1 = require("./KSQLRest");
class Main {
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            this.router = express();
            this.router.use(express.json());
            this.ksqlRest = new KSQLRest_1.KSQLRest();
            this.kafkaProxy = new KafkaProxy_1.KafkaProxy();
            this.kafkaNode = new KafkaNode_1.KafkaNode();
            const topics = yield this.kafkaProxy.getTopics();
            yield this.kafkaNode.connect(topics);
            console.log("Kafka Wrapper connected");
            this.configureRouter(this.router);
            this.router.listen(8080, () => {
                console.log('http://localhost:8080/');
            });
        });
    }
    configureRouter(router) {
        router.get('/topics', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const count = this.kafkaNode.counts;
            res.send(count);
        }));
        router.get('/topic/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const topic = this.kafkaNode.getTopicData(req.params.id);
            res.send(topic);
        }));
        router.post('/topic', (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.kafkaNode.createTopic(req.body.topic);
                res.send({ message: 'okay' });
            }
            catch (err) {
                res.status(err);
                res.send(err);
            }
        }));
        router.post('/topic/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const topic = yield this.kafkaNode.sendToTopic(req.params.id, req.body);
                res.send({ message: 'okay' });
            }
            catch (err) {
                res.status(err.response.statusCode);
                res.send(err);
            }
        }));
        router.get('/streams', (req, res) => __awaiter(this, void 0, void 0, function* () {
            res.send(yield this.ksqlRest.getStreams());
        }));
        router.use('/', express.static(__dirname + '/../../client/dist'));
    }
}
new Main().start();
//# sourceMappingURL=server.js.map