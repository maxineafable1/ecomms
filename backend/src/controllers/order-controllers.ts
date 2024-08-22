import { Request, Response } from 'express'
import { pool } from '../database'
import { OrderStatusType } from '../utils/types'

async function checkout(req: Request, res: Response) {
  // get all cart id that will be checkout
  const { cartIds }: { cartIds: string[] } = req.body
  const { id: userId } = req.user

  if (!cartIds || cartIds.length === 0)
    return res.status(400).json({ error: 'No items to checkout' })

  cartIds.forEach(async cartId => {
    const cart = await pool.query('SELECT * FROM cart WHERE cart_id = $1 AND user_id = $2', [cartId, userId])
    if (cart.rowCount !== 0) {
      // if cart id is valid
      const product = await pool.query('SELECT p.user_id, p.price FROM products p LEFT JOIN cart c USING (product_id) WHERE c.user_id = $1', [userId])
      const sellerId = product.rows[0].user_id
      const total = +cart.rows[0].quantity * +product.rows[0].price
      try {
        await pool.query('INSERT INTO order_items (total, quantity, cart_id, buyer_id, seller_id) VALUES ($1, $2, $3, $4, $5)', [total, cart.rows[0].quantity, cartId, userId, sellerId])
      } catch (error) {
        if (error instanceof Error)
          return res.status(500).json(error.message)
      }
    }
  })
  res.sendStatus(204)
}

async function updateOrderStatus(req: Request, res: Response) {
  const { status }: OrderStatusType = req.body
  const { id: sellerId } = req.user
  const { id: itemsId } = req.params

  if (!status)
    return res.status(400).json({ error: 'Invalid status' })

  try {
    const order = await pool.query('UPDATE order_items SET status = $1 WHERE seller_id = $2 AND items_id = $3', [status, sellerId, itemsId])
    if (order.rowCount === 0)
      return res.sendStatus(404)

    res.sendStatus(204)
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json(error.message)
  }
}

async function getOrders(req: Request, res: Response) {
  const { id: sellerId } = req.user
  try {
    const orders = await pool.query('SELECT * FROM order_items WHERE seller_id = $1', [sellerId])
    res.status(200).json(orders.rows)
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json(error.message)
  }
}

export {
  checkout,
  updateOrderStatus,
  getOrders,
}