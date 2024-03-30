import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { User } from '../../models/users/User';
import { UserDTO } from '../../models/users/UserDTO';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private http = inject(HttpClient);
  public URL_USERS = `${environment.apiBaseUrl}/users/`;

  public getAllUsers(): Promise<User[]> {
    return new Promise((resolve, reject) => {
      this.http.get<UserDTO[]>(this.URL_USERS).subscribe({
        next: (users) => resolve(users.map((user) => User.fromDTO(user))),
        error: (error) => reject(error)
      });
    });
  }
}
