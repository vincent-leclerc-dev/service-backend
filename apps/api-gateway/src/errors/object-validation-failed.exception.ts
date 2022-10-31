import { BadRequestException } from '@nestjs/common';

export default class ObjectValidationFailed extends BadRequestException {
  constructor(message: string) {
    super(message || 'Object Validation Failed');

    this.name = 'object-validation-failed';
  }
}
