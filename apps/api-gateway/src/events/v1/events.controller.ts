import {
  Body, Controller, Post,
} from '@nestjs/common';

import {
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import EventsService from './events.service';
import CreateEventDto from './dto/create-event.dto';

@ApiTags('events')
@Controller({
  path: 'events',
  version: '1',
})
export default class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a event' })
  async create(@Body() body: CreateEventDto) {
    return this.eventsService.sendEvent(body);
  }
}
