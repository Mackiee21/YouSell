
function Fieldset({legend, className, children}) {
  return (
    <fieldset className={`md:border-[1.5px] border-teal-900 rounded-md md:p-5 ${className}`}>
        <legend className="text-teal-900 font-bold tracking-wider border-b-[0.5px] border-teal-900 pb-2 md:pb-0 md:border-none w-full md:w-fit mb-5 md:mb-0">{legend}</legend>
        {children}
    </fieldset>
  )
}

export default Fieldset
