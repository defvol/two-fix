# two-fix

A remake of [osmlab/to-fix](https://github.com/osmlab/to-fix-backend)

## Local setup

Get [docker](http://www.docker.com/).

Spin up an instance of Elasticsearch by running a container with the [official Elasticsearch image](https://hub.docker.com/_/elasticsearch/)
```
➜ docker pull elasticsearch
➜ docker run --rm -p 9200:9200 -p 9300:9300 --name=es elasticsearch
```

Test that port binding is OK, i.e. that you can connect to Elasticsearch
```
➜ docker ps
➜ docker port es
➜ curl localhost:9200
```

To stop Elasticsearch type Ctrl-C on the previous terminal or `docker stop es`.

NOTE for [Mac users](https://docs.docker.com/docker-for-mac/docker-toolbox/#/setting-up-to-run-docker-for-mac):
To get the IP of your virtualized docker host type `env | grep DOCKER`, e.g. 192.168.99.100.

## Running

```
➜ ES_HOST=192.168.99.100:9200 npm start
```

## API

#### GET /

```
➜ curl localhost:3000
[]
```

#### POST /tasks

```
➜ curl -X POST -d '{"a":1}' --header "Content-Type:application/json" localhost:3000/tasks
received 1 tasks
➜ curl -X POST --data-binary @test/fixtures/unconnected-highways.json --header "Content-Type:application/json" localhost:3000/tasks
received 5573 tasks
```

## Testing

```
ES_HOST=192.168.99.100:9200 npm test
```
