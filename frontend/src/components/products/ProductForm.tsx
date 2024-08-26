import { useState } from "react"
import { ProductType, useProductContext } from "../../contexts/ProductContext"

export type ProductFormType = {
  file: File | null
  title?: string
  description?: string
  price?: string
  stock?: string
  category?: string
}

type ProductFormProps = {
  dialogRef: React.RefObject<HTMLDialogElement>
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  isUpdate?: boolean
  product?: ProductType
  setProductUpdated: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ProductForm({ dialogRef, setIsOpen, product, isUpdate = false, setProductUpdated }: ProductFormProps) {
  const { createProduct, updateProduct } = useProductContext()
  const [form, setForm] = useState<ProductFormType>({
    file: null,
    title: isUpdate ? product?.title : '',
    description: isUpdate ? product?.description : '',
    price: isUpdate ? product?.price : '',
    stock: isUpdate ? product?.stock : '',
    category: isUpdate ? product?.category : '',
  })

  console.log(product)

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  return (
    <dialog
      ref={dialogRef}
      className="p-4 rounded"
    >
      <h2 className="text-center mb-4 font-semibold text-xl">{isUpdate ? 'Update a product' : 'Create a product'}</h2>
      <form
          className="grid gap-2"
          encType="multipart/form-data"
          onSubmit={e => {
            if (isUpdate) {
              updateProduct(e, form, product?.product_id)
              setProductUpdated(true)
            }
            else
              createProduct(e, form)

            dialogRef.current?.close()
            setIsOpen(false)
          }}
        >
          <div className="grid">
            <label htmlFor="file">Image</label>
            <input
              type="file"
              id="file"
              name="file"
              className="bg-gray-200 px-2 py-1 rounded text-sm"
              accept="image/png, image/gif, image/jpeg"
              onChange={e => setForm({ ...form, file: e.target.files && e.target.files[0] })}
            />
          </div>
          <div className="grid">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              className="bg-gray-200 px-2 py-1 rounded"
              value={form.title}
              onChange={handleChange}
            />
          </div>
          <div className="grid">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              className="bg-gray-200 px-2 py-1 rounded"
              value={form.description}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center gap-2">
            <div className="grid">
              <label htmlFor="price">Price</label>
              <input
                type="text"
                id="price"
                name="price"
                className="bg-gray-200 px-2 py-1 rounded"
                value={form.price}
                onChange={handleChange}
              />
            </div>
            <div className="grid">
              <label htmlFor="stock">Stock</label>
              <input
                type="text"
                id="stock"
                name="stock"
                className="bg-gray-200 px-2 py-1 rounded"
                value={form.stock}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="grid">
            <label htmlFor="category">Category</label>
            <input
              type="text"
              id="category"
              name="category"
              className="bg-gray-200 px-2 py-1 rounded"
              value={form.category}
              onChange={handleChange}
            />
          </div>
          <button className="bg-orange-400 text-white p-1 rounded mt-4">{isUpdate ? 'Update' : 'Create'}</button>
        </form>
    </dialog>
  )
}