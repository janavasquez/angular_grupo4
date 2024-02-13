export interface User {
  id: number;

  fullName: string;
  email: string; // sirve para login
  phone: string;
  nif: string;
  password: string, // sirve para login

  street: string;
  city: string;
  postalCode: string;

}
