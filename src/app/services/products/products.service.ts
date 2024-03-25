import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../models/products/Product';
import { ProductDTO } from '../../models/products/ProductDTO';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private http = inject(HttpClient);
  public URL_PRODUCTS = `${environment.apiBaseUrl}/products/`;
  public URL_PRODUCT_BY = `${this.URL_PRODUCTS}@id/`;

  public getAllProducts(): Promise<Product[]> {
    return new Promise((resolve, reject) => {
      this.http.get<ProductDTO[]>(this.URL_PRODUCTS).subscribe({
        next: (products) => resolve(products.map((product) => new Product(product))),
        error: (error) => reject(error)
      });
    });
  }
}
