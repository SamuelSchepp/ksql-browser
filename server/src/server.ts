import * as express from 'express';
import {Consumer} from 'kafka-node';
import {KafkaNode} from './KafkaNode';
import {KafkaProxy} from './KafkaProxy';
import {Express} from 'express';
import {RequestError} from 'request-promise/errors';
import {KSQLRest} from './KSQLRest';
import {Server} from 'http';
import * as socket from "socket.io";

class Main {
  private server: Server;
  private router: Express;
  private kafkaProxy: KafkaProxy;
  private kafkaNode: KafkaNode;
  private ksqlRest: KSQLRest;

  async start() {
    console.log('┌────────────────────────┐');
    console.log('│ KSQL Browser           │');
    console.log('│ http://localhost:8080/ │');
    console.log('└────────────────────────┘');

    this.router = express();
    this.router.use(express.json());

    this.ksqlRest = new KSQLRest();
    this.kafkaProxy = new KafkaProxy();
    this.kafkaNode = new KafkaNode();

    const topics = await this.kafkaProxy.getTopics();
    await this.kafkaNode.connect(topics);
    console.log("Kafka Wrapper connected");

    this.configureRouter(this.router);
    this.server = this.router.listen(8080, () => {
      console.log("Ready.")
    });
    this.configureWebsockets(this.server);
  }

  private configureWebsockets(server: Server): void {
    let io = socket(server);
    io.on('connection', (socket) => {
      console.log('socket connected', socket.id);
      socket.on('query', ksql => {
        this.ksqlRest.runKSQLQuery(ksql, socket);
      });
      socket.on('disconnect', () => {
        console.log('socket disconnected', socket.id);
      })
    });
  }

  private configureRouter(router: Express) {
    router.get('/topics', async (req, res) => {
      const count: {[topic: string]: number} = this.kafkaNode.counts;
      res.send(count);
    });

    router.get('/topic/:id', async (req, res) => {
      const topic: string[] = this.kafkaNode.getTopicData(req.params.id);
      res.send(topic)
    });

    router.post('/topic', async (req, res) => {
      try {
        await this.kafkaProxy.createTopic(req.body.topic);
        await this.kafkaNode.connectToTopic(req.body.topic);
        res.send({message: 'okay'});
      } catch (err) {
        res.status(err);
        res.send(err)
      }
    });

    router.post('/topic/:id', async (req, res) => {
      try {
        const topic = await this.kafkaProxy.postToTopic(req.params.id, req.body);
        await this.kafkaNode.connectToTopic(req.params.id);
        res.send({message: 'okay'});
      } catch (err) {
        res.status(500);
        res.send(err)
      }
    });

    router.get('/streams', async (req, res) => {
      res.send(await this.ksqlRest.getStreams());
    });

    router.get('/tables', async (req, res) => {
      res.send(await this.ksqlRest.getTables());
    });

    router.get('/describe/:name', async (req, res) => {
      res.send(await this.ksqlRest.describe(req.params.name));
    });

    router.post('/ksql', async (req, res) => {
      const result = await this.ksqlRest.runKSQLStatement(req.body.ksql);
      res.send(result[0]);
    });

    router.use('/', express.static(__dirname + '/../../client/dist'));
    router.use('/*', express.static(__dirname + '/../../client/dist'));
  }
}

new Main().start();



