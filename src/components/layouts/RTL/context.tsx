import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'

const LayoutDirectionContext = createContext<{
  isRTL: boolean
  toggleLayoutDirection: (val: boolean) => void
}>({
  isRTL: false,
  toggleLayoutDirection: (val: boolean) => {},
})

export const useLayoutDirection = () => {
  return useContext(LayoutDirectionContext)
}

export const LayoutDirectionProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const [isRTL, setIsRTL] = useState(false)

  // Initialize state from localStorage on the client side
  useEffect(() => {
    // Only execute this code in the browser
    const savedDirection = localStorage.getItem('isRTL')
    if (savedDirection) {
      setIsRTL(savedDirection === 'true')
    }
  }, [])

  const toggleLayoutDirection = (val: boolean) => {
    setIsRTL(val)
    // Save the current direction to localStorage
    localStorage.setItem('isRTL', val.toString())
  }

  useEffect(() => {
    // Update the root HTML element
    const rootHtml = document.getElementById('__next')
    const htmlTag = document.getElementsByTagName('html')[0]
    if (rootHtml) {
      rootHtml.setAttribute('dir', isRTL ? 'rtl' : 'ltr')
    }

    if (htmlTag) {
      htmlTag.setAttribute('dir', isRTL ? 'rtl' : 'ltr')
    }
  }, [isRTL])

  return (
    <LayoutDirectionContext.Provider value={{ isRTL, toggleLayoutDirection }}>
      {children}
    </LayoutDirectionContext.Provider>
  )
}
