import { ProductDTO } from './ProductDTO';

export class Product implements ProductDTO {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
  constructor(id: number, name: string, description: string, price: number, stock: number, image: string) {
    this.id = id;
    this.description = description;
    this.image = image;
    this.name = name;
    this.price = price;
    this.stock = stock;
  }

  static fromDTO(productDTO: ProductDTO): Product {
    return new Product(productDTO.id, productDTO.name, productDTO.description, productDTO.price, productDTO.stock, productDTO.image);
  }
}
