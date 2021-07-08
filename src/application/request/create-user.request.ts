import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserRequest {
  @IsString({ message: 'validations.string' })
  @IsNotEmpty({ message: 'validations.not_empty' })
  firstName: string;

  @IsString({ message: 'validations.string' })
  @IsNotEmpty({ message: 'validations.not_empty' })
  lastName: string;
}
