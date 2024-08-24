import { Link } from 'react-router-dom';
import laptop from '../../public/laptop.jpg'
import { FaMinus, FaPlus } from "react-icons/fa";

export default function ProductDetails() {
  return (
    <>
      <div className='flex-col lg:flex-row flex bg-white'>
        <div className='flex-col md:flex-row flex p-4 gap-4'>
          <img 
            src={laptop} 
            alt="" 
            className='block aspect-square object-cover md:max-w-64'
          />
          <div className='flex-1 flex flex-col'>
            <h2 className='text-xl'>Panasony DS18 Portable Handheld Mini Fan</h2>
            <div className='w-full h-0.5 bg-gray-200 my-4'></div>
            <p className='text-orange-500 text-3xl '>₱69.00</p>
            <div className='flex items-center gap-1'>
              <p className='text-gray-500 line-through'>P1,500</p>
              <span>-20%</span>
            </div>
            <div className='w-full h-0.5 bg-gray-200 my-4'></div>
            <div className='flex gap-4 mt-auto'>
              <span>Quantity</span>
              <div className='flex items-center gap-1'>
                <FaMinus />
                <input type="text" className='max-w-8 bg-slate-200 rounded text-center' />
                <FaPlus />
              </div>
            </div>
            <div className='flex gap-2 mt-8 text-white'>
              <button className='bg-yellow-400 flex-1 py-1 rounded'>Buy Now</button>
              <button className='bg-orange-400 flex-1 py-1 rounded'>Add to Cart</button>
            </div>
          </div>
        </div>
        <div className='flex flex-col flex-1 bg-slate-100 p-4'>
          <p className='text-xs text-gray-500'>Sold by</p>
          <p>Seller Name</p>
          <Link to='/' className='mt-auto text-blue-400'>Go to Store</Link>
        </div>
      </div>
      <div className='bg-white mt-4'>
        <h3 className='bg-slate-100 font-semibold p-4'>Description of Product Title</h3>
        <p className='p-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis nam ut architecto adipisci quia magni nostrum, delectus blanditiis fuga. Commodi.</p>
      </div>
    </>
  )
}
