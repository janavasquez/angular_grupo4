export interface DecodedToken {
    sub: number;
    email: string;
    role: string;
    iat: number;
    exp: number;
}