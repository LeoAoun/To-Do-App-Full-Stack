import { NextFunction, Response, Request } from "express";
import jwt from "jsonwebtoken";

const prisma = require("../prisma/prisma");

async function AuthMiddleware(req: Request, res: Response, next: NextFunction) {
  const headers = req.headers.authorization;

  if (!headers || !headers.startsWith("Bearer")) {
    return res.status(401).json({
      statusText: "Missing authorization header",
    });
  }

  const [, token] = headers.split(" ");

  if (!token) {
    return res.status(401).json({
      statusText: "Missing token",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any;

    const user = await prisma.user.findUnique({
      where: {
        id: decoded.id,
      },
    });

    if (!user) {
      return res.status(401).json({
        statusText: "User not found",
      });
    }

    next();
  } catch (error) {
    return res.status(401).json({
      statusText: "Invalid token",
    });
  }
}

module.exports = AuthMiddleware;
