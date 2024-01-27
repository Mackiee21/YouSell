import { Link } from "react-router-dom"


function HomeNavBar({className}) {
  return (
    <div className={`col-span-12 row-span-1 bg-teal-900 text-white flex items-center z-[1000] ${className}`}>
      <Link to="/"><h1 className="logo ms-10 text-2xl tracking-widest font-bold text-white">YouSell</h1></Link>
    </div>
  )
}

export default HomeNavBar
