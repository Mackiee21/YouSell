import { Link } from "react-router-dom"


function HomeNavBar({className}) {
  return (
    <div className={className}>
      <Link to="/"><h1 className="logo ms-10 text-2xl tracking-widest font-bold">YouSell</h1></Link>
    </div>
  )
}

export default HomeNavBar
