import { createContext, useContext, useState } from "react";
import { useUserContext } from "./UserContext";

export type CartItemType = {
  title: string
  price: string
  image_path: string
  product_id: string
  quantity: number
  store_name: string
  stock: string
  cart_id: string
}

type CartContextType = {
  items: CartItemType[]
  setItems: React.Dispatch<React.SetStateAction<CartItemType[]>>
  addToCart: (productId: number, quantity: number) => void
  updateCartQuantity: (quantity: number, cartId: string) => void
  deleteCartItem: (cartId: string) => void
}

const initialCartContext: CartContextType = {
  items: [],
  setItems: () => { },
  addToCart: () => { },
  updateCartQuantity: () => {},
  deleteCartItem: () => {},
}

const CartContext = createContext(initialCartContext)

type CartProviderProps = {
  children: React.ReactNode
}

export function CartProvider({ children }: CartProviderProps) {
  const { tokens } = useUserContext()
  const [items, setItems] = useState<CartItemType[]>([])

  async function addToCart(productId: number, quantity: number) {
    try {
      const res = await fetch(`/api/cart/${productId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tokens?.access}`
        },
        body: JSON.stringify({ quantity })
      })
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data);
      }
      setItems(data)
    } catch (error) {
      console.log(error)
    }
  }

  async function updateCartQuantity(quantity: number, cartId: string) {
    try {
      const res = await fetch(`/api/cart/${cartId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tokens?.access}`
        },
        body: JSON.stringify({ quantity })
      })
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data);
      }
      setItems(data)
    } catch (error) {
      console.log(error)
    }
  }

  async function deleteCartItem(cartId: string) {
    try {
      const res = await fetch(`/api/cart/${cartId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tokens?.access}`
        },
      })
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data);
      }
      setItems(data)
    } catch (error) {
      console.log(error)
    }
  }

  const contextValue = {
    items,
    setItems,
    addToCart,
    updateCartQuantity,
    deleteCartItem,
  }

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  )
}

export function useCartContext() {
  const cart = useContext(CartContext)
  if (!cart) {
    throw new Error("useCartContext must be used within CartProvider");
  }
  return cart
}