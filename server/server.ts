import * as express from 'express';
import {Consumer} from 'kafka-node';
import {KafkaClientWrapper} from './KafkaClient';
import {KafkaProxy} from './KafkaProxy';
import {Express} from 'express';
import {RequestError} from 'request-promise/errors';

class Main {
  private router: Express;
  private kafkaProxy: KafkaProxy;
  private kafkaClientWrapper: KafkaClientWrapper;

  async start() {
    this.router = express();
    this.router.use(express.json());

    this.kafkaProxy = new KafkaProxy();
    this.kafkaClientWrapper = new KafkaClientWrapper();

    const topics = await this.kafkaProxy.getTopics();
    await this.kafkaClientWrapper.connect(topics);
    console.log("Kafka Wrapper connected");

    this.configureRouter(this.router);
    this.router.listen(8080, () => {
      console.log('http://localhost:8080/');
    });
  }

  private configureRouter(router: Express) {
    router.get('/topics', async (req, res) => {
      const topicList = await this.kafkaProxy.getTopics();
      res.send(topicList)
    });

    router.get('/topic/:id', async (req, res) => {
      const topic = await this.kafkaClientWrapper.getTopicData(req.params.id);
      res.send(topic)
    });

    router.post('/topic/:id', async (req, res) => {
      try {
        const topic = await this.kafkaProxy.postToTopic(req.params.id, req.body);
        res.send({message: 'okay'});
      } catch (err) {
        res.status(err.response.statusCode);
        res.send(err)
      }
    });

    router.use('/', express.static(__dirname + '/../client/dist'));
  }
}

new Main().start();



