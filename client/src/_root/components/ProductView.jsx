import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from "react";
import axios from "axios";
import { ChevronLeftIcon, Star } from "lucide-react";
import ProductViewSkeleton from "../../utils/ProductViewSkeleton";
import { soldFormatter } from '../../utils/SoldFormatter'

function ProductView() {
const [productDetails, setProductDetails] = useState({});
const [isLoading, setIsLoading] = useState(true)
const { id } = useParams();
//make it from the DB JD LATER MAK, FOR NOW LS LANG S
const isInCart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")).filter(item => {
    return item._id === id;
}).length > 0 : null;


const navigate = useNavigate();
useEffect(() => {
    const getProductDetails = async () => {
        try {
            const { data: {rating, _doc} } = await axios.get(`/api/product/${id}`);
            console.log(typeof rating, rating)
            const prod = {rating, ..._doc}
            setProductDetails(prod)
        } catch (error) {
            console.log(error)
        }finally{
            setIsLoading(false);
        }
    }
    getProductDetails();
    
}, [])
  return (
    <div className="sm:w-full md:w-[75%] 2xl:w-[80%] max-w-[1200px] md:py-10 relative md:left-1/2 md:-translate-x-1/2">
    {/*CHANGE THIS INTO AN ACTUAL SKELETON */}
      { isLoading ? <ProductViewSkeleton />  : (
        <div className="flex flex-col md:flex-row md:h-[350px] gap-2 items-start">
            <div className="w-full flex-1 flex justify-center md:h-full relative select-none">
                <img src={productDetails?.imageUrl} className="aspect-square md:w-full md:h-full object-cover object-center rounded-lg" alt="product" />
                <ChevronLeftIcon onClick={() => navigate(-1)} size={50} color={"rgb(13,148,136)"} 
                className="hidden: md:block absolute top-1/2 -translate-y-1/2 cursor-pointer -left-14" />
            </div>
            <div id="info" className="w-full flex-1 flex flex-col gap-5 px-0 md:px-4">
                <p className="text-base md:text-lg">{productDetails?.description}</p>
                <div className="flex flex-col gap-1">
                    <p>Price: <span className="text-teal-600 font-medium text-lg">&#8369;{soldFormatter(productDetails?.price)}</span></p>
                    <p>Sold: <span className="text-teal-600 font-medium text-lg">{soldFormatter(productDetails?.totalSold)}</span></p>
                    <div className="self-start flex items-center gap-2">
                    <p className=''>Rating: </p>
                    <div className={`flex relative text-xl items-center self-start bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-teal-600 bg-no-repeat`} style={{backgroundSize: `${productDetails.rating}% 100%`}}>
                        <i className="fa fa-star" aria-hidden="true"></i>
                        <i className="fa fa-star" aria-hidden="true"></i>
                        <i className="fa fa-star" aria-hidden="true"></i>
                        <i className="fa fa-star" aria-hidden="true"></i>
                        <i className="fa fa-star" aria-hidden="true"></i>
                        <div className='w-full absolute flex items-center text-xl -z-[2] text-zinc-400'>
                            <i className="fa fa-star" aria-hidden="true"></i>
                            <i className="fa fa-star" aria-hidden="true"></i>
                            <i className="fa fa-star" aria-hidden="true"></i>
                            <i className="fa fa-star" aria-hidden="true"></i>
                            <i className="fa fa-star" aria-hidden="true"></i>
                        </div>
                    </div>
                    </div>
                </div>
                <button disabled={isInCart} className={isInCart ? 'btn-danger flex-1' : 'btn-primary flex-1'}>{isInCart ? "Remove Item" : "Add to Cart"}</button>
            </div>
        </div>
      )}
    </div>
  )
}

export default ProductView
