import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'

export function auth(req: Request, res: Response, next: NextFunction) {
  const authorization = req.header("Authorization");
  if (!authorization || !authorization.startsWith("Bearer "))
    return res.status(401).json({ error: "Invalid authorization header" })

  const token = authorization.split(' ')[1]

  if (!token)
    return res.status(401).json({ error: "Authorization token not found" });

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_KEY as string)
    req.user = decoded
    next()
  } catch (error) {
    if (error instanceof Error)
      res.status(403).json({ error: error.message });
  }
}