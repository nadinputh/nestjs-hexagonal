import { UserResponse } from './user.response';

export interface UsersPaging {
  users: Users;
}

interface Users {
  users: UserResponse[] | any;
  page: number;
  size: number;
  total: number | any;
}
