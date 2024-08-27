import { useState } from "react"
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa"
import { Link } from "react-router-dom"
import { CartItemType, useCartContext } from "../contexts/CartContext"

type CartItemProps = {
  item: CartItemType
  arr: CartItemType[]
  cartItem: CartItemType[] | undefined
}

export default function CartItem({ item, arr, cartItem }: CartItemProps) {
  const { updateCartQuantity, deleteCartItem } = useCartContext()
  const [quantity, setQuantity] = useState(item.quantity)

  function handleQuantity(e: React.ChangeEvent<HTMLInputElement>) {
    let value = +e.target.value
    if (value > +item.stock)
      value = +item.stock
    setQuantity(value)
    if (value <= 0)
      updateCartQuantity(1, item.cart_id)
    else
      updateCartQuantity(value, item.cart_id)
  }

  return (
    <div key={item.product_id} className={`flex items-center justify-between bg-white rounded p-2 ${arr[cartItem?.length! - 1].product_id === item.product_id && 'mb-8'}`}>
      <div className="flex items-center">
        <input type="checkbox" />
        <Link
          to={`/products/${item.product_id}`}
        >
          <div className="flex items-center gap-4">
            <img src={`http://localhost:3000/${item.image_path}`} alt="" className="block max-w-28" />
            <div>
              <p className="text-sm truncate text-wrap w-[40ch]">{item.title}</p>
              <p className="text-xs text-gray-400">UV black, Manual</p>
            </div>
          </div>
        </Link>
      </div>
      <div className="text-center">
        <p className="text-orange-500 text-lg">{item.price}</p>
        <button onClick={() => deleteCartItem(item.cart_id)}><FaTrash fontSize='0.8rem' /></button>
      </div>
      <div className='flex items-center gap-1 mr-8'>
        <button onClick={() => setQuantity(prev => {
          let newQuantity: number;
          if (prev > 1) {
            newQuantity = prev - 1
            updateCartQuantity(newQuantity, item.cart_id)
            return newQuantity
          }
          newQuantity = 1
          updateCartQuantity(newQuantity, item.cart_id)
          return newQuantity
        })}><FaMinus /></button>
        <input
          type="text"
          className='max-w-8 bg-slate-200 rounded text-center'
          onKeyDown={e => {
            if (isNaN(+e.key) && e.key.toLowerCase() !== 'backspace') e.preventDefault()
          }}
          value={quantity}
          onBlur={e => {
            if (+e.target.value <= 0)
              setQuantity(1)
          }}
          onChange={handleQuantity}
        />
        <button onClick={() => setQuantity(prev => {
          let newQuantity: number;
          if (prev < +item?.stock!) {
            newQuantity = +prev + 1
            updateCartQuantity(newQuantity, item.cart_id)
            return newQuantity
          }
          newQuantity = +item?.stock!
          updateCartQuantity(newQuantity, item.cart_id)
          return newQuantity
        })}><FaPlus /></button>
      </div>
    </div>
  )
}
