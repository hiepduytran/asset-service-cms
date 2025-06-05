import { useMediaQuery } from '@mui/material'
import Image from 'next/image'
import styles from './styles.module.css'

const RegisterPanel = () => {
  const matches = useMediaQuery('(max-width:640px)')

  if (matches) return null

  return (
    <div className={`flex flex-1 ${styles.imageBg} w-1/2`}>
      <div className={`w-full px-5 py-8 h-full flex-1 `}>
        <Image alt='' src={require('@/assets/svg/apodio_logo.svg')} />

        <div className='flex h-full items-center justify-center px-10'></div>
      </div>
    </div>
  )
}

export default RegisterPanel
