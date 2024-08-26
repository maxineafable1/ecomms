import { ProductType, useProductContext } from "../../contexts/ProductContext"
import ProductCard from "./ProductCard"

export default function ProductList() {
  const { products }: { products: ProductType[] } = useProductContext()

  return (
    <div className='grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-x-2 gap-y-4'>
      {products?.map(product => (
        <ProductCard key={product.product_id} product={product} />
      ))}
    </div>
  )
}
