import { useRouter } from 'next/router'

export const useCheckPath = () => {
  const router = useRouter()

  const clientType: 'INTERNAL' | 'EXTERNAL' = router.pathname.includes(
    '/client/internal'
  )
    ? 'INTERNAL'
    : 'EXTERNAL'

  const scopeType: 'INTERNAL' | 'EXTERNAL' = router.pathname.includes(
    '/client/internal'
  )
    ? 'INTERNAL'
    : 'EXTERNAL'

  return { clientType, scopeType }
}
