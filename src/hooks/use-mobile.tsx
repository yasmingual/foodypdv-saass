
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | null>(null)

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    
    // Initial check
    checkMobile()
    
    // Add resize listener
    window.addEventListener("resize", checkMobile)
    
    // Remove listener when component unmounts
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  return isMobile === null ? false : isMobile
}
