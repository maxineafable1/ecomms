import { createContext, useContext, useEffect, useState } from "react";
import { useUserContext } from "./UserContext";
import { ProductFormType } from "../components/products/ProductForm";

export type ProductType = {
  category: string
  description: string
  image_path: string
  price: string
  product_id: number
  user_id: string
  stock: string
  title: string
  store_name: string
}

type ProductContextType = {
  products: ProductType[]
  updateProduct: (e: React.FormEvent<HTMLFormElement>, form: ProductFormType, id?: number) => void
  deleteProduct: (id: number) => void
  createProduct: (e: React.FormEvent<HTMLFormElement>, form: ProductFormType) => void
}

const initialProductContext: ProductContextType = {
  products: [],
  updateProduct: () => { },
  deleteProduct: () => { },
  createProduct: () => { }
}

const ProductContext = createContext(initialProductContext)

type ProductProviderProps = {
  children: React.ReactNode
}

export function ProductProvider({ children }: ProductProviderProps) {
  const [products, setProducts] = useState([])
  const { tokens } = useUserContext()

  async function updateProduct(e: React.FormEvent<HTMLFormElement>, form: ProductFormType, id?: number) {
    e.preventDefault()
    const formData = new FormData()
    formData.append('file', form.file as Blob)
    formData.append('title', form.title as string)
    formData.append('description', form.description as string)
    formData.append('price', form.price as string)
    formData.append('stock', form.stock as string)
    formData.append('category', form.category as string)
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${tokens?.access}`
        },
        body: formData
      })
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error);
      }
      console.log(data)
      setProducts(data)
    } catch (error) {
      console.log(error)
    }
  }

  async function deleteProduct(id: number) {
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tokens?.access}`
        },
      })
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error);
      }
      console.log(data)
      setProducts(data)
    } catch (error) {
      console.log(error)
    }
  }

  async function createProduct(e: React.FormEvent<HTMLFormElement>, form: ProductFormType) {
    e.preventDefault()
    const formData = new FormData()
    formData.append('file', form.file as Blob)
    formData.append('title', form.title as string)
    formData.append('description', form.description as string)
    formData.append('price', form.price as string)
    formData.append('stock', form.stock as string)
    formData.append('category', form.category as string)
    try {
      const res = await fetch('/api/products/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${tokens?.access}`
        },
        body: formData
      })
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error);
      }
      setProducts(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const abortController = new AbortController()
    async function getProducts() {
      try {
        const res = await fetch('/api/products/', {
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
        setProducts(data)
      } catch (error) {
        console.log(error)
      }
    }
    getProducts()

    return () => {
      abortController.abort()
    }
  }, [])

  const contextValue = {
    products,
    createProduct,
    deleteProduct,
    updateProduct,
  }

  return (
    <ProductContext.Provider value={contextValue}>
      {children}
    </ProductContext.Provider>
  )
}

export function useProductContext() {
  const product = useContext(ProductContext)
  if (!product) {
    throw new Error("useProductContext must be used within ProductProvider");
  }
  return product
}