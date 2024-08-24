import { Link } from "react-router-dom";
import laptop from '../../public/laptop.jpg'
import { FaMinus, FaPlus } from "react-icons/fa";

export default function Cart() {
  return (
    <div className="flex gap-4">
      <div className="flex-1">
        <div className="bg-white mb-4 p-2 rounded">
          <input type="checkbox" id="selectAll" className="mr-2" />
          <label htmlFor="selectAll"> Select All <span>(1 Item(s))</span></label>
        </div>
        <div className="grid gap-1">
          <div className="bg-white p-2 rounded">
            <input type="checkbox" className="mr-3" />
            <Link to='/'>Store Name</Link>
          </div>
          <div className="flex items-center justify-between bg-white rounded p-2">
            <div className="flex items-center">
              <input type="checkbox" />
              <Link
                to='/product/1'
              >
                <div className="flex items-center gap-4">
                  <img src={laptop} alt="" className="block max-w-28" />
                  <div>
                    <p className="text-sm truncate text-wrap w-[40ch]">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos, culpa.</p>
                    <p className="text-xs text-gray-400">UV black, Manual</p>
                  </div>
                </div>
              </Link>
            </div>
            <div>
              <p className="text-orange-500 text-lg">₱79.00</p>
              <button>Delete</button>
            </div>
            <div className='flex items-center gap-1 mr-8'>
              <FaMinus />
              <input type="text" className='max-w-8 bg-slate-200 rounded text-center' />
              <FaPlus />
            </div>
          </div>
          <div className="flex items-center justify-between bg-white rounded p-2">
            <div className="flex items-center">
              <input type="checkbox" />
              <Link
                to='/product/1'
              >
                <div className="flex items-center gap-4">
                  <img src={laptop} alt="" className="block max-w-28" />
                  <div>
                    <p className="text-sm truncate text-wrap w-[40ch]">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos, culpa.</p>
                    <p className="text-xs text-gray-400">UV black, Manual</p>
                  </div>
                </div>
              </Link>
            </div>
            <div>
              <p className="text-orange-500 text-lg">₱79.00</p>
              <button>Delete</button>
            </div>
            <div className='flex items-center gap-1 mr-8'>
              <FaMinus />
              <input type="text" className='max-w-8 bg-slate-200 rounded text-center' />
              <FaPlus />
            </div>
          </div>
        </div>
        <div className="grid gap-1 mt-4">
          <div className="bg-white p-2 rounded">
            <input type="checkbox" className="mr-3" />
            <Link to='/'>Store Name</Link>
          </div>
          <div className="flex items-center justify-between bg-white rounded p-2">
            <div className="flex items-center">
              <input type="checkbox" />
              <Link
                to='/product/1'
              >
                <div className="flex items-center gap-4">
                  <img src={laptop} alt="" className="block max-w-28" />
                  <div>
                    <p className="text-sm truncate text-wrap w-[40ch]">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos, culpa.</p>
                    <p className="text-xs text-gray-400">UV black, Manual</p>
                  </div>
                </div>
              </Link>
            </div>
            <div>
              <p className="text-orange-500 text-lg">₱79.00</p>
              <button>Delete</button>
            </div>
            <div className='flex items-center gap-1 mr-8'>
              <FaMinus />
              <input type="text" className='max-w-8 bg-slate-200 rounded text-center' />
              <FaPlus />
            </div>
          </div>
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

  )
}
