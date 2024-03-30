import { User } from '../users/User';
import { OrderDTO } from './OrderDTO';
import { OrderItemDTO } from './OrderItemDTO';

export class Order {
  public id: number;
  public user: User;
  public items: OrderItemDTO[];
  public quantity: number;

  constructor(id: number, user: User, items: OrderItemDTO[], quantity: number) {
    this.id = id;
    this.user = user;
    this.items = items;
    this.quantity = quantity;
  }
  static fromDTO(orderDTO: OrderDTO) {
    return new Order(orderDTO.id, User.fromDTO(orderDTO.user), orderDTO.items, orderDTO.total);
  }
}
