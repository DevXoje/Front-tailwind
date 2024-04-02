import { Component, inject, signal } from '@angular/core';
import { OrdersService } from '../../../services/orders/orders.service';
import { Order } from '../../../models/orders/Order';
import { OrderForm, initOrderFormEdit } from './orders-table.model';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orders-table',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './orders-table.component.html',
  styleUrl: './orders-table.component.scss'
})
export class OrdersTableComponent {
  private orderService = inject(OrdersService);
  public orders = signal<Order[]>([]);
  public isShowFormOrder = signal(false);
  public isEditOrder = signal(false);
  public orderSelectedId = signal<number | null>(null);
  public orderForm?: OrderForm;
  //public orderFiltersForm = initOrderFiltersForm({});
  //public hasFilters = signal(false);
  ngOnInit(): void {
    this.init();
    /*    this.orderFiltersForm.valueChanges.subscribe(() => {
         const { min, max, searchTerm } = this.orderFiltersForm.value;
         this.hasFilters.set(!!min || !!max || !!searchTerm);
       }); */
  }
  private async init(): Promise<void> {
    try {
      this.orders.set(await this.orderService.getAllOrders());
    } catch (error) {
      alert('Error loading orders');
    }
  }
  /*  public handleInitiateAddOrder(): void {
     this.orderForm = initOrderFormEdit();
     this.orderForm.valueChanges.subscribe((values) => {
       console.log(values);
       console.log(this.orderForm);
     });
     this.isShowFormOrder.set(true);
   } */
  public handleInitiateEditOrder(order: Order): void {
    this.orderSelectedId.set(order.id);
    this.orderForm = initOrderFormEdit(order);
    this.orderForm.valueChanges.subscribe((values) => {
      console.log(values);
      console.log(this.orderForm);
    });
    this.isShowFormOrder.set(true);
  }
  public handleSaveOrder(orderForm: OrderForm): void {
    /*    const order = mapFormToOrderNewDTO(orderForm);
       if (this.isEditOrder()) {
         const id = this.orderSelectedId();
         if (!id) {
           throw new Error('Invalid order id');
         }
         this.handleUpdateOrder(id, order);
       } else {
         this.handleCreateOrder(order);
       } */
    this.init();
  }
  public handleDeleteOrder(id: number): void {
    this.orderService.deleteOrder(id);
    this.init();
  }
  /*   public async handleCreateOrder(order: OrderNewDTO): Promise<void> {
      try {
        await this.orderService.createOrder(order);
      } catch (error) {
        alert('Error creating order');
      }
      this.init();
      this.isShowFormOrder.set(false);
      this.orderForm?.reset();
    } */
  /*   public async handleUpdateOrder(id: number, order: OrderNewDTO): Promise<void> {
      try {
        await this.orderService.updateOrder(id, order);
      } catch (error) {
        alert('Error updating order');
      }
      this.init();
    } */
}
