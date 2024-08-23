import ProductCard from "./ProductCard"

const arr = [1, 2, 3, 4, 5, 6]

export default function ProductList() {
  return (
    <div className='grid grid-cols-6 gap-x-2 gap-y-4'>
      {arr?.map((v, i) => (
        <ProductCard key={i} />
      ))}
    </div>
  )
}
