import { useDialog } from '@/components/hooks/dialog/useDialog'
import { CoreDialog } from '@/components/organism/CoreDialog'
import { Box, Typography } from '@mui/material'

import { useDialogDelete } from './useDialogDeleteStatus'
import { CoreButton } from '@/components/atoms/CoreButton'

export type Props = {
  assetAccessoryId: number
  backFn: any
}

export const DialogDelete = ({ assetAccessoryId, backFn }: Props) => {
  const { hideDialog } = useDialog()
  const [values, handles] = useDialogDelete({ assetAccessoryId, backFn })
  const { isLoading } = values
  const { t, onSubmit } = handles

  return (
    <CoreDialog title='' onClose={hideDialog} width={450}>
      <Box className='flex justify-center max-w-[350px] m-auto align-middle text-center'>
        <Typography
          variant='subtitle1'
          style={{
            lineHeight: 1.5,
          }}
        >
          {`${t('common:delete_dialog')}`}
        </Typography>
      </Box>

      <div className='flex justify-center gap-10 py-10'>
        <CoreButton
          theme='cancel'
          onClick={() => {
            hideDialog()
          }}
        >
          {t('common:btn.cancel')}
        </CoreButton>
        <CoreButton theme='submit' onClick={onSubmit} loading={isLoading}>
          {t('common:btn.confirm')}
        </CoreButton>
      </div>
    </CoreDialog>
  )
}
