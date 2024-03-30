import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Order } from '../../models/orders/Order';
import { OrderDTO } from '../../models/orders/OrderDTO';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private http = inject(HttpClient);
  public URL_ORDERS = `${environment.apiBaseUrl}/orders/`;
  public URL_ORDER_BY = `${this.URL_ORDERS}@id`;

  public getAllOrders(): Promise<Order[]> {
    return new Promise((resolve, reject) => {
      this.http.get<OrderDTO[]>(this.URL_ORDERS).subscribe({
        next: (orders) => resolve(orders.map((order) => Order.fromDTO(order))),
        error: (error) => reject(error)
      });
    });
  }

  public deleteOrder(id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      const url = this.URL_ORDER_BY.replace('@id', id.toString());
      this.http.delete(url).subscribe({
        next: () => resolve(),
        error: (error) => reject(error)
      });
    });
  }

  public updateOrder(id: number, order: Order): Promise<void> {
    return new Promise((resolve, reject) => {
      const url = this.URL_ORDER_BY.replace('@id', id.toString());
      this.http.put(url, order).subscribe({
        next: () => resolve(),
        error: (error) => reject(error)
      });
    });
  }
}
