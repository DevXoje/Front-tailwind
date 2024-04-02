import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { User } from '../../models/users/User';
import { UserDTO } from '../../models/users/UserDTO';
import { RegisterDTO } from '../../models/users/RegisterDTO';
import { LoginDTO } from '../../models/users/LoginDTO';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private http = inject(HttpClient);
  public URL_USERS = `${environment.apiBaseUrl}/users/`;
  public URL_USER_BY_ID = `${this.URL_USERS}@id/`;
  public URL_USER_REGISTER = `${this.URL_USERS}register`;
  public URL_USER_LOGIN = `${this.URL_USERS}login`;

  public getAllUsers(): Promise<User[]> {
    return new Promise((resolve, reject) => {
      this.http.get<UserDTO[]>(this.URL_USERS).subscribe({
        next: (users) => resolve(users.map((user) => User.fromDTO(user))),
        error: (error) => reject(error)
      });
    });
  }

  public getUserById(id: number): Promise<User> {
    return new Promise((resolve, reject) => {
      const url = this.URL_USER_BY_ID.replace('@id', id.toString());
      this.http.get<UserDTO>(url).subscribe({
        next: (user) => resolve(User.fromDTO(user)),
        error: (error) => reject(error)
      });
    });
  }

  public registerUser(user: RegisterDTO): Promise<UserDTO> {
    return new Promise((resolve, reject) => {
      this.http.post<UserDTO>(this.URL_USER_REGISTER, user).subscribe({
        next: (user) => resolve(user),
        error: (error) => reject(error)
      });
    });
  }

  public loginUser(user: LoginDTO): Promise<UserDTO> {
    return new Promise((resolve, reject) => {
      this.http.post<UserDTO>(this.URL_USER_LOGIN, user).subscribe({
        next: (user) => resolve(user),
        error: (error) => reject(error)
      });
    });
  }
}
