import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginDTO } from '../../models/users/LoginDTO';

export const initLoginClient = () => {
  const email = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100), Validators.email]);
  const password = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]);
  const form = new FormGroup({
    email,
    password
  });
  return form;
};

export type LoginForm = ReturnType<typeof initLoginClient>;

export const mapFormToLoginDTO = (form: LoginForm): LoginDTO => {
  const { email, password } = form.value;
  if (!email || !password) {
    throw new Error('Invalid form');
  }
  const user: LoginDTO = {
    email,
    password
  };
  return user;
};
