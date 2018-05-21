#!/usr/bin/env bash
CDIR=$(dirname "$0")

kafka-topics --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic users

kafka-topics --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic pageviews

cat "$CDIR/setup.ksql" | ksql
