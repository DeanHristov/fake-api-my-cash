import jwt, { JwtPayload, Secret } from 'jsonwebtoken';

class Auth {
  public static encodeJWToken(): string {
    return '';
  }

  public static decodeJWToken<T>(
    JWToken: string,
    JWTSecret = process.env.JWT_SECRET,
  ): T | null {
    try {
      const decodedToken: JwtPayload = jwt.verify(
        JWToken,
        JWTSecret as Secret,
      ) as JwtPayload;

      return decodedToken as T;
    } catch (reason) {
      return null;
    }
  }
}

export default Auth;
