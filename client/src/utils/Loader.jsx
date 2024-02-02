function Loader({color = "white"}) {
  return (
    <div className={`w-[14px] h-[14px] rounded-full border-[2px] animate-[spin_1.7s_ease-in-out_infinite] border-${color} border-dotted`}></div>
  )
}

export default Loader
