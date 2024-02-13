import { Company } from "./company.model";
import { Treatment } from "./treatment.model";
import { User } from "./user.model";

export interface Comment { // valoracion

  id: number;

  rating: number;
  opinion: string;

  user: User;
  company: Company;
  treatment: Treatment;
}
