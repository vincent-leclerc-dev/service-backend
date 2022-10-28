import { NotFoundException } from '@nestjs/common';

export default class ObjectNotFoundException extends NotFoundException {
  constructor(message: string) {
    super(message || 'Object Not Found');

    this.name = 'object-not-found';
  }
}
