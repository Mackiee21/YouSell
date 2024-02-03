import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from "react";
import axios from "axios";
import { ChevronLeftIcon } from "lucide-react";
import ProductViewSkeleton from "../../utils/ProductViewSkeleton";
import { soldFormatter } from '../../utils/SoldFormatter'

function ProductView() {
const [productDetails, setProductDetails] = useState({});
const [isLoading, setIsLoading] = useState(true)
const { id } = useParams();
const navigate = useNavigate();
useEffect(() => {
    const getProductDetails = async () => {
        try {
            const {data: { product }} = await axios.get(`/api/product/${id}`);
            setProductDetails(product)
        } catch (error) {
            console.log(error)
        }finally{
            setIsLoading(false);
        }
    }
    getProductDetails();
    
}, [])
  return (
    <div className="w-[70%] py-10 relative left-1/2 -translate-x-1/2">
    {/*CHANGE THIS INTO AN ACTUAL SKELETON */}
      { isLoading ? <ProductViewSkeleton />  : (
        <div id="top-portion" className="flex h-[400px]">
            <div id="img" className="flex-1 h-full relative select-none">
                <img src={productDetails?.imageUrl} className="aspect-[4/5] rounded-sm" alt="product" />
                <ChevronLeftIcon onClick={() => navigate(-1)} size={50} color={"rgb(13,148,136)"} 
                className="absolute top-1/2 -translate-y-1/2 cursor-pointer -left-14" />
            </div>
            <div id="info" className="flex-1 flex flex-col gap-5 px-4">
                <p className="text-lg">{productDetails?.description}</p>
                <div className="">
                    <p>Price: <span className="text-teal-600 font-medium text-lg">&#8369;{soldFormatter(productDetails?.price)}</span></p>
                    <p>Sold: <span className="text-teal-600 font-medium text-lg">{soldFormatter(productDetails?.totalSold)}</span></p>
                </div>
                <button className="btn-primary">Add to Cart</button>
            </div>
        </div>
      )}
    </div>
  )
}

export default ProductView
