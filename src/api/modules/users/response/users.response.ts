import { ApiProperty } from '@nestjs/swagger';
import { $Enums, User } from '@prisma/client';

type UserResponseType = Omit<User, 'password'>;

export class UserResponse implements UserResponseType {
  @ApiProperty()
  id: number;

  @ApiProperty()
  email: string;

  @ApiProperty({ enum: ['USER', 'ORGANIZER'] })
  role: $Enums.Role;
}
