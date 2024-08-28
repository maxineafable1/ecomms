import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import { pool } from '../database'
import { getAccessToken, getRefreshToken } from '../utils/tokens'
import { PayloadType } from '../utils/types'
import jwt from 'jsonwebtoken'

async function login(req: Request, res: Response) {
  const { phoneOrEmail, password } = req.body
  if (!phoneOrEmail || !password)
    return res.status(400).json({ error: "All fields are required" })

  const userExists = await pool.query("SELECT * FROM users WHERE phone = $1 OR email = $1", [phoneOrEmail]);
  if (userExists.rowCount === 0)
    return res.status(400).json({ error: "Incorrect credentials" });

  const correctPassword = bcrypt.compareSync(password, userExists.rows[0].password);
  if (!correctPassword)
    return res.status(400).json({ error: "Incorrect credentials" });

  try {
    // const fullName = `${userExists.rows[0].first_name} ${userExists.rows[0].last_name}` 

    const payload: PayloadType = {
      id: userExists.rows[0].user_id
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
  const { phone, email, password } = req.body
  if (!phone || !email || !password)
    return res.status(400).json({ error: "All fields are required" })

  const userExists = await pool.query("SELECT phone, email FROM users WHERE phone = $1 OR email = $2", [phone, email]);
  if (userExists.rowCount !== 0)
    return res.status(400).json({ error: "User already exists" });

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  try {
    const newUser = await pool.query("INSERT INTO users (phone, email, password) VALUES ($1, $2, $3) RETURNING *", [phone, email, hashedPassword]);
    // const fullName = `${newUser.rows[0].first_name} ${newUser.rows[0].last_name}` 

    const payload: PayloadType = {
      id: newUser.rows[0].user_id
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

    await pool.query('DELETE FROM tokens WHERE refresh = $1', [refresh])
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
    return res.sendStatus(404)
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
      id: req.user.id
      // fullName: req.user.fullName
    }

    const access = getAccessToken(user)
    res.status(200).json({ access })
  } catch (error) {
    if (error instanceof Error)
      res.status(403).json({ error: error.message });
  }
}

async function setUserAsSeller(req: Request, res: Response) {
  const { id } = req.user
  const { storeName } = req.body

  if (!storeName)
    return res.status(400).json({ error: 'All fields are required' })

  try {
    const isUserSeller = await pool.query('SELECT seller FROM users WHERE user_id = $1', [id])
    await pool.query('UPDATE users SET seller = $1, store_name = $2 WHERE user_id = $3', [!isUserSeller.rows[0].seller, storeName, id])
    // res.sendStatus(204)
    getUserInfo(req, res)
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ error: error.message })
  }
}

async function updateUserInfo(req: Request, res: Response) {
  const { firstName, lastName, houseNumber, street, barangay, city, province } = req.body
  const { id } = req.user

  if (!firstName || !lastName || !houseNumber || !street || !barangay || !city || !province)
    return res.status(400).json({ error: 'All fields are required' })

  try {
    await pool.query('UPDATE users SET first_name = $1, last_name = $2 WHERE user_id = $3', [firstName, lastName, id])
    await pool.query('UPDATE address SET house_num = $1, street = $2, barangay = $3, city = $4, province = $5 WHERE user_id = $6', [houseNumber, street, barangay, city, province, id])
    // res.sendStatus(204)
    getUserInfo(req, res)
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ error: error.message })
  }
}

async function getUserInfo(req: Request, res: Response) {
  const { id } = req.user
  try {
    const user = await pool.query('SELECT * FROM users LEFT JOIN address USING (user_id) WHERE user_id = $1', [id])
    if (user.rowCount === 0)
      return res.sendStatus(404)

    res.status(200).json(user.rows[0])
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ error: error.message })
  }
}

export {
  login,
  signup,
  logout,
  deleteUser,
  getNewAccessToken,
  setUserAsSeller,
  updateUserInfo,
  getUserInfo,
}