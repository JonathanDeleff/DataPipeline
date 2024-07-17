const kafka = require('kafka-node');
const Producer = kafka.Producer;
const client = new kafka.KafkaClient({ kafkaHost: process.env.KAFKA_BROKER });
const producer = new Producer(client);

producer.on('ready', () => {
  setInterval(() => {
    const price = (Math.random() * 100 + 100).toFixed(2); // Generates a price between 100 and 200
    const message = JSON.stringify({ symbol: 'JRDE', price });
    producer.send([{ topic: 'stock-price', messages: [message] }], (err, data) => {
      if (err) {
        console.error('Error sending message:', err);
      } else {
        console.log('Message sent:', data);
      }
    });
  }, 5000);
});

producer.on('error', (err) => {
  console.error('Producer error:', err);
});
