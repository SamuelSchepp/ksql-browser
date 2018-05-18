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
const kafka_node_1 = require("kafka-node");
const Queue_1 = require("./Queue");
const Helper_1 = require("./Helper");
class KafkaNode {
    constructor() {
        this._clients = {};
        this._topics = {};
        this._consumers = {};
    }
    connect(topicList) {
        return __awaiter(this, void 0, void 0, function* () {
            yield new Promise((fulfill, reject) => {
                this._client = new kafka_node_1.KafkaClient({
                    kafkaHost: 'localhost:9092'
                });
                this._producer = new kafka_node_1.Producer(this._client);
                this._client.on('ready', () => {
                    fulfill();
                });
                this._client.on('error', (error) => {
                    reject(error);
                });
            });
            topicList.forEach((topicName) => {
                this.connectToTopic(topicName);
            });
        });
    }
    connectToTopic(topicName) {
        console.log(`Connecting to ${topicName}`);
        if (this.isConnectedToTopic(topicName)) {
            return;
        }
        this._clients[topicName] = new kafka_node_1.Client('localhost:2181/');
        this._topics[topicName] = new Queue_1.Queue();
        this._consumers[topicName] = new kafka_node_1.Consumer(this._clients[topicName], [
            {
                topic: topicName,
            },
        ], {
            autoCommit: true,
        });
        this._consumers[topicName].on('message', (message) => {
            console.log(`${topicName}: ${JSON.stringify(message, null, 4)}`);
            if (!message.value) {
                console.log(`error from ${topicName}: no value field`);
            }
            else {
                message.value.toString().split("\n").forEach((line) => {
                    var parsedData;
                    try {
                        parsedData = JSON.parse(line);
                    }
                    catch (err) {
                        console.log(`error parsing from ${topicName}: ${line}`);
                        parsedData = {};
                    }
                    this._topics[topicName].append(parsedData);
                });
            }
        });
        this._consumers[topicName].on('error', (error) => {
            console.log(`${topicName} error: ${JSON.stringify(error)}`);
            this._consumers[topicName].close(true, () => { });
            this._clients[topicName].close(() => { });
        });
        this._consumers[topicName].on('offsetOutOfRange', (error) => {
            console.log(`${topicName} error: ${JSON.stringify(error)}`);
            this._consumers[topicName].close(true, () => { });
            this._clients[topicName].close(() => { });
        });
    }
    isConnectedToTopic(topicName) {
        return Helper_1.isDefined(this._consumers[topicName]);
    }
    getTopicData(topicName) {
        if (this.isConnectedToTopic(topicName)) {
            return this._topics[topicName].dataReversed;
        }
        else {
            this.connectToTopic(topicName);
            return [];
        }
    }
    createTopic(topicName) {
        return new Promise((fulfill, reject) => {
            this._producer.createTopics([topicName], (err, data) => {
                if (err) {
                    console.log(err);
                    reject();
                }
                else {
                    console.log(`Created ${topicName}`);
                    this.connectToTopic(topicName);
                    fulfill();
                }
            });
        });
    }
    sendToTopic(topicName, data) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`sending to topic ${topicName}: ${JSON.stringify(data)}`);
            return new Promise((fulfil, reject) => {
                this._producer.send([{
                        topic: topicName,
                        messages: JSON.stringify(data)
                    }], (err, res) => {
                    if (err) {
                        reject(err);
                    }
                    console.log(`okay send to topic: ${JSON.stringify(res)}`);
                    fulfil();
                });
            });
        });
    }
    get client() {
        return this._client;
    }
    get counts() {
        const res = {};
        Object.keys(this._topics).forEach((topic) => {
            res[topic] = this._topics[topic].length;
        });
        return res;
    }
}
exports.KafkaNode = KafkaNode;
//# sourceMappingURL=KafkaNode.js.map