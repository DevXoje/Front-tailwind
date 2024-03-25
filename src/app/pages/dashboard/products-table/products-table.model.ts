import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductDTO } from '../../../models/products/ProductDTO';
import { ProductNewDTO } from '../../../models/products/ProductNewDTO';

export const initForm = (product?: ProductDTO) =>
  new FormGroup({
    id: new FormControl(product?.id),
    name: new FormControl(product?.name ?? '', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
    description: new FormControl(product?.description ?? '', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]),
    stock: new FormControl(product?.stock ?? 0, [Validators.required, Validators.min(0), Validators.max(1000)]),
    price: new FormControl(product?.price ?? 0, [Validators.required, Validators.min(0), Validators.max(1000000)]),
    image: new FormControl(product?.image ?? '', [Validators.required])
  });

export type ProductForm = ReturnType<typeof initForm>;
export const mapFormToProductNewDTO = (form: ProductForm): ProductNewDTO => {
  if (!form.valid) {
    throw new Error('Invalid form');
  }
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
