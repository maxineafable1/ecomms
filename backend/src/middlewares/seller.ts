import { Request, Response, NextFunction } from "express";
import { pool } from "../database";

export async function seller(req: Request, res: Response, next: NextFunction) {
  const { id } = req.user  
  const user = await pool.query('SELECT seller FROM users WHERE user_id = $1', [id])
  if (user.rowCount === 0)
    return res.sendStatus(404)

  if (!user.rows[0].seller)
    return res.sendStatus(403)
  
  next()
}