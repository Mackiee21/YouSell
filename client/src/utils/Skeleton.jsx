
function Skeleton({ howMany = 1}) {
  const skeles = new Array(howMany).fill({key: "inamo", value: "inaka"});
  return (
    <div className="grid grid-cols-4 2xl:grid-cols-5 gap-7">
        {
          skeles.map((_, index) => {
            return (
                <div key={index} className="rounded-sm shadow-md shadow-zinc-300 bg--white">
                  <div className="bg-slate-200 h-[170px] animate-pulse"></div>
                  <div className="p-2">
                    <p className="bg-slate-200 animate-pulse h-10 rounded"></p>
                    <div className="flex items-center gap-5 justify-between mt-2.5 animate-pulse">
                      <h5 className="bg-slate-200 h-3 flex-1"></h5>
                      <p className="bg-slate-200 h-3 flex-1"></p>
                    </div>
                  </div>
              </div>
            );
          })
        }
    </div>
  );
  
  
  
}

export default Skeleton
