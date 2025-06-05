import { useTranslation } from 'next-i18next'
import { TRANSLATE } from '@/routes'
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined'
import { Typography } from '@mui/material'

interface MessageProps {
  title?: string
  message: string
  onClick?: any
}

export const SuccessMessage = ({ message, title }: MessageProps) => {

  const { t } = useTranslation(TRANSLATE.COMMON)
  return (
    <div className="flex items-center">
      <CheckCircleOutlinedIcon
        style={{ height: 30, width: 30 }}
        color="primary"
      />
      <div className="px-12 vds-toast__msg" style={{ color: '#242424' }}>
        <Typography variant="subtitle2" className="mb-3">
          {title ?? t('message.success')}
        </Typography>
        <Typography variant="body2" style={{ color: '#747475' }} mt={0.5}>
          {message}
        </Typography>
      </div>
    </div>
  )
}
