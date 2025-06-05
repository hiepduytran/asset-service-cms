import { CoreButton } from '@/components/atoms/CoreButton'
import { CoreDialog } from '@/components/organism/CoreDialog'
import { TransferAssetDetail } from '@/service/asset/assetHandover/detail/type'
import { Box, Typography } from '@mui/material'
import useDialogAssetHandover from './useDialogAssetHandover'
type Props = {
  hideDialog: () => void
  type?: string
  data: TransferAssetDetail
}
export default function DialogAssetHandover(props: Props) {
  const { hideDialog } = props
  const [{ methods, isLoadingAssetHandover }, { t, onSubmit }] =
    useDialogAssetHandover(props)
  return (
    <CoreDialog title='XÁC NHẬN' onClose={hideDialog} width={500}>
      <Box className='flex flex-col mt-20 justify-center m-auto align-middle text-center'>
        <Typography variant='subtitle1'>
          {t('confirmAssetHandover')}
        </Typography>
        <Typography
          color={'#747475'}
          variant='subtitle1'
          sx={{
            marginTop: 2,
            fontStyle: 'italic',
          }}
        >
          {t('noteAfterConfirmation')}
        </Typography>
      </Box>

      <div className='flex justify-center gap-10 py-15'>
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
          loading={isLoadingAssetHandover}
        >
          {t('common:btn.confirm')}
        </CoreButton>
      </div>
    </CoreDialog>
  )
}
