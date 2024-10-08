import { Request, Response } from 'express'
import { pool } from '../database'
import fs from 'fs'
import path from 'path'

async function getProducts(req: Request, res: Response) {
  try {
    const { title } = req.query
    let products
    if (!title)
      products = await pool.query('SELECT * FROM products')
    else
      products = await pool.query('SELECT * FROM products WHERE title = $1', [title])

    res.status(200).json(products.rows)
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json(error.message)
  }
}

async function getProduct(req: Request, res: Response) {
  try {
    const { id } = req.params

    const product = await pool.query('SELECT p.product_id, p.title, p.category, p.description, p.price, p.stock, p.image_path, p.user_id, u.store_name FROM products p INNER JOIN users u USING (user_id) WHERE product_id = $1', [id])
    if (product.rowCount === 0)
      return res.status(404).json({ error: 'Product not found' })

    res.status(200).json(product.rows[0])
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json(error.message)
  }
}

async function createProduct(req: Request, res: Response) {
  const { title, description, price, stock, category } = req.body
  const imageFileName = req.file?.filename
  const { id } = req.user

  if (!title || !price || !stock || !imageFileName)
    return res.status(400).json({ error: 'All fields are required' })

  try {
    await pool.query('INSERT INTO products (title, description, price, stock, category, image_path, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7)', [title, description, price, stock, category, imageFileName, id])
    const products = await pool.query('SELECT * FROM products')
    res.status(200).json(products.rows)
  } catch (error) {
    if (error instanceof Error)
      res.status(400).json(error.message)
  }
}

async function deleteProduct(req: Request, res: Response) {
  try {
    const { id: userId } = req.user
    const { id: productId } = req.params

    const product = await pool.query('DELETE FROM products WHERE product_id = $1 AND user_id = $2 RETURNING *', [productId, userId])
    if (product.rowCount === 0)
      return res.status(404).json({ error: 'Product not found' })

    // delete the image file
    const filepath = path.resolve('uploads', product.rows[0].image_path)
    fs.unlinkSync(filepath)

    const products = await pool.query('SELECT * FROM products')
    res.status(200).json(products.rows)
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json(error.message)
  }
}

async function updateProduct(req: Request, res: Response) {
  const { title, description = '', price, stock, category = '' } = req.body
  let imageFileName = req.file?.filename
  const { id: userId } = req.user
  const { id: productId } = req.params

  if (!title || !price || !stock)
    return res.status(400).json({ error: 'All fields are required' })

  // get the current product image to delete the file
  const productImage = await pool.query('SELECT image_path FROM products WHERE product_id = $1 AND user_id = $2', [productId, userId])
  if (productImage.rowCount === 0)
    return res.status(404).json({ error: 'Product not found' })

  // if the image is not updated use the current product image
  if (!imageFileName)
    imageFileName = productImage.rows[0].image_path
  else {
    // delete the current image then update with the new
    const filepath = path.resolve('uploads', productImage.rows[0].image_path)
    fs.unlinkSync(filepath)
  }

  try {
    const product = await pool.query('UPDATE products SET title = $1, description = $2, price = $3, stock = $4, category = $5, image_path = $6 WHERE product_id = $7 AND user_id = $8 RETURNING *', [title, description, price, stock, category, imageFileName, productId, userId])

    if (product.rowCount === 0)
      return res.status(404).json({ error: 'Product not found' })

    const products = await pool.query('SELECT * FROM products')
    res.status(200).json(products.rows)
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json(error.message)
  }
}

export {
  getProducts,
  getProduct,
  createProduct,
  deleteProduct,
  updateProduct,
}