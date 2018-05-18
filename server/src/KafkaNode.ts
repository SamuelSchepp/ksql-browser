import {Client, Consumer, KafkaClient, Producer} from 'kafka-node';
import {Queue} from './Queue';
import {isDefined, isNullOrUndefined} from './Helper';

export class KafkaNode {
  private _client: KafkaClient;
  private _producer: Producer;
  private _clients: {[key: string]: Client} = {};
  private _topics: {[key: string]: Queue<string>} = {};
  private _consumers: {[key: string]: Consumer} = {};

  async connect(topicList: string[]): Promise<void> {
    await new Promise<void>((fulfill, reject) => {
      this._client = new KafkaClient({
        kafkaHost: 'localhost:9092'
      });

      this._producer = new Producer(this._client);
      this._client.on('ready', () => {
        fulfill();
      });
      this._client.on('error', (error) => {
        reject(error);
      });
    });

    topicList.forEach((topicName: string) => {
      this.connectToTopic(topicName);
    })
  }

  connectToTopic(topicName: string): void {
    console.log(`Connecting to ${topicName}`);
    if(this.isConnectedToTopic(topicName)) {
      return;
    }

    this._clients[topicName] = new Client('localhost:2181/');
    this._topics[topicName] = new Queue<string>();

    this._consumers[topicName] = new Consumer(
      this._clients[topicName],
      [
        {
          topic: topicName,
        },
      ],
      {
        autoCommit: true,
      },
    );
    this._consumers[topicName].on('message', (message) => {
      console.log(`${topicName}: ${JSON.stringify(message, null, 4)}`);
      if(!message.value) {
        console.log(`error from ${topicName}: no value field`);
      } else {
        message.value.toString().split("\n").forEach((line) => {
          var parsedData: any;
          try {
            parsedData = JSON.parse(line)
          } catch (err) {
            console.log(`error parsing from ${topicName}: ${line}`);
            parsedData = {};
          }
          this._topics[topicName].append(parsedData);
        });
      }
    });
    this._consumers[topicName].on('error', (error) => {
      console.log(`${topicName} error: ${JSON.stringify(error)}`);
      this._consumers[topicName].close(true, () => {});
      this._clients[topicName].close(() => {});
    });
    this._consumers[topicName].on('offsetOutOfRange', (error) => {
      console.log(`${topicName} error: ${JSON.stringify(error)}`);
      this._consumers[topicName].close(true, () => {});
      this._clients[topicName].close(() => {});
    })
  }

  isConnectedToTopic(topicName: string): boolean {
    return isDefined(this._consumers[topicName])
  }

  getTopicData(topicName: string): string[] {
    if(this.isConnectedToTopic(topicName)) {
      return this._topics[topicName].dataReversed;
    } else {
      this.connectToTopic(topicName);
      return [];
    }
  }

  createTopic(topicName: string): Promise<void> {
    return new Promise<void>((fulfill, reject) => {
      this._producer.createTopics([topicName], (err, data) => {
        if(err) {
          console.log(err);
          reject();
        } else {
          console.log(`Created ${topicName}`);
          this.connectToTopic(topicName);
          fulfill();
        }
      });
    });
  }

  async sendToTopic(topicName: string, data: any): Promise<void> {
    console.log(`sending to topic ${topicName}: ${JSON.stringify(data)}`);
    return new Promise<void>((fulfil, reject) => {
      this._producer.send([{
        topic: topicName,
        messages: JSON.stringify(data)
      }], (err: Error, res: any) => {
        if(err) {
          reject(err);
        }
        console.log(`okay send to topic: ${JSON.stringify(res)}`);
        fulfil();
      });
    })
  }

  get client(): KafkaClient {
    return this._client;
  }

  get counts(): {[topic: string]: number}  {
    const res: {[topic: string]: number} = {};
    Object.keys(this._topics).forEach((topic) => {
      res[topic] = this._topics[topic].length;
    });
    return res;
  }
}
