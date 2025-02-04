import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { ProductsService } from '../../../services/products/products.service';
import { Product } from '../../../models/products/Product';
import { ProductDTO } from '../../../models/products/ProductDTO';
import { ProductFilters, ProductFiltersForm, ProductForm, initProductFiltersForm, initProductForm, mapFormToProductNewDTO } from './products-table.model';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductNewDTO } from '../../../models/products/ProductNewDTO';
import { CommonModule } from '@angular/common';
import { ProductSearcherComponent } from '../../product/searcher/product-searcher.component';

@Component({
  selector: 'app-products-table',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, ProductSearcherComponent],
  templateUrl: './products-table.component.html',
  styleUrl: './products-table.component.scss'
})
export class ProductsTableComponent implements OnInit {
  private productService = inject(ProductsService);
  public products = signal<Product[]>([]);
  public isShowFormProduct = signal(false);
  public isEditProduct = signal(false);
  public productSelectedId = signal<number | null>(null);
  public productForm?: ProductForm;
  public productFiltersForm = initProductFiltersForm({});
  public hasFilters = signal(false);
  ngOnInit(): void {
    this.init();
    this.productFiltersForm.valueChanges.subscribe(() => {
      const { min, max, searchTerm } = this.productFiltersForm.value;
      this.hasFilters.set(!!min || !!max || !!searchTerm);
    });
  }
  private async init(): Promise<void> {
    try {
      this.products.set(await this.productService.getAllProducts());
    } catch (error) {
      alert('Error loading products');
    }
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
    this.productSelectedId.set(product.id);
    this.productForm = initProductForm(product);
    this.isShowFormProduct.set(true);
  }
  public handleSaveProduct(productForm: ProductForm): void {
    const product = mapFormToProductNewDTO(productForm);
    if (this.isEditProduct()) {
      const id = this.productSelectedId();
      if (!id) {
        throw new Error('Invalid product id');
      }
      this.handleUpdateProduct(id, product);
    } else {
      this.handleCreateProduct(product);
    }
    this.init();
  }
  public handleDeleteProduct(id: number): void {
    this.productService.deleteProduct(id);
    this.init();
  }
  public async handleCreateProduct(product: ProductNewDTO): Promise<void> {
    try {
      await this.productService.createProduct(product);
    } catch (error) {
      alert('Error creating product');
    }
    this.init();
    this.isShowFormProduct.set(false);
    this.productForm?.reset();
  }
  public async handleUpdateProduct(id: number, product: ProductNewDTO): Promise<void> {
    try {
      await this.productService.updateProduct(id, product);
    } catch (error) {
      alert('Error updating product');
    }
    this.init();
  }

  public async handleApplySearch(productFiltersForm: ProductFilters): Promise<void> {
    try {
      this.products.set(await this.productService.searchProducts(productFiltersForm));
    } catch (error) {
      alert('Error searching products');
    }
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
