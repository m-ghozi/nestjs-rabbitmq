export const rabbitmqConfig = {
  host: process.env.RABBITMQ_HOST || 'localhost',
  port: parseInt(process.env.RABBITMQ_PORT) || 5672,
  username: process.env.RABBITMQ_USERNAME || 'guest',
  password: process.env.RABBITMQ_PASSWORD || 'guest',
  queue: process.env.RABBITMQ_QUEUE || 'tes_nest',
  exchange: process.env.RABBITMQ_EXCHANGE || 'messages_exchange',
  routingKey: process.env.RABBITMQ_ROUTING_KEY || 'tes_nest',
};
