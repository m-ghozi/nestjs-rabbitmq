import { Controller, Post, Body } from '@nestjs/common';
import { PublisherService } from '../services/publisher.service';
import { CreateMessageDto } from '../dto/message.dto';
import { Message } from '../interfaces/message.interface';

@Controller('messages')
export class MessageController {
  constructor(private readonly publisherService: PublisherService) {}

  @Post()
  async createMessage(
    @Body() createMessageDto: CreateMessageDto,
  ): Promise<Message> {
    return await this.publisherService.publishMessage(createMessageDto);
  }
}
