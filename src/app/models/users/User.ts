import { UserDTO } from './UserDTO';

export class User implements UserDTO {
  id: string;
  username: string;
  email: string;
  constructor(id: string, username: string, email: string) {
    this.id = id;
    this.username = username;
    this.email = email;
  }
  static fromDTO(userDTO: UserDTO): User {
    return new User(userDTO.id, userDTO.username, userDTO.email);
  }
}
