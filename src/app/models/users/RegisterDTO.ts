import { LoginDTO } from './LoginDTO';
import { UserDTO } from './UserDTO';

export type RegisterDTO = {
  matchingPassword: string;
} & LoginDTO &
  Pick<UserDTO, 'username'>;
