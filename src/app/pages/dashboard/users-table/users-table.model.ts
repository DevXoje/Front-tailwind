import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserDTO } from '../../../models/users/UserDTO';

export const initUserForm = (user?: UserDTO) =>
  new FormGroup({
    //id: new FormControl(product?.id),
    username: new FormControl(user?.username ?? '', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
    email: new FormControl(user?.email ?? '', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)])
  });
/* export const initProductFiltersForm = ({ min, max, searchTerm }: { min?: number; max?: number; searchTerm?: string }) =>
  new FormGroup({
    min: new FormControl(min ?? 0, [Validators.min(0), Validators.max(1000000)]),
    max: new FormControl(max, [Validators.min(0), Validators.max(1000000)]),
    searchTerm: new FormControl(searchTerm, [Validators.minLength(3), Validators.maxLength(100)])
  }); 
export type ProductFiltersForm = ReturnType<typeof initProductFiltersForm>;*/
export type UserForm = ReturnType<typeof initUserForm>;
/* export const mapFormToProductNewDTO = (form: ProductForm): ProductNewDTO => {
  //  if (!form.valid) {
  //    throw new Error('Invalid form');
  //  }
  const { description, image, name, price, stock } = form.value;
  if (!description || !image || !name || !price || !stock) {
    throw new Error('Invalid form');
  }
  const product: ProductNewDTO = {
    description,
    image,
    name,
    price,
    stock
  };
  return product;
};
 */
