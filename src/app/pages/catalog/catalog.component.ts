import { Component, OnInit, inject, signal } from '@angular/core';
import { ProductSearcherComponent } from '../product/searcher/product-searcher.component';
import { ProductFilters } from '../dashboard/products-table/products-table.model';
import { ProductsService } from '../../services/products/products.service';
import { Product } from '../../models/products/Product';
import { ProductCardComponent } from '../product/product-card/product-card.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [ProductSearcherComponent, ProductCardComponent],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.scss'
})
export class CatalogComponent implements OnInit {
  private productService = inject(ProductsService);
  public products = signal<Product[]>([]);
  ngOnInit(): void {
    this.init();
  }

  private async init(): Promise<void> {
    try {
      this.products.set(await this.productService.getAllProducts());
    } catch (error) {
      alert('Error loading products');
    }
  }

  public async handleProductFilters(productFilters: ProductFilters) {
    try {
      this.products.set(await this.productService.searchProducts(productFilters));
    } catch (error) {
      if (error instanceof HttpErrorResponse) {
        alert(error.error.message);
      }
    }
  }
}
