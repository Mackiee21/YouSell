import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Skeleton from '../../utils/Skeleton'
import { useUserContext } from '../.././context/AuthContext'
import { ShoppingCart, CheckCheck } from 'lucide-react'
import { soldFormatter } from '../../utils/SoldFormatter'
function Homepage() {
  //query all the products in the db
  const [isLoading, setIsLoading] = useState(false);
  const [addedToCart, setAddedToCart] = useState(
    localStorage.getItem('cart') ?
    JSON.parse(localStorage.getItem("cart")).map(item => {
    return item?._id;
  }) : []);
  const { products, ADD_PROD, ADD_TO_CART, cart } = useUserContext();
  useEffect(() => {
      const getAllProducts = async () => {
          try {
            setIsLoading(true)
            const { data: { products }} = await axios.get("/api/get-products");
            if(products){
              ADD_PROD(products);
            }
          } catch (error) {
            console.log(error)
          }finally{
            setIsLoading(false);
          }
      }
      if(!products) getAllProducts();
  }, [])

  const handleAddToCart = (e) => {
    console.log(e.target.id)
    if(e.target.id){
      setAddedToCart([...addedToCart, e.target.id]);
      const [ product ] = products?.filter(prod => {
        return prod?._id === e.target.id;
      });
      ADD_TO_CART(product)
    }
  }
  useEffect(() => {
    if(cart?.length >= 1){
      localStorage.setItem("cart", JSON.stringify(cart))
    }
  }, [cart])

  return (
    <main className="flex flex-col gap-3.5 md:gap-7">
      <section id="hero" className="flex rounded p-7 md:p-2 items-center md:h-[330px]">
          <div className="ms-2.5 md:ms-14">
            <h1 className="logo border-y-2 border-teal-600 text-slate-600 w-fit tracking-wider font-bold font-mono text-xl md:text-3xl">YouSell</h1>
            <h2 className="mt-2 text-sm md:text-base w-[70%] md:w-fit">Have some pre-used books? Sell with YouSell</h2>
            <button className="btn-primary mt-5">Shop now</button>
          </div>
      </section> {/*HERO*/}
      <div className="flex items-center gap-2">
        <h1 className='text-teal-600 font-semibold text-lg md:text-xl logo tracking-wide'>Popular Today</h1>
        <span className="flex-1 h-0.5 bg-slate-200"></span>
      </div>
      {isLoading && <Skeleton howMany={10} /> }
      <section className={`grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-2.5 md:gap-7 transition-all duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100' }`}>
        { products?.map(product => {
          return (
            <div key={product?._id} className={`rounded shadow-lg shadow-zinc-300 overflow-hidden`}>
              <Link to={`/product/${product?._id}`} className="cursor-pointer">
                <img src={product?.imageUrl} 
                  className="aspect-square object-cover object-center rounded-t-sm hover:scale-105 transition-all duration-150" alt="cat"  />
              </Link>
              <div className="p-2">
                <p className="font-medium text-zinc-800 text-md tracking-wide line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between mt-2.5">
                  {addedToCart.includes(product?._id) 
                  ? <CheckCheck size={20} color={"rgb(13,148,136)"} /> 
                  : <ShoppingCart id={product?._id} size={24} color={"rgb(13,148,136)"} className="cursor-pointer" 
                  onClick={handleAddToCart} />}

                  <h5 className="font-semibold text-teal-600">&#8369;{soldFormatter(product.price)} </h5>
                  <p className="text-zinc-500 text-sm font-medium">{soldFormatter(product.totalSold)} sold</p>
                </div>
              </div>
            </div>
          )
        }) }
        </section>
    </main>
  )
}

export default Homepage
