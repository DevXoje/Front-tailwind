import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../models/products/Product';
import { ProductDTO } from '../../models/products/ProductDTO';
import { ProductNewDTO } from '../../models/products/ProductNewDTO';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private http = inject(HttpClient);
  public URL_PRODUCTS = `${environment.apiBaseUrl}/products/`;
  public URL_PRODUCT_BY = `${this.URL_PRODUCTS}@id`;
  public URL_SEARCH_PRODUCTS = `${this.URL_PRODUCTS}search`;
  public getAllProducts(): Promise<Product[]> {
    return new Promise((resolve, reject) => {
      this.http.get<ProductDTO[]>(this.URL_PRODUCTS).subscribe({
        next: (products) => resolve(products.map((product) => new Product(product))),
        error: (error) => reject(error)
      });
    });
  }
  public getProductById(id: string): Promise<Product> {
    return new Promise((resolve, reject) => {
      this.http.get<ProductDTO>(this.URL_PRODUCT_BY.replace('@id', id)).subscribe({
        next: (product) => resolve(new Product(product)),
        error: (error) => reject(error)
      });
    });
  }
  public createProduct(product: ProductNewDTO): Promise<Product> {
    return new Promise((resolve, reject) => {
      this.http.post<ProductDTO>(this.URL_PRODUCTS, product).subscribe({
        next: (product) => resolve(new Product(product)),
        error: (error) => {
          console.log(error, 'error');
          reject(error);
        }
      });
    });
  }
  public updateProduct(id: number, product: ProductNewDTO): Promise<void> {
    return new Promise((resolve, reject) => {
      const url = this.URL_PRODUCT_BY.replace('@id', id.toString());
      this.http.put(url, product).subscribe({
        next: () => resolve(),
        error: (error) => reject(error)
      });
    });
  }
  public deleteProduct(id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      const url = this.URL_PRODUCT_BY.replace('@id', id.toString());
      this.http.delete(url).subscribe({
        next: () => resolve(),
        error: (error) => reject(error)
      });
    });
  }
  public searchProducts({ min, max }: { min?: number | null; max?: number | null } /* , text?: string */): Promise<Product[]> {
    return new Promise((resolve, reject) => {
      const url = new URL(this.URL_SEARCH_PRODUCTS);
      if (min) {
        url.searchParams.append('minPrice', min.toString());
      }
      if (max) {
        url.searchParams.append('maxPrice', max.toString());
      }
      this.http.get<ProductDTO[]>(url.toString()).subscribe({
        next: (products) => resolve(products.map((product) => new Product(product))),
        error: (error) => reject(error)
      });
    });
  }
}
