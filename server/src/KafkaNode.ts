import {Client, Consumer, KafkaClient, Producer} from 'kafka-node';
import {Queue} from './Queue';
import {isDefined, isNullOrUndefined} from './Helper';
import {endpoint} from './Config';

export class KafkaNode {
  private _clients: {[key: string]: Client} = {};
  private _topics: {[key: string]: Queue<string>} = {};
  private _consumers: {[key: string]: Consumer} = {};

  connect(topicList: string[]): void {
    topicList.forEach((topicName: string) => {
      this.connectToTopic(topicName);
    })
  }

  connectToTopic(topicName: string): void {
    if(this.isConnectedToTopic(topicName)) {
      return;
    }
    console.log(`Connecting to ${topicName}`);

    this._clients[topicName] = new Client(`${endpoint}:2181/`);
    this._topics[topicName] = new Queue<string>();

    this._consumers[topicName] = new Consumer(
      this._clients[topicName],
      [
        {
          topic: topicName,
          offset: 0
        },
      ],
      {
        autoCommit: true,
        fromOffset: true
      },
    );
    this._consumers[topicName].on('message', (message) => {
      // console.log(`${topicName}: ${JSON.stringify(message, null, 4)}`);
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
        console.log(`${topicName} consumer error: ${JSON.stringify(error)}`);
        this._consumers[topicName].close(true, () => { });
        this._clients[topicName].close(() => { });
        delete this._topics[topicName];
    });
    this._consumers[topicName].on('offsetOutOfRange', (error) => {
      console.log(`${topicName} consumer error: ${JSON.stringify(error)}`);
      this._consumers[topicName].close(true, () => {});
      this._clients[topicName].close(() => {});
      delete this._topics[topicName];
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

  get counts(): {[topic: string]: number}  {
    const res: {[topic: string]: number} = {};
    Object.keys(this._topics).forEach((topic) => {
      res[topic] = this._topics[topic].length;
    });
    return res;
  }
}
