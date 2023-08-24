import { ApiProperty } from '@nestjs/swagger';

import { UserResponse } from '../../users/response/users.response';

export class LoginResponse {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  user: UserResponse;
}
