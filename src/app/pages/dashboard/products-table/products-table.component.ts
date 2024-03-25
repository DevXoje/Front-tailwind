import { Component, OnInit, inject, signal } from '@angular/core';
import { ProductsService } from '../../../services/products/products.service';
import { Product } from '../../../models/products/Product';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-products-table',
  standalone: true,
  imports: [],
  templateUrl: './products-table.component.html',
  styleUrl: './products-table.component.scss'
})
export class ProductsTableComponent implements OnInit {
  private productService = inject(ProductsService);
  public products$: Product[] = [];

  ngOnInit(): void {
    this.init();
  }
  private async init(): Promise<void> {
    this.products$ = await this.productService.getAllProducts();
  }
}
