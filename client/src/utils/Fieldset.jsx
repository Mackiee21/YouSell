
function Fieldset({legend, className, children}) {
  return (
    <fieldset className={`border-[1.5px] border-teal-900 rounded-md p-5 ${className}`}>
        <legend className="text-teal-900 font-bold tracking-wider">{legend}</legend>
        {children}
    </fieldset>
  )
}

export default Fieldset
