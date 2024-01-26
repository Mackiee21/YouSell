

function HeroWrapper({ children, ...rest }) {
  return (
    <div id="hero" className="min-h-svh" {...rest}>
      {children}
    </div>
  )
}

export default HeroWrapper
