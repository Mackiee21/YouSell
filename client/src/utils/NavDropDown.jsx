import { useUserContext } from "../context/AuthContext"
import { Link } from 'react-router-dom'
import { PlusIcon } from 'lucide-react'


function NavDropDown() {
    const { user } = useUserContext();
  return (
    <div className="border-[1.5px] border-teal-600 bg-teal-600 p-4 rounded whitespace-nowrap">
      <ul className="flex flex-col gap-3 tracking-wide text-white font-medium">
        <li className="flex items-center gap-2 border-b border-gray-400 pb-1">
            <div className="w-10 h-10 rounded-full overflow-hidden relative border-2 border-white">
                <img src="https://tse2.mm.bing.net/th?id=OIP.8JupcLPN_V7YSuIiPM58KwHaFK&pid=Api&P=0" className="object-center absolute top-0 left-0 object-cover w-full h-full" alt="user profile" />
            </div>
            <Link to="/profile" className="cursor-pointer">
                <h1 className="font-black">{user.name}</h1>
                <p className="text-[12px] font-normal">{user.username}</p>
            </Link>
        </li>
        <li className="text-sm mt-2 flex items-center gap-1">
            <PlusIcon size={19} />
            <p>Add Product</p>
        </li>
        <li></li>
      </ul>
    </div>
  )
}

export default NavDropDown
