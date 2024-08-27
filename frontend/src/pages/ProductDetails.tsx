import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaMinus, FaPlus } from "react-icons/fa";
import { ProductType, useProductContext } from '../contexts/ProductContext';
import { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";
import { useUserContext } from '../contexts/UserContext';
import useDialog from '../hooks/useDialog';
import ProductForm from '../components/products/ProductForm';
import { useCartContext } from '../contexts/CartContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface MyToken {
  id: string
}

export default function ProductDetails() {
  const { deleteProduct } = useProductContext()
  const [product, setProduct] = useState<ProductType | null>(null)
  const [quantity, setQuantity] = useState(1)
  const { tokens } = useUserContext()
  const accessId = tokens && jwtDecode<MyToken>(tokens?.access).id

  const { dialogRef, setIsOpen } = useDialog()
  const [productUpdated, setProductUpdated] = useState(false)
  const navigate = useNavigate()
  const { id } = useParams()

  const { addToCart } = useCartContext() 

  function handleQuantity(e: React.ChangeEvent<HTMLInputElement>) {
    if (!product) return
    let value = +e.target.value
    if (value > +product.stock)
      value = +product.stock
    setQuantity(+value)
  }

  useEffect(() => {
    const abortController = new AbortController()
    async function getProduct() {
      try {
        const res = await fetch(`/api/products/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          signal: abortController.signal
        })
        const data = await res.json()
        if (!res.ok) {
          throw new Error(data);
        }
        console.log(data)
        setProduct(data)
      } catch (error) {
        console.log(error)
      }
    }
    getProduct()

    return () => {
      abortController.abort()
    }
  }, [productUpdated])

  return (
    <>
      <div className='flex-col lg:flex-row flex bg-white'>
        <div className='flex-col md:flex-row flex p-4 gap-4'>
          <img
            src={`http://localhost:3000/${product?.image_path}`}
            alt=""
            className='block aspect-square object-cover md:max-w-64'
          />
          <div className='flex-1 flex flex-col'>
            <h2 className='text-xl lg:text-wrap lg:w-[40ch]'>{product?.title}</h2>
            <div className='w-full h-0.5 bg-gray-200 my-4'></div>
            <p className='text-orange-500 text-3xl '>{product?.price}</p>
            <div className='flex items-center gap-1'>
              <p className='text-gray-500 line-through'>P1,500</p>
              <span>-20%</span>
            </div>
            <div className='w-full h-0.5 bg-gray-200 my-4'></div>
            <div className='text-sm mb-4'>
              <p>Stock: <span>{product?.stock}</span></p>
            </div>
            <div className='flex gap-4 mt-auto'>
              <span>Quantity</span>
              <div className='flex items-center gap-1'>
                <button onClick={() => setQuantity(prev => prev > 1 ? prev - 1 : 1)}><FaMinus /></button>
                <input
                  type="text"
                  onKeyDown={e => {
                    if (isNaN(+e.key) && e.key.toLowerCase() !== 'backspace') e.preventDefault()
                  }}
                  value={quantity}
                  onBlur={e => {
                    if (+e.target.value === 0)
                      setQuantity(1)
                  }}
                  onChange={handleQuantity}
                  className='max-w-8 bg-slate-200 rounded text-center'
                />
                <button onClick={() => setQuantity(prev => prev < +product?.stock! ? prev + 1 : +product?.stock!)}><FaPlus /></button>
              </div>
            </div>
            <div className='flex gap-2 mt-8 text-white'>
              {accessId === product?.user_id ? (
                <>
                  <button 
                    className='bg-blue-400 flex-1 py-1 rounded'
                    onClick={() => {
                      setIsOpen(true)
                    }}
                  >
                    Edit
                  </button>
                  <ProductForm dialogRef={dialogRef} setIsOpen={setIsOpen} product={product} isUpdate setProductUpdated={setProductUpdated} />
                  <button 
                    className='bg-red-400 flex-1 py-1 rounded'
                    onClick={() => {
                      deleteProduct(product.product_id)
                      navigate('/')
                    }}
                  >
                    Delete
                  </button>
                </>
              ) : (
                <>
                  <button className='bg-yellow-400 flex-1 py-1 rounded'>Buy Now</button>
                  <button 
                    className='bg-orange-400 flex-1 py-1 rounded'
                    onClick={() => {
                      addToCart(product?.product_id as number, quantity)
                      toast.success('Added to cart')
                    }}
                  >
                    Add to Cart
                  </button>
                  <ToastContainer autoClose={1500} position='top-left' />
                </>
              )}
            </div>

          </div>
        </div>
        <div className='flex flex-col flex-1 bg-slate-100 p-4'>
          <p className='text-xs text-gray-500'>Sold by</p>
          <p>{product?.store_name}</p>
          <Link to='/' className='mt-auto text-blue-400'>Go to Store</Link>
        </div>
      </div>
      <div className='bg-white mt-4'>
        <h3 className='bg-slate-100 font-semibold p-4'>Description of {product?.title}</h3>
        <p className='p-4'>{product?.description}</p>
      </div>
    </>
  )
}