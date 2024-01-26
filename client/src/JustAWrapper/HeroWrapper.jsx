

function HeroWrapper({ children }) {
  return (
    <div id="hero" className="min-h-svh grid grid-cols-5 grid-rows-12">
      {children}
    </div>
  )
}

export default HeroWrapper
