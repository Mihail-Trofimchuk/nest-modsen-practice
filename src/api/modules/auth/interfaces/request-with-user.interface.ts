import { Request } from 'express';

import { UserResponse } from '../../users/response/users.response';

export default interface RequestWithUser extends Request {
  user: UserResponse;
}
