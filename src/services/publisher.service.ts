import { Injectable, Logger } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { v4 as uuidv4 } from 'uuid';
import { Message } from '../interfaces/message.interface';
import { CreateMessageDto } from '../dto/message.dto';
import { rabbitmqConfig } from '../config/rabbitmq.config';

@Injectable()
export class PublisherService {
  private readonly logger = new Logger(PublisherService.name);

  constructor(private readonly amqpConnection: AmqpConnection) {}

  async publishMessage(createMessageDto: CreateMessageDto): Promise<Message> {
    const message: Message = {
      id: uuidv4(),
      content: createMessageDto.content,
      timestamp: new Date(),
    };

    try {
      await this.amqpConnection.publish(
        rabbitmqConfig.exchange,
        rabbitmqConfig.routingKey,
        message,
      );

      this.logger.log(`Message published successfully: ${message.id}`);
      return message;
    } catch (error) {
      this.logger.error(`Error publishing message: ${error.message}`);
      throw error;
    }
  }
}
