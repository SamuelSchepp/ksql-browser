import * as request from 'request-promise';

export class KSQLRest {
  private ksqlBase = 'http://localhost:8088';

  constructor() {

  }

  getURL(path: string): string {
    return this.ksqlBase + path;
  }

  async getStreams(): Promise<string[]> {
    const result = await this.runKSQLStatement('LIST STREAMS;');
    return result as string[];
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
      return result[0]['streams']['streams'];
    } catch (err) {
      console.log(JSON.stringify(err));
      return {};
    }
  }
}
