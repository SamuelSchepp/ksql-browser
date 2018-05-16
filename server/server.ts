import * as express from 'express';
import {KafkaHelper} from './kafka';
import * as kafka from 'kafka-node';
import {Consumer} from 'kafka-node';

const topics: {[key: string]: string[]} = {};

const router = express();
router.use(express.json());

const client = new kafka.KafkaClient({
  kafkaHost: 'localhost:9092',
  connectTimeout: 3000,
  requestTimeout: 3000
});
client.on('ready', () => {
  console.log('Kafka is ready.');
});
client.on('error', (error) => {
  console.log('Kafka is error: ' + error);
});

router.get('/topics', KafkaHelper.kafkaProxy());

router.get('/topic/:id', (req, res) => {
  if (topics[req.params.id]) {
    res.send(topics[req.params.id]);
  } else {
    let consumer = new Consumer(
      client,
      [
        {
          topic: req.params.id,
        },
      ],
      {
        autoCommit: false,
      },
    );
    consumer.on('message', (message) => {
      if (!topics[req.params.id]) {
        topics[req.params.id] = [];
        message.value.toString().split("\n").forEach((line) => {
          try {
            topics[req.params.id].push(JSON.parse(line));
          } catch (err) { }
        });
        res.send(topics[req.params.id]);
      }
      else {
        if (topics[req.params.id].length > 1000) {
          topics[req.params.id].splice(0, 1);
        }
        message.value.toString().split("\n").forEach((line) => {
          try {
            topics[req.params.id].push(JSON.parse(line));
          } catch (err) { }
        });
      }
    });
  }
});

router.use('/', express.static(__dirname + '/../client/dist'));

router.listen(8080, () => {
  console.log('http://localhost:8080/');
});
