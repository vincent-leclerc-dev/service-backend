import {
  ApiProperty,
} from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsNotEmpty } from 'class-validator';

enum NotificationType {
  EmailNotifications = 'email_notifications',
  SmsNotifications = 'sms_notifications',
}
export default class ConsentDto {
  @ApiProperty({
    example: NotificationType.EmailNotifications,
  })
  @IsEnum(NotificationType)
  @IsNotEmpty()
    id: string;

  @ApiProperty({
    example: true,
  })
  @IsBoolean()
  @IsNotEmpty()
    enabled: boolean;
}
