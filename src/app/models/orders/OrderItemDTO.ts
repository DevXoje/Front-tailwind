import { ProductDTO } from '../products/ProductDTO';

export interface OrderItemDTO {
  id: number;
  product: ProductDTO;
  quantity: number;
  total: number;
}
