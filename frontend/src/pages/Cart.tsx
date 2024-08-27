import { Link } from "react-router-dom";
import { useCartContext } from "../contexts/CartContext";
import { useUserContext } from "../contexts/UserContext";
import { Fragment, useEffect } from "react";
import CartItem from "../components/CartItem";

export default function Cart() {
  const { tokens } = useUserContext()
  const { items, setItems } = useCartContext()

  const groupedCartItems = Object.groupBy(items, (item) => item.store_name)
  const cartItems = Object.entries(groupedCartItems)

  useEffect(() => {
    if (!tokens) return
    const abortController = new AbortController()
    async function getCartItems() {
      try {
        const cartItem = await fetch('/api/cart/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokens?.access}`
          },
          signal: abortController.signal
        })
        const data = await cartItem.json()
        if (!cartItem.ok) {
          throw new Error(data);
        }
        setItems(data)
      } catch (error) {
        console.log(error)
      }
    }
    getCartItems()

    return () => {
      abortController.abort()
    }
  }, [tokens])

  return (
    <>
      {!tokens ? (
        <p>Login to see cart</p>
      ) : (
        <>
          {cartItems.length === 0 ? (
            <p>You have no items in cart</p>
          ) : (
            <div className="flex gap-4">
              <div className="flex-1">
                <div className="bg-white mb-4 p-2 rounded">
                  <input type="checkbox" id="selectAll" className="mr-2" />
                  <label htmlFor="selectAll"> Select All <span>(1 Item(s))</span></label>
                </div>
                <div className="grid gap-1">
                  {cartItems?.map(cartItem => (
                    <Fragment key={cartItem[0]}>
                      <div className="bg-white p-2 rounded">
                        <input type="checkbox" className="mr-3" />
                        <Link to='/'>{cartItem[0]}</Link>
                      </div>
                      {cartItem[1]?.map((item, _, arr) => (
                        <CartItem key={item.product_id} item={item} arr={arr} cartItem={cartItem[1]} />
                      ))}
                    </Fragment>
                  ))}
                </div>
              </div>
              <div className="bg-white p-2 rounded w-80 h-80 gap-4 flex flex-col">
                <div>
                  <p className="text-sm text-gray-400">Location</p>
                  <p className="text-xs">Aduas Centro (Aduas), Cabanatuan, Nueva Ecija</p>
                </div>
                <div className="w-full h-0.5 bg-gray-200"></div>
                <div className="flex-1 flex flex-col">
                  <h3 className="font-semibold mb-4">Order Summary</h3>
                  <div className="flex items-center justify-between mb-2">
                    <p>Subtotal <span>(2 items)</span></p>
                    <p>₱187.00</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p>Shipping Fee</p>
                    <p>₱58.50</p>
                  </div>
                  <div className="flex items-center justify-between mt-auto">
                    <p>Subtotal</p>
                    <p className="text-orange-500 text-lg">₱245.50</p>
                  </div>
                  <button className="bg-orange-500 text-white mt-4 py-1 rounded">Proceed to Checkout <span>(2)</span></button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  )
}
