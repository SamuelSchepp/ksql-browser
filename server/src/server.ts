import * as express from 'express';
import {Consumer} from 'kafka-node';
import {KafkaNode} from './KafkaNode';
import {KafkaProxy} from './KafkaProxy';
import {Express} from 'express';
import {RequestError} from 'request-promise/errors';
import {KSQLRest} from './KSQLRest';

class Main {
  private router: Express;
  private kafkaProxy: KafkaProxy;
  private kafkaNode: KafkaNode;
  private ksqlRest: KSQLRest;

  async start() {
    this.router = express();
    this.router.use(express.json());

    this.ksqlRest = new KSQLRest();
    this.kafkaProxy = new KafkaProxy();
    this.kafkaNode = new KafkaNode();

    const topics = await this.kafkaProxy.getTopics();
    await this.kafkaNode.connect(topics);
    console.log("Kafka Wrapper connected");

    this.configureRouter(this.router);
    this.router.listen(8080, () => {
      console.log('http://localhost:8080/');
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
        await this.kafkaNode.createTopic(req.body.topic);
        res.send({message: 'okay'});
      } catch (err) {
        res.status(err);
        res.send(err)
      }
    });

    router.post('/topic/:id', async (req, res) => {
      try {
        const topic = await this.kafkaNode.sendToTopic(req.params.id, req.body);
        res.send({message: 'okay'});
      } catch (err) {
        res.status(err.response.statusCode);
        res.send(err)
      }
    });

    router.get('/streams', async (req, res) => {
      res.send(await this.ksqlRest.getStreams());
    });

    router.use('/', express.static(__dirname + '/../../client/dist'));
  }
}

new Main().start();



