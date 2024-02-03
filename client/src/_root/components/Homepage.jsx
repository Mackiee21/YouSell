import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Skeleton from '../../utils/Skeleton'
import { useUserContext } from '../.././context/AuthContext'
import { ShoppingCart } from 'lucide-react'
import { soldFormatter } from '../../utils/SoldFormatter'
function Homepage() {

  //query all the products in the db
  const [isLoading, setIsLoading] = useState(false);
  const { products, ADD_PROD } = useUserContext();
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
  return (
    <main className="flex flex-col gap-5 md:gap-10">
      <section id="hero" className="flex bg-black p-2 items-center h-[330px]">
          <div className="ms-14">
            <h1 className="logo border-y-2 border-teal-600 text-zinc-800 w-fit tracking-wider font-bold font-mono text-3xl">YouSell</h1>
            <h2 className="mt-2">Have some pre-used books? Sell with YouSell</h2>
            <button className="btn-primary mt-5">Shop now</button>
          </div>
      </section> {/*HERO*/}
      {/* DISPLAY ALL THE BOOKS FOR SALE HERE... */}
      {/**MAKE THIS A LINK MAK */}
      {isLoading && <Skeleton howMany={10} /> }
      <section className={`grid grid-cols-5 gap-2.5 md:gap-7 transition-all duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100' }`}>
        { products?.map(product => {
          return (
            <Link key={product._id} to={`/product/${product._id}`} className={`rounded-sm shadow-lg shadow-zinc-300 cursor-pointer`}>
              <div className="overflow-hidden">
                <img src={product.imageUrl} 
                  className="aspect-square object-cover object-center rounded-t-sm hover:scale-105 transition-all duration-150" alt="cat"  />
              </div>
              <div className="p-2">
                <p className="font-medium text-zinc-800 text-md tracking-wide line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between mt-2.5">
                  <ShoppingCart size={20} color={"rgb(13,148,136)"} />
                  <h5 className="font-semibold text-teal-600">&#8369;{soldFormatter(product.price)} </h5>
                  <p className="text-zinc-500 text-sm font-medium">{soldFormatter(product.totalSold)} sold</p>
                </div>
              </div>
            </Link>
          )
        }) }
        </section>
    </main>
  )
}

export default Homepage
