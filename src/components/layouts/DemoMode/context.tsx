import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react'

const DemoModeContext = createContext<{
  isDemoMode: boolean
  toggleDemoMode: (val: boolean) => void
}>({
  isDemoMode: false,
  toggleDemoMode: (val: boolean) => {
  },
})

export const useDemoMode = () => {
  return useContext(DemoModeContext)
}

export const DemoModeProvider = ({
                                   children,
                                 }: {
  children: ReactNode
}) => {
  const [isDemoMode, setIsDemoMode] = useState(false)

  // Initialize state from localStorage on the client side
  useEffect(() => {
    // Only execute this code in the browser
    const saveDemoMode = localStorage.getItem('isDemoMode')
    if (saveDemoMode) {
      setIsDemoMode(saveDemoMode === 'true')
    }
  }, [])

  const toggleDemoMode = (val: boolean) => {
    setIsDemoMode(val)
    localStorage.setItem('isDemoMode', val.toString())
  }

  const contextValue = useMemo(() => ({ isDemoMode, toggleDemoMode }), [isDemoMode])

  return (
    <DemoModeContext.Provider value={contextValue}>
      {children}
    </DemoModeContext.Provider>
  )
}
