import { Request, Response } from 'express'
import { pool } from '../database'

async function getCartItems(req: Request, res: Response) {
  const { id } = req.user
  try {
    const products = await pool.query('SELECT p.title, p.image_path, p.stock, c.quantity FROM products p LEFT JOIN cart c USING (product_id) WHERE c.user_id = $1', [id])
    res.status(200).json(products.rows)
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json(error.message)
  }
}

async function addToCart(req: Request, res: Response) {
  const { quantity } = req.body
  const { id: userId } = req.user
  const { id: productId } = req.params

  const product = await pool.query('SELECT product_id, stock FROM products WHERE product_id = $1', [productId])
  if (product.rowCount === 0)
    return res.sendStatus(404)

  const stock = +product.rows[0].stock
  // check cart if item already exists
  const cartItem = await pool.query('SELECT * FROM cart WHERE product_id = $1 AND user_id = $2', [productId, userId])
  if (cartItem.rowCount !== 0) {
    const prev = +cartItem.rows[0].quantity
    const updatedQuantity = prev + +quantity <= stock ? prev + +quantity : stock
    await pool.query('UPDATE cart SET quantity = $1 WHERE product_id = $2 AND user_id = $3', [updatedQuantity, productId, userId])
    return res.status(200).json({ message: 'Item already exists in cart, updated the quantity instead' })
  }

  if (!quantity)
    return res.status(400).json({ error: 'Quantity must be valid' })

  if (quantity <= 0 || quantity > stock)
    return res.status(400).json({ error: 'Quantity must be valid and less than or equal to item\'s stock' })

  try {
    await pool.query('INSERT INTO cart (quantity, product_id, user_id) VALUES ($1, $2, $3)', [quantity, product.rows[0].product_id, userId])
    res.sendStatus(200)
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json(error.message)
  }
}

async function deleteCartItem(req: Request, res: Response) {
  const { id: userId } = req.user
  const { id: productId } = req.params
  try {
    const itemToDelete = await pool.query('DELETE FROM cart WHERE product_id = $1 AND user_id = $2', [productId, userId])
    if (itemToDelete.rowCount === 0)
      return res.sendStatus(404)

    res.sendStatus(204)
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json(error.message)
  }
}

async function updateCartItem(req: Request, res: Response) {
  const { quantity } = req.body
  const { id: userId } = req.user
  const { id: productId } = req.params

  const product = await pool.query('SELECT product_id, stock FROM products WHERE product_id = $1', [productId])
  if (product.rowCount === 0)
    return res.sendStatus(404)

  const stock = +product.rows[0].stock
  // check cart if item exists
  const cartItem = await pool.query('SELECT * FROM cart WHERE product_id = $1 AND user_id = $2', [productId, userId])
  if (cartItem.rowCount === 0)
    return res.sendStatus(404)

  if (!quantity || quantity == 0)
    return res.status(400).json({ error: 'Quantity must be valid' })

  try {
    const updatedQuantity = quantity <= stock ? quantity : stock
    await pool.query('UPDATE cart SET quantity = $1 WHERE product_id = $2 AND user_id = $3', [updatedQuantity, productId, userId])
    res.sendStatus(204)
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json(error.message)
  }
}

export {
  getCartItems,
  addToCart,
  deleteCartItem,
  updateCartItem,
}