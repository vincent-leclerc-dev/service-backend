import {
  Body, Controller, HttpStatus, Post, ServiceUnavailableException,
} from '@nestjs/common';

import {
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import EventsService from './events.service';
import CreateEventDto from './dto/create-event.dto';

@ApiTags('events')
@Controller({
  path: '/v1/events',
})
export default class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  @ApiOperation({ summary: 'Create an event' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'The event has been successfully created.' })
  @ApiResponse({ status: HttpStatus.SERVICE_UNAVAILABLE, description: 'Service Unavailable' })
  async create(@Body() body: CreateEventDto) {
    try {
      await this.eventsService.sendEvent(body);
      return { message: 'The event has been successfully created.' };
    } catch (e) {
      throw new ServiceUnavailableException();
    }
  }
}
