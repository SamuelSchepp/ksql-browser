import * as request from 'request-promise';
import {endpoint} from './Config';
import * as http from 'http';
import {Socket} from 'socket.io';
import {isDefined} from './Helper';

export class KSQLRest {
  private port = 8088;
  private ksqlBase = `http://${endpoint}:${this.port}`;

  constructor() {

  }

  getURL(path: string): string {
    return this.ksqlBase + path;
  }

  async getStreams(): Promise<string[]> {
    const result = await this.runKSQLStatement('LIST STREAMS;');
    return result[0]['streams']['streams'] as string[];
  }

  async getTables(): Promise<string[]> {
    const result = await this.runKSQLStatement('LIST TABLES;');
    return result[0]['tables']['tables'] as string[];
  }

  async describe(name: string): Promise<any> {
    const result: any = await this.runKSQLStatement(`DESCRIBE extended ${name};`);
    return result[0];
  }

  async runKSQLStatement(statement: string): Promise<any> {
    try {
      const result = await request(this.getURL('/ksql'), {
        method: 'POST',
        json: true,
        headers: {
          'Accept': 'application/json',
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

  async runKSQLQuery(statement: string, socket: Socket): Promise<any> {
    return new Promise<any>((fulfill, reject) => {
      const postData = JSON.stringify({ksql: statement});
      const req = http.request({
        port: 8088,
        host: endpoint,
        path: '/query',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(postData)
        },
      }, (resp) => {
        resp.on('data', (chunk: Buffer) => {
          const res: string = chunk.toString('utf-8').trim();
          if(res.length > 0) {
            console.log(`<${res}>`);
            try {
              res.split('\n')
                .map(line => JSON.parse(line))
                .filter(line => isDefined(line.row))
                .forEach(line => socket.emit('result', line));
            } catch (err) {
              console.log(err);
            }
          }
        });

        resp.on('end', () => {
          console.log()
          socket.disconnect(true);
        });
      });

      req.on('error', (err) => {
        socket.emit('error', err);
        socket.disconnect(true);
      });

      req.write(postData);
      req.end();
    });
  }
}
