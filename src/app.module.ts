import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { PublisherService } from './services/publisher.service';
import { MessageController } from './controllers/message.controller';
import { rabbitmqConfig } from './config/rabbitmq.config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    RabbitMQModule.forRoot(RabbitMQModule, {
      uri: `amqp://${rabbitmqConfig.username}:${rabbitmqConfig.password}@${rabbitmqConfig.host}:${rabbitmqConfig.port}`,
      exchanges: [
        {
          name: rabbitmqConfig.exchange,
          type: 'direct',
        },
      ],
      channels: {
        default: {
          prefetchCount: 15,
          default: true,
        },
      },
      queues: [
        {
          name: rabbitmqConfig.queue,
          options: {
            durable: true,
            arguments: {
              'x-queue-type': 'quorum', // Explicitly set queue type as quorum
            },
          },
          exchange: rabbitmqConfig.exchange,
          routingKey: rabbitmqConfig.routingKey,
        },
      ],
    }),
  ],
  controllers: [MessageController],
  providers: [PublisherService],
})
export class AppModule {}
