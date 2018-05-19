import {Request, Response} from 'express';
import * as request from 'request-promise';
import {endpoint} from './Config';

export class KafkaProxy {
  private static kafkaBase = `http://${endpoint}:8082`;

  static getURL(path: string): string {
    return this.kafkaBase + path;
  }

  static kafkaProxy() {
    return (req: Request, res: Response, next: () => void) => {
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

  async getTopics(): Promise<string[]> {
    const topicList = await request({
      method: 'GET',
      uri: KafkaProxy.getURL('/topics'),
      json: true,
    });

    return topicList as string[];
  }

  async postToTopic(topicName: string, data: any): Promise<void> {
    const result = await request({
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
  }
}
