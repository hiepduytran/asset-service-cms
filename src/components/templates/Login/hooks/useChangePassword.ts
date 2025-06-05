import { authUaaApi } from '@/config/auth'
import { toastError, toastSuccess } from '@/toast'
import { REGEX } from '@/helper/regex'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export const getOtpForgotPassword = (data: any) => {
  return authUaaApi({
    url: '/public-api/v1/user/forgot-password',
    method: 'post',
    data,
  })
}

export const submitChangePassword = (data: any) => {
  return authUaaApi({
    url: '/public-api/v1/user/submit-password',
    method: 'post',
    data,
  })
}

const useChangePassword = () => {
  const [otp, setOtp] = useState()
  const { t } = useTranslation('common')

  const getOtp = async (val: string) => {
    try {
      const res = await getOtpForgotPassword({
        otpReceiver: val,
        receiverType: REGEX.EMAIL.test(val) ? 'EMAIL' : 'PHONE',
      })
      setOtp(res?.data?.data)
      toastSuccess(t('message.success'))
      return res?.data?.data
    } catch (err) {
      toastError(err)
    }
  }

  const handleChangePassword = async (val: any) => {
    try {
      const res = await submitChangePassword(val)
      toastSuccess(t('changepassword.success'))
      return res?.data
    } catch (err) {
      toastError(err)
    }
  }

  return { getOtp, otp, handleChangePassword }
}

export default useChangePassword
