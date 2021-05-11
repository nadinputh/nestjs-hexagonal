import { UserResult } from './user.result';

export interface UsersPaging {
  users: Users;
}

interface Users {
  users: UserResult[] | any;
  page: number;
  size: number;
  total: number | any;
}
