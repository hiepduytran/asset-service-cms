import { TRANSLATE } from '@/routes'
import { Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'

const Footer = () => {
  const { t } = useTranslation(TRANSLATE.COMMON)

  return (
    <div className='flex items-center justify-end text-center px-10'>
      <div className='flex gap-5'>
        <Typography
          variant='body1'
          style={{
            marginTop: 12,
          }}
        >
          {t('footer.label')}
        </Typography>

        <Image
          priority
          alt=''
          src={require('@/assets/svg/apodio_logo.svg')}
          height={40}
          width={112}
        />
      </div>
    </div>
  )
}

export default Footer
