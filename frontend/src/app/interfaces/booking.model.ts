import { Company } from "./company.model";
import { Treatment } from "./treatment.model";
import { User } from "./user.model";

export interface Booking {
  id: number;
  startDate: Date;
  price: number;
  discount: number;
  user?: User;
  treatment?: Treatment;
  company?: Company;
}
