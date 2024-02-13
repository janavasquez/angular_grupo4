import { Treatment } from "./treatment.model";
import { User } from "./user.model";

export interface Booking {
  id: number;

  startDate: Date;
  discount: number;

  user:User;
  treatment: Treatment;
}
