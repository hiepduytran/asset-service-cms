import { useTranslation } from 'next-i18next'
import { Divider, Typography } from '@mui/material'
import { GRAY_SCALE } from '@/helper/colors'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'

interface MessageProps {
  title?: string
  message: string
  onClick?: any
}

export const ErrorMessage = ({ message, title }: MessageProps) => {

  const { t } = useTranslation('common')
  return (
    <div className="flex items-center">
      <HighlightOffIcon style={{ height: 30, width: 30 }} color="error" />
      <div className="px-6 vds-toast__msg" style={{ color: '#242424' }}>
        <Typography variant="subtitle2" className="mb-3">
          {title ?? t('message.fail')}
        </Typography>
        <Typography variant="body2" style={{ color: '#747475' }} mt={0.5}>
          {message}
        </Typography>
      </div>
      <Divider
        orientation="horizontal"
        color={GRAY_SCALE}
        style={{ width: 1 }}
      />
    </div>
  )
}