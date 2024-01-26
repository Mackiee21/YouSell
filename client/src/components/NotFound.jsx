
function NotFound() {
  return (
    <div className="min-h-svh flex flex-col items-center justify-center bg-zinc-200">
      <h1 className="text-[5.5rem] text-teal-900">404</h1>
        <h2 className="text-[1.8rem] font-extrabold">PAGE NOT FOUND</h2>
        <a className="mt-5 bg-teal-900 text-white py-2 px-7 rounded-md hover:opacity-85 transition-all duration-150" href="/">Return</a>
    </div>
  )
}

export default NotFound
