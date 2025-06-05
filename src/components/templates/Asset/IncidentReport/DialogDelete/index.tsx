import { useDialog } from '@/components/hooks/dialog/useDialog'
import { CoreDialog } from '@/components/organism/CoreDialog'
import { Box, Typography } from '@mui/material'
import { CoreButton } from '@/components/atoms/CoreButton'
import { useDialogDelete } from './useDialogDelete'

export type Props = {
  id: number
  backFn: any
}

export const DialogDelete = ({ id, backFn }: Props) => {
  const { hideDialog } = useDialog()
  const [values, handles] = useDialogDelete({ id, backFn })
  const { isLoading } = values
  const { t, onSubmit } = handles

  return (
    <CoreDialog title={t('common:btn.confirm').toUpperCase()} onClose={hideDialog} width={450}>
      <Box className='flex justify-center max-w-[350px] m-auto align-middle text-center'>
        <Typography
          variant='subtitle1'
          style={{
            lineHeight: 5,
          }}
        >
          {`${t('common:delete_dialog')}`}
        </Typography>
      </Box>

      <div className='flex justify-center gap-10 pb-15'>
        <CoreButton
          theme='cancel'
          onClick={() => {
            hideDialog()
          }}
        >
          {t('common:btn.cancel')}
        </CoreButton>
        <CoreButton theme='submit' onClick={onSubmit} loading={isLoading}>
          {t('common:btn.agree')}
        </CoreButton>
      </div>
    </CoreDialog>
  )
}
