import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Order } from '../../../models/orders/Order';

export const initOrderFormEdit = (order: Order) =>
  new FormGroup({
    user: new FormControl({ value: order.user.username, disabled: true }, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
    items: new FormArray(
      order?.items.map(
        (item) =>
          new FormGroup({
            product: new FormControl(item.product),
            quantity: new FormControl(item.quantity)
          })
      ) ?? []
    )
  });
/* export const initProductFiltersForm = ({ min, max, searchTerm }: { min?: number; max?: number; searchTerm?: string }) =>
  new FormGroup({
    min: new FormControl(min ?? 0, [Validators.min(0), Validators.max(1000000)]),
    max: new FormControl(max, [Validators.min(0), Validators.max(1000000)]),
    searchTerm: new FormControl(searchTerm, [Validators.minLength(3), Validators.maxLength(100)])
  }); 
export type ProductFiltersForm = ReturnType<typeof initProductFiltersForm>;*/
export type OrderForm = ReturnType<typeof initOrderFormEdit>;
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
