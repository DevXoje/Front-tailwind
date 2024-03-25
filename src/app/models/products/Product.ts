import { ProductDTO } from './ProductDTO';

export class Product implements ProductDTO {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
  constructor({ id, description, image, name, price, stock }: ProductDTO) {
    this.id = id;
    this.description = description;
    this.image = image;
    this.name = name;
    this.price = price;
    this.stock = stock;
  }
}
