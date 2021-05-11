export const USER_CREATED = 'user.created';

export class UserCreatedEvent {
  uuid: string;
  firstName: string;
  lastName: string;
}
