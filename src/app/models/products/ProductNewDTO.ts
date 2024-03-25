import { ProductDTO } from './ProductDTO';

export type ProductNewDTO = Omit<ProductDTO, 'id'>;
