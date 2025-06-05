import { CoreButton } from '@/components/atoms/CoreButton'
import CoreInput from '@/components/atoms/CoreInput'
import { CoreDialog } from '@/components/organism/CoreDialog'
import { Grid, Typography } from '@mui/material'
import useDialogDeleteIncident from './useDialogDeleteIncident'
type Props = {
  hideDialogDeleteIncident: () => void
  refetchDetailIncidentApprove: any
}
const DialogDeleteIncident = (props: Props) => {
  const { hideDialogDeleteIncident } = props
  const [
    { methods, isLoadingReject, isLoadingRejectAndReview },
    { t, onConfirmAndReview, onConfirm },
  ] = useDialogDeleteIncident(props)
  const { control } = methods
  return (
    <CoreDialog
      title={`${t('Từ chối')}`.toUpperCase()}
      onClose={hideDialogDeleteIncident}
      width={450}
    >
      <form className='p-20'>
        <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12}>
            <div className='flex items-center justify-center'>
              <Typography>Bạn có muốn từ chối sự cố mới này không?</Typography>
            </div>
          </Grid>
          <Grid item xs={12}>
            <CoreInput
              name='reason'
              control={control}
              label={t('Lý do')}
              placeholder={t('Nhập lý do từ chối')}
              multiline
              inputProps={{
                maxLength: 1000,
              }}
              required
              rules={{
                required: t('common:validation.required'),
              }}
              isViewProp={false}
            />
          </Grid>
        </Grid>

        <div className='flex justify-center gap-10 mt-20'>
          <CoreButton theme='cancel' onClick={hideDialogDeleteIncident}>
            {t('common:btn.cancel')}
          </CoreButton>
          <CoreButton
            theme='submit'
            onClick={onConfirmAndReview}
            loading={isLoadingRejectAndReview}
          >
            {t('Xác định và đánh giá lại')}
          </CoreButton>
          <CoreButton
            theme='submit'
            onClick={onConfirm}
            loading={isLoadingReject}
          >
            {t('common:btn.confirm')}
          </CoreButton>
        </div>
      </form>
    </CoreDialog>
  )
}

export default DialogDeleteIncident
