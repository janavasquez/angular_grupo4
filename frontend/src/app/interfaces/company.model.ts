import { Treatment } from "./treatment.model";

export interface Company {
 // Centro

  id: number;
  name: string;
  cif: string;
  street: string;
  city: string;
  postalCode: string;
  values: string;
  treatments: Treatment[];
  active: boolean;
  photoUrl:string;
}
