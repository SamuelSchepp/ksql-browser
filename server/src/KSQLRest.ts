import * as request from 'request-promise';
import {endpoint} from './Config';

export class KSQLRest {
  private ksqlBase = `http://${endpoint}:8088`;

  constructor() {

  }

  getURL(path: string): string {
    return this.ksqlBase + path;
  }

  async getStreams(): Promise<string[]> {
    const result = await this.runKSQLStatement('LIST STREAMS;');
    return result[0]['streams']['streams'] as string[];
  }

  async describe(name: string): Promise<any> {
    const result: any = await this.runKSQLStatement(`DESCRIBE extended ${name};`);
    return result[0];
  }

  private async runKSQLStatement(statement: string): Promise<any> {
    try {
      const result = await request(this.getURL('/ksql'), {
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
    } catch (err) {
      console.log(JSON.stringify(err));
      return {};
    }
  }
}
