

function HeroWrapper({ children }) {
  return (
    <div id="hero-wrapper" className="min-h-svh flex flex-col bg-fixed">
      {children}
    </div>
  )
}

export default HeroWrapper
