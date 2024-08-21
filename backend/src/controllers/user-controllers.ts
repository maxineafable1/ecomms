import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import { pool } from '../database'
import { getAccessToken, getRefreshToken } from '../utils/tokens'
import { PayloadType } from '../utils/types'
import jwt from 'jsonwebtoken'

async function login(req: Request, res: Response) {
  const { usernameOrEmail, password } = req.body
  if (!usernameOrEmail || !password)
    return res.status(400).json({ error: "All fields are required" })

  const userExists = await pool.query("SELECT * FROM users WHERE username = $1 OR email = $1", [usernameOrEmail]);
  if (userExists.rowCount === 0)
    return res.status(400).json({ error: "Incorrect email or password" });

  const correctPassword = bcrypt.compareSync(password, userExists.rows[0].password);
  if (!correctPassword)
    return res.status(400).json({ error: "Incorrect email or password" });

  try {
    const payload: PayloadType = {
      id: userExists.rows[0].user_id,
      username: userExists.rows[0].username
    }

    const access = getAccessToken(payload)
    const refresh = getRefreshToken(payload)

    // store refresh on database
    await pool.query("INSERT INTO tokens (refresh, user_id) VALUES ($1, $2)", [refresh, payload.id]);

    res.status(201).json({ access, refresh })
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json(error.message)
  }
}

async function signup(req: Request, res: Response) {
  const { username, email, password } = req.body
  if (!username || !email || !password)
    return res.status(400).json({ error: "All fields are required" })

  if (username.length < 3 || username.length > 20)
    return res.status(400).json({ error: "Username length must be 3 to 20" })

  const userExists = await pool.query("SELECT username, email FROM users WHERE username = $1 OR email = $2", [username, email]);
  if (userExists.rowCount !== 0)
    return res.status(400).json({ error: "User already exists" });

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  try {
    const newUser = await pool.query("INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *", [username, email, hashedPassword]);

    const payload: PayloadType = {
      id: newUser.rows[0].user_id,
      username: newUser.rows[0].username
    }

    const access = getAccessToken(payload)
    const refresh = getRefreshToken(payload)

    // store refresh on database
    await pool.query("INSERT INTO tokens (refresh, user_id) VALUES ($1, $2)", [refresh, payload.id]);

    res.status(201).json({ access, refresh })
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json(error.message);
  }
}

async function logout(req: Request, res: Response) {
  try {
    const { refresh } = req.body
    if (!refresh)
      return res.status(400).json({ error: "Refresh token not found" });
    await pool.query('UPDATE tokens SET refresh = NULL WHERE refresh = $1', [refresh])
    res.sendStatus(204)
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json(error.message);
  }
}

async function deleteUser(req: Request, res: Response) {
  const { id } = req.user
  const userToDelete = await pool.query('DELETE FROM users WHERE user_id = $1', [id])
  if (userToDelete.rowCount === 0)
    return res.sendStatus(400)
  res.sendStatus(204)
}

async function getNewAccessToken(req: Request, res: Response) {
  const { refresh } = req.body

  if (!refresh)
    return res.sendStatus(401)

  const refreshTokenStored = await pool.query('SELECT * FROM tokens WHERE refresh = $1', [refresh])

  if (refreshTokenStored.rowCount === 0)
    return res.sendStatus(403)

  try {
    const decoded = jwt.verify(refresh, process.env.REFRESH_KEY as string)
    req.user = decoded

    const user: PayloadType = {
      id: req.user.id,
      username: req.user.username
    }

    const access = getAccessToken(user)
    res.status(200).json({ access })
  } catch (error) {
    if (error instanceof Error)
      res.status(403).json({ error: error.message });
  }
}

export {
  login,
  signup,
  logout,
  deleteUser,
  getNewAccessToken,
}