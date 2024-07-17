const kafka = require('kafka-node');
const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const { KafkaClient, Consumer } = kafka;

const client = new KafkaClient({ kafkaHost: 'kafka:9092' });
const consumer = new Consumer(
  client,
  [{ topic: 'stock-price', partition: 0 }],
  { autoCommit: true }
);

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.static('public')); // Serve static files from the "public" folder

wss.on('connection', (ws) => {
  console.log('Client connected');
  
  consumer.on('message', (message) => {
    ws.send(message.value);
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
