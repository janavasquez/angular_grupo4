import { Treatment } from "./treatment.model";

export interface Category {
  id: number;
  name: string;
  photoUrl: string;
  treatment: Treatment;
  description: string;
  minAge: number;

}
