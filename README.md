To run this project clone the repository from github

in visual studio navigate to the root folder

open a terminal in the root

run the command: docker-compose up --build

you will need to create the topic once kafka and zookeeper have executed, in a new terminal run this command: 

docker exec -it datapipeline-kafka-1 kafka-topics --create --topic stock-price --bootstrap-server localhost:9092 --replication-factor 1 --partitions 1

you may need to run docker-compose up --build again

in a web browser navigate to localhost:3001 and to see my made up stock get a made up stock price every 5 seconds