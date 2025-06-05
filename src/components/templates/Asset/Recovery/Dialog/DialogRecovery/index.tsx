import { CoreButton } from '@/components/atoms/CoreButton'
import { CoreDialog } from '@/components/organism/CoreDialog'
import { Box, Typography } from '@mui/material'
import useDialogRecovery from './useDialogRecovery'
import { AssetRecoveryDetail } from '@/service/asset/recovery/detail/type'
type Props = {
  hideDialog: () => void
  type?: string
  data: AssetRecoveryDetail
}
export default function DialogRecovery(props: Readonly<Props>) {
  const { hideDialog } = props
  const [{ isLoadingSubmit }, { t, onSubmit }] = useDialogRecovery(props)
  return (
    <CoreDialog
      title={`${t('text.title_dialog')}`.toUpperCase()}
      onClose={hideDialog}
      width={500}
    >
      <form>
        <Box className='flex flex-col mt-15 justify-center m-auto align-middle text-center'>
          <Typography variant='subtitle1'>
            {`${t('text.message_dialog')}`}
          </Typography>
          <Typography
            color={'#747475'}
            variant='subtitle1'
            sx={{
              marginTop: 2,
              fontStyle: 'italic',
            }}
          >
            {`${t('text.desc_dialog')}`}
          </Typography>
        </Box>

        <div className='flex justify-center gap-10 pb-15 pt-10'>
          <CoreButton
            theme='cancel'
            onClick={() => {
              hideDialog()
            }}
          >
            {t('common:btn.cancel')}
          </CoreButton>
          <CoreButton
            theme='submit'
            onClick={onSubmit}
            loading={isLoadingSubmit}
          >
            {t('common:btn.confirm')}
          </CoreButton>
        </div>
      </form>
    </CoreDialog>
  )
}
