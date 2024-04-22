export interface User {

  id: number;

  fullName: string;
  email: string; // sirve para login
  phone: string;
  active: boolean;
  //registerDate: Date;
  birthDate: Date;
  nif: string;
  password: string, // sirve para login
  street: string;
  city: string;
  postalCode: string;
  photoUrl:string;
  

}
