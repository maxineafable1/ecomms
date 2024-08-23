import { Link } from 'react-router-dom'
import laptop from '../../../public/laptop.jpg'

export default function ProductCard() {
  return (
    <Link to='/products/1' className='bg-white rounded shadow hover:shadow-lg'>
      <img src={laptop} alt="" className='aspect-square object-cover' />
      <div className='p-2'>
        <p className='text-sm'>Sample Product Title Here</p>
        <p className='text-orange-500 text-xl'>P2,500</p>
        <div className='flex items-center gap-1 text-xs'>
          <p className='text-gray-500 line-through'>P1,500</p>
          <span>20%</span>
        </div>
      </div>
    </Link>
  )
}
