import { User } from '../users/User';
import { UserDTO } from '../users/UserDTO';
import { OrderItemDTO } from './OrderItemDTO';

export interface OrderDTO {
  id: number;
  user: UserDTO;
  items: OrderItemDTO[];
  total: number;
}
