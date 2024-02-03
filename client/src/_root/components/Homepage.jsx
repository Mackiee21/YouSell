import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import Loader from '../../utils/Loader'
import Skeleton from '../../utils/Skeleton';
function Homepage() {

  //query all the products in the db
  const [isLoading, setIsLoading] = useState(true);
  const [allProducts, setAllProducts] = useState([]);
  useEffect(() => {
      const getAllProducts = async () => {
          try {
            const { data: { products }} = await axios.get("/api/get-products");
            if(products){
              setAllProducts(products);
            }
          } catch (error) {
            console.log(error)
          }finally{
            setIsLoading(false);
          }
      }
      getAllProducts();
  }, [])
  return (
    <main className="flex flex-col gap-10">
      <section id="hero" className="flex bg-black p-2 items-center h-[330px]">
          <div className="ms-14">
            <h1 className="border-y-2 border-teal-600 text-zinc-800 w-fit tracking-wider font-bold font-mono text-3xl">YouSell</h1>
            <h2 className="mt-2">Have some pre-used books? Sell with YouSell</h2>
            <button className="bg-teal-600 text-white py-1.5 px-5 rounded mt-5 shadow-sm shadow-teal-900 hover:opacity-85 duration-150">Shop now</button>
          </div>
      </section> {/*HERO*/}
      {/* DISPLAY ALL THE BOOKS FOR SALE HERE... */}
      {/**MAKE THIS A LINK MAK */}
      {isLoading && <Skeleton howMany={10} /> }
      <section className={`grid grid-cols-5 gap-7 transition-all duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100' }`}>
        { allProducts?.map(product => {
          return (
            <Link key={product._id} to="/profile" className={`rounded-sm shadow-md shadow-zinc-300 cursor-pointer`}>
              <div className="overflow-hidden">
                <img src={product.imageUrl} 
                  className="aspect-square object-cover object-center rounded-t-sm hover:scale-110 transition-all duration-150" alt="cat"  />
              </div>
              <div className="p-2">
                <p className="font-medium text-zinc-800 text-md tracking-wide line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between mt-2.5">
                  <h5 className="font-semibold text-teal-600">&#8369;{product.price} </h5>
                  <p className="text-zinc-500 text-sm font-medium">{product.totalSold} sold</p>
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
