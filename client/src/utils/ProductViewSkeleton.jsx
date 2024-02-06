
function ProductViewSkeleton() {
  return (
    <div className="flex flex-col md:flex-row h-[350px] animate-pulse">
        <div className="flex-1 h-full bg-slate-200 rounded"></div>
        <div className="flex-1 flex flex-col gap-5 px-4">
            <div className="h-12 bg-slate-200 rounded"></div>
            <div className="flex flex-col gap-2">
                <div className="w-32 h-7 bg-slate-200 rounded"></div>
                <div className="w-28 h-7 bg-slate-200 rounded"></div>
            </div>
            <div className="h-10 bg-slate-200 rounded"></div>
        </div>
    </div>
  )
}

export default ProductViewSkeleton
