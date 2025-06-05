import { setCmsToken } from '@/config/token'
import { toastError } from '@/toast'
import { postLogin } from '@/service/auth/login'
import { useRouter } from 'next/router'
import { useState } from 'react'

export const useLogin = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const loginAccount = async (dataLogin: any) => {
    try {
      setLoading(true)
      const requestBody = {
        username: dataLogin?.username,
        password: dataLogin?.password,
        grant_type: 'password',
      }
      const data = await postLogin(requestBody)
      setCmsToken(data?.data)
      router.push('/')
      setLoading(false)
    } catch (err) {
      toastError(err)
      localStorage.clear()
      sessionStorage.clear()
      setLoading(false)
    }
  }

  return { loginAccount, loading }
}
