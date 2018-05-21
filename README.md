# KSQL Browser
*A express.js based Wrapper for Confluent.*

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