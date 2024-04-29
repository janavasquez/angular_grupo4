import { HttpInterceptorFn } from '@angular/common/http';

// ng generate interceptor authentication/jwt
// Interceptor que agrega el token JWT en la cabecera Authorization de las peticiones HTTP
// Envía el token JWT al backend en cada petición

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem("jwt_token");
  if(token) {
    req = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
  }
  return next(req);
};
