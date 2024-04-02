import { Component, inject } from '@angular/core';
import { RegisterForm, initRegisterClient, mapFormToRegisterDTO } from './register.model';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../services/users/users.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  private registerService = inject(UsersService);
  public registerForm = initRegisterClient();

  public handleRegister(form: RegisterForm): void {
    const registerDTO = mapFormToRegisterDTO(form);
    this.registerService
      .registerUser(registerDTO)
      .then(() => {
        alert('User registered');
      })
      .catch(() => {
        alert('Error registering user');
      });
  }
}
