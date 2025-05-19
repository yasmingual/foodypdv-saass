
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  // Inicializa com null para evitar flash durante hidratação
  const [isMobile, setIsMobile] = React.useState<boolean | null>(null)

  React.useEffect(() => {
    // Função para verificar se o tamanho da tela é mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    
    // Verifica inicial
    checkMobile()
    
    // Adiciona listener para redimensionamento
    window.addEventListener("resize", checkMobile)
    
    // Remove listener quando o componente é desmontado
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Se ainda não foi determinado, retorne um valor padrão
  // Isso evita oscilações durante a hidratação do componente
  return isMobile === null ? false : isMobile
}
