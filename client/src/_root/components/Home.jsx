import { useLayoutEffect } from "react"
import ImgMain from './assets/hero-main.jpg'
import Img1 from './assets/hero-1.jpg'
import Img2 from './assets/hero-2.jpg'
import { useState } from "react"
import { useEffect } from "react"

function Home() {
  const [currentImage, setCurrentImage] = useState(0)
  const Images = [ImgMain, Img1, Img2];

const handleNext = () => {
  if((currentImage + 1) >= 3){
    setCurrentImage(0)
  }else{
    setCurrentImage(prev => prev + 1)
  }
}
useEffect(() => {
  const interval =  setInterval(() => {
    handleNext();
   }, 2200)
   return () => clearInterval(interval);
 }, [currentImage])
  return (
    <div className="h-screen">
      <div id="HERO" className="h-4/5 grid grid-cols-12 grid-rows-12 gap-3">
          <div className="col-span-9 row-span-12">
            <img className="w-full h-full object-cover object-center" src={Images[currentImage]} alt='hero-main' />
          </div>
          <div className="col-span-3 row-span-12 grid grid-cols-1 bg-orange-50 grid-rows-12">
            <div className="row-span-6">
              <img src={currentImage === 2 ? Images[0]: Images[currentImage + 1]} className="w-full h-full object-cover object-top"   alt="hero-1" />
            </div>
            <div className="row-span-6">
              <img src={currentImage >= 1 ? Images[currentImage-1] : Images[currentImage + 2]} className="w-full h-full object-cover object-top" alt="hero-2" />
            </div>
          </div>
      </div>
    </div>
  )
}

export default Home
