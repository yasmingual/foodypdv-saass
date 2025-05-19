
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | null>(null)

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    
    // Verificação inicial
    checkMobile()
    
    // Adicionar listener para mudanças de tamanho
    window.addEventListener("resize", checkMobile)
    
    // Remover listener quando o componente for desmontado
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  return isMobile === null ? false : isMobile
}
