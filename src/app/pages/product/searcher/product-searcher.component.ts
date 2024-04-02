import { Component, EventEmitter, Output, signal } from '@angular/core';
import { ProductFilters, ProductFiltersForm, initProductFiltersForm } from '../../dashboard/products-table/products-table.model';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-searcher',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './product-searcher.component.html',
  styleUrl: './product-searcher.component.scss'
})
export class ProductSearcherComponent {
  @Output()
  productFiltersValue = new EventEmitter<ProductFilters>();

  public productFiltersForm = initProductFiltersForm({});

  public handleApplySearch(productFiltersForm: ProductFiltersForm) {
    this.productFiltersValue.emit(productFiltersForm.value);
  }
}
