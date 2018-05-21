# KSQL Browser
*A express.js based Wrapper for Confluent.*

![screenshot 2018-05-21 13 34 41](https://user-images.githubusercontent.com/11752441/40310973-c7bd7c12-5d0e-11e8-9c54-4501ec01f4f3.png)

## Instructions

### Install
* Node v8.9.0 (LTS)

### Build & Run
`./run.sh`

The script builds the client frontend (Angular 5) and the server (Node.js app).

### Access

[http://localhost:8080/](http://localhost:8080/)

## Features

* Browse topics
	* Live feed
	* Create topics
	* Send data to topics
* Browse streams and tables
	* Get description and definitions
	* Live feed
* KSQL
	* Run statements
	* Run live queries
	
![screenshot 2018-05-21 13 37 34](https://user-images.githubusercontent.com/11752441/40310999-d93c545e-5d0e-11e8-8a7c-d4184a4a90d1.png)


## API

### REST Interface

| Method | URL | Body | Result |
|---|---|---|---|
| GET | /| | Angular frontend app |
| GET | /topics | | List of topics with message counts |
| GET | /topic/:id | | List of akkumulated topic messages (max 100 records) |
| POST | /topic | `{ "topic": "<name>" }` The new topic name (string) | Creates a new topic |
| POST | /topic/:id | `{ <any> }`The data to post to topic | Posts the request body to the topic |
| GET | /streams | | List of streams |
| GET | /tables | | List of tables |
| GET | /describe/:name | | Results of `DESCRIBE extended <name>;` |
| POST | /ksql | `{ "ksql": "<some statement>" }` | Results of running KSQL command as statement |

### Socket.io Interface
| Request Event | Request Payload | Result Event | Result Payload | Description |
|---|---|---|---|---|
| query | `"<ksql>"` (string)| result | JavaScript object | One message per record OR a message object, indicating that the stream is done |
| | | disconnect |  | End of stream reached |

## Confluent interfaces usage

| Name          | Port | Usage                           |
|---------------|------|---------------------------------|
| Kafka Brokers | 9092 | Fetch topic list                |
| Zookeeper     | 2181 | Read topic stream               |
| Kafka REST    | 8082 | Create topic, send message      |
| KSQL REST     | 8088 | Run KSQL statements and queries |

## Live Demo

[http://195.201.227.204:8080/](http://195.201.227.204:8080/)

This demo instance has some some demo streams and one Twitter stream, which is configured with the keyword 'cloud'.
