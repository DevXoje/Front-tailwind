import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterDTO } from '../../models/users/RegisterDTO';

export const initRegisterClient = () =>
  new FormGroup({
    email: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100), Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
    matchingPassword: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)])
  });

export type RegisterForm = ReturnType<typeof initRegisterClient>;
export const mapFormToRegisterDTO = (form: RegisterForm): RegisterDTO => {
  const { email, password, matchingPassword } = form.value;
  if (!email || !password || !matchingPassword) {
    throw new Error('Invalid form');
  }
  const user: RegisterDTO = {
    email,
    username: email,
    password,
    matchingPassword
  };
  return user;
};
