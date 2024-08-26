import { Link } from 'react-router-dom'
import { ProductType } from '../../contexts/ProductContext'

type ProductCardProps = {
  product: ProductType
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link to={`/products/${product.product_id}`} className='bg-white rounded shadow hover:shadow-lg'>
      <img src={`http://localhost:3000/${product.image_path}`} alt="" className='aspect-square object-cover' />
      <div className='p-2'>
        <p className='text-sm'>{product.title}</p>
        <p className='text-orange-500 text-xl'>{product.price}</p>
        <div className='flex items-center gap-1 text-xs'>
          <p className='text-gray-500 line-through'>P1,500</p>
          <span>20%</span>
        </div>
      </div>
    </Link>
  )
}
