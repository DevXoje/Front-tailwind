import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Product } from '../../../models/products/Product';
import { ProductsService } from '../../../services/products/products.service';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss'
})
export class ProductItemComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private productService = inject(ProductsService);
  public product = signal<undefined | Product>(undefined);
  ngOnInit(): void {
    const id = this.getId();
    this.productService.getProductById(id).then((product) => {
      this.product.set(product);
    });
  }
  public getId(): string {
    return this.route.snapshot.params['id'];
  }
}
