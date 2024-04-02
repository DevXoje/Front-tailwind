import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../../models/products/Product';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  @Input({ required: true }) product!: Product;
  @Output() addToCart = new EventEmitter<Product>();
  public handleAddToCart(product: Product): void {
    this.addToCart.emit(product);
  }
}
