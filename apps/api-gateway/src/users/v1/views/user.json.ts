/* eslint-disable no-underscore-dangle */
import { User } from '../../../../../models/user.entity';

export default function userToJSON(user: User) {
  const usr: any = { ...user };

  // filter user
  delete usr.created_at;
  delete usr.updated_at;
  delete usr.__v;

  // filter consents
  const consents = usr?.consents || [];

  usr.consents = consents.map((consent: any) => {
    const cst: any = { ...consent };
    delete cst._id;
    delete cst.created_at;
    return cst;
  });

  return usr;
}
