import { Link } from "react-router-dom"


function HomeNavBar({className, text}) {
  return (
    <div className={`col-span-12 row-span-1 px-10 bg-teal-900 text-white flex items-center justify-between z-[1000] ${className}`}>
      <Link to="/"><h1 className="logo text-2xl tracking-widest font-bold text-white">YouSell</h1></Link>
      <h1 className="logo tracking-widest text-xl">{text}</h1>
      <div></div>
    </div>
  )
}

export default HomeNavBar
