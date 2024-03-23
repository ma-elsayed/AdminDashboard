import { IBooking } from './ibooking';
import { IUser } from './iuser';

export interface IResponse<T> {
  message: string;
  data: T[];
}
