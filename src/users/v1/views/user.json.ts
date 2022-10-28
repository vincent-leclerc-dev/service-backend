/* eslint-disable no-underscore-dangle */
import { User } from '../../entities/user.entity';

export default function userToJSON(user: User) {
  const c: any = { ...user };

  delete c.created_at;
  delete c.updated_at;
  delete c.__v;

  return c;
}
