import { User } from '../users/User';
import { OrderDTO } from './OrderDTO';
import { OrderItemDTO } from './OrderItemDTO';

export class Order {
  public id: number;
  public user: User;
  public items: OrderItemDTO[];
  public total: number;

  constructor(id: number, user: User, items: OrderItemDTO[], total?: number) {
    this.id = id;
    this.user = user;
    this.items = items;
    this.total = total ?? this.calculateTotal();
  }
  static fromDTO(orderDTO: OrderDTO) {
    return new Order(orderDTO.id, User.fromDTO(orderDTO.user), orderDTO.items, orderDTO.total);
  }

  private calculateTotal(): number {
    return this.items.reduce((acc, item) => acc + item.total, 0);
  }
}
