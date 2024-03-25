import { Component, OnInit, inject, signal } from '@angular/core';
import { ProductsService } from '../../../services/products/products.service';
import { Product } from '../../../models/products/Product';
import { ProductDTO } from '../../../models/products/ProductDTO';
import { ProductForm, initForm, mapFormToProductNewDTO } from './products-table.model';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductNewDTO } from '../../../models/products/ProductNewDTO';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products-table',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './products-table.component.html',
  styleUrl: './products-table.component.scss'
})
export class ProductsTableComponent implements OnInit {
  private productService = inject(ProductsService);
  public products$: Product[] = [];
  public isShowFormProduct = signal(false);
  public isEditProduct = signal(false);
  public productSelectedIndex = signal<number | null>(null);
  public productForm?: ProductForm;
  ngOnInit(): void {
    this.init();
  }
  private async init(): Promise<void> {
    this.products$ = await this.productService.getAllProducts();
  }
  public handleInitiateAddProduct(): void {
    this.productForm = initForm();
    this.isShowFormProduct.set(true);
  }
  public handleInitiateEditProduct(product: Product): void {
    this.productSelectedIndex.set(product.id);
    this.productForm = initForm(product);
    this.isShowFormProduct.set(true);
  }
  public handleSaveProduct(productForm: ProductForm): void {
    const product = mapFormToProductNewDTO(productForm);
    if (this.isEditProduct()) {
      const id = productForm.value.id;
      if (!id) {
        throw new Error('Invalid product id');
      }

      this.handleUpdateProduct(id, product);
    } else {
      this.productService.createProduct(product);
    }
    this.init();
  }
  public handleDeleteProduct(id: number): void {
    this.productService.deleteProduct(id);
    this.init();
  }
  public handleUpdateProduct(id: number, product: ProductNewDTO): void {
    this.productService.updateProduct(id, product);
    this.init();
  }
}
