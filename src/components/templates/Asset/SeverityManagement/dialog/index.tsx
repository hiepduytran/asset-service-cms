import { CoreButton } from '@/components/atoms/CoreButton'
import { CoreDialog } from '@/components/organism/CoreDialog'
import { Typography } from '@mui/material'
import useDialogSeverityManagement from './useDialogSeverityManagement'

export default function DialogSeverityManagement() {
  const [{ isLoading }, { t, hideDialog, onCancel, onSubmit }] =
    useDialogSeverityManagement()
  return (
    <CoreDialog
      title={`${t('Xác nhận')}`.toUpperCase()}
      onClose={hideDialog}
      width={500}
    >
      <div className='flex flex-col items-center py-15'>
        <Typography>{`${t('common:delete_dialog')}`}</Typography>
        <div className='flex gap-10 mt-15'>
          <CoreButton theme='cancel' onClick={onCancel}>
            {t('common:btn.cancel')}
          </CoreButton>
          <CoreButton theme='submit' onClick={onSubmit} loading={isLoading}>
            {t('common:btn.agree')}
          </CoreButton>
        </div>
      </div>
    </CoreDialog>
  )
}
