import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface AuthRequest extends Request {
  user?: any;
}

interface AuthenticateUserOptions {
  premium?: boolean;
}

export const authenticateUser = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
  options: AuthenticateUserOptions = { premium: false }
) => {
  const token = req.headers.authorization?.split(" ")[1].trim();
  console.log("token recibido", token, "headers", req.headers);
  if (!token) {
    return res
      .status(401)
      .json({ error: "Acceso denegado. Token no proporcionado." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    // Verificar si se requiere que el usuario sea premium
    if (options.premium && !req.user.premium) {
      return res.status(403).json({ error: "Requiere usuario premium." });
    }

    console.log("user authenticated", decoded);
    next();
  } catch (error) {
    console.log("user unauthenticated", error);
    return res.status(403).json({ error: "Token inválido o expirado." });
  }
};
