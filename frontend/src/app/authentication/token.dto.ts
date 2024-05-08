export interface Token {
  token: string;
}
export interface DecodedToken {
  sub: number;
  email: string;
  name: string;
  role: string;
  iat: number;
  exp: number;
}
