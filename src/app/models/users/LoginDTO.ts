import { UserDTO } from './UserDTO';

export type LoginDTO = Pick<UserDTO, 'email'> & { password: string };
