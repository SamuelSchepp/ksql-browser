import request = require('request-promise');
import {Request, Response} from 'express';

export class KafkaHelper {
  private static kafkaBase = 'http://localhost:8082';

  static getURL(path: string): string {
    return this.kafkaBase + path;
  }

  static kafkaProxy() {
    return (req: Request, res: Response, next) => {
      request({
        method: req.method,
        body: req.body,
        uri: KafkaHelper.getURL(req.path),
        json: true,
      }).then(topicList => {
          res.send(topicList);
        })
        .catch((error) => {
          res.send(error);
        });
    };
  }
}
