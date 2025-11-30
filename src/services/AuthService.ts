import jwt, { JwtPayload, Secret } from 'jsonwebtoken';

class AuthService {
  public createJWToken = async <T>(payload: T): Promise<string> => {
    const { JWT_SECRET, JWT_EXPIRE } = process.env;

    return jwt.sign(payload as object, JWT_SECRET as Secret, {
      expiresIn: JWT_EXPIRE,
    });
  };

  public decodeJWToken<T>(JWToken: string): T | null {
    const { JWT_SECRET } = process.env;
    try {
      const decodedToken: JwtPayload = jwt.verify(
        JWToken,
        JWT_SECRET as Secret,
      ) as JwtPayload;

      return decodedToken as T;
    } catch (reason) {
      return null;
    }
  }
}

export default new AuthService();
