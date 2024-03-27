import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { ProductsService } from '../../../services/products/products.service';
import { Product } from '../../../models/products/Product';
import { ProductDTO } from '../../../models/products/ProductDTO';
import { ProductFiltersForm, ProductForm, initProductFiltersForm, initProductForm, mapFormToProductNewDTO } from './products-table.model';
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
  public products = signal<Product[]>([]);
  public isShowFormProduct = signal(false);
  public isEditProduct = signal(false);
  public productSelectedIndex = signal<number | null>(null);
  public productForm?: ProductForm;
  public productFiltersForm: ProductFiltersForm = initProductFiltersForm({});
  public hasFilters = signal(false);
  ngOnInit(): void {
    this.init();
    this.productFiltersForm.valueChanges.subscribe(() => {
      const { min, max, searchTerm } = this.productFiltersForm.value;
      this.hasFilters.set(!!min || !!max || !!searchTerm);
    });
  }
  private async init(): Promise<void> {
    this.products.set(await this.productService.getAllProducts());
  }
  public handleInitiateAddProduct(): void {
    this.productForm = initProductForm();
    this.productForm.valueChanges.subscribe((values) => {
      console.log(values);
      console.log(this.productForm);
    });
    this.isShowFormProduct.set(true);
  }
  public handleInitiateEditProduct(product: Product): void {
    this.productSelectedIndex.set(product.id);
    this.productForm = initProductForm(product);
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

  public async handleApplySearch(productFiltersForm: ProductFiltersForm): Promise<void> {
    this.products.set(await this.productService.searchProducts(productFiltersForm.value));
  }

  public handleUploadImage(event: Event): void {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result;
      if (typeof result !== 'string') {
        return;
      }
      this.productForm?.controls.image.setValue(result);
    };
    reader.readAsDataURL(file);
  }
}
