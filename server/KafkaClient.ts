import * as kafka from 'kafka-node';
import {Consumer, KafkaClient} from 'kafka-node';

export class KafkaClientWrapper {
  private _client: KafkaClient;
  private _topics: {[key: string]: string[]} = {};
  private RINGBUFFER_MAX = 20;

  async connect(topicList: string[]): Promise<void> {
    await new Promise<void>((fulfill, reject) => {
      this._client = new kafka.KafkaClient({
        kafkaHost: 'localhost:9092',
        connectTimeout: 3000,
        requestTimeout: 3000
      });
      this._client.on('ready', () => {
        fulfill();
      });
      this._client.on('error', (error) => {
        reject(error);
      });
    });

    topicList.forEach((topicName: string) => {
      let consumer = new Consumer(
        this._client,
        [
          {
            topic: topicName,
          },
        ],
        {
          autoCommit: false,
        },
      );
      consumer.on('message', (message) => {
        if (!this._topics[topicName]) {
          this._topics[topicName] = [];
          message.value.toString().split("\n").forEach((line) => {
            try {
              this._topics[topicName].push(JSON.parse(line));
            } catch (err) { }
          });
        }
        else {
          if (this._topics[topicName].length > this.RINGBUFFER_MAX) {
            this._topics[topicName].splice(0, 1);
          }
          message.value.toString().split("\n").forEach((line) => {
            try {
              this._topics[topicName].push(JSON.parse(line));
            } catch (err) { }
          });
        }
      });
    })
  }

  getTopicData(topicName: string): string[] {
    if(this._topics[topicName]) {
      return this._topics[topicName];
    }
    return [];
  }

  get client(): KafkaClient {
    return this._client;
  }
}
