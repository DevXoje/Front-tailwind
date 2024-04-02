import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UsersService } from '../../services/users/users.service';
import { LoginForm, initLoginClient, mapFormToLoginDTO } from './login.model';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private usersService = inject(UsersService);
  public loginForm = initLoginClient();

  public handleLogin(form: LoginForm) {
    const user = mapFormToLoginDTO(form);
    this.usersService
      .loginUser(user)
      .then(() => {
        console.log('User logged in');
        localStorage.setItem('user', JSON.stringify(user));
      })
      .catch((error: HttpErrorResponse) => {
        alert(error.error.message);
      });
  }
}
