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


### Used interfaces

| Name          | Port | Usage                           |
|---------------|------|---------------------------------|
| Kafka Brokers | 9092 | Fetch topic list                |
| Zookeeper     | 2181 | Read topic stream               |
| Kafka REST    | 8082 | Create topic, send message      |
| KSQL REST     | 8088 | Run KSQL statements and queries |

## Live Demo

[http://195.201.227.204:8080/](http://195.201.227.204:8080/)

This demo instance has some some demo streams and one Twitter stream, which is configured with the keyword 'cloud'.
