import CoreInput from '@/components/atoms/CoreInput'
import CoreLoading from '@/components/molecules/CoreLoading'
import { CoreDialog } from '@/components/organism/CoreDialog'
import { Grid } from '@mui/material'
import useDialogDetailError from './useDialogDetailError'
type Props = {
  hideDialog: () => void
  incidentRecordingId: number
}
export default function DialogDetailError(props: Props) {
  const { hideDialog } = props
  const [{ methods, isLoadingAutoMaintenanceDetailError }, { t }] =
    useDialogDetailError(props)
  const { control } = methods

  return (
    <CoreDialog title='CHI TIẾT SỰ CỐ' onClose={hideDialog} width={600}>
      {isLoadingAutoMaintenanceDetailError ? (
        <div className='mb-20'>
          <CoreLoading />
        </div>
      ) : (
        <form className='flex justify-center px-15 mt-15 mb-15 text-center'>
          <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={12}>
              <CoreInput
                name={`code`}
                control={control}
                label={t('Mã sự cố')}
                placeholder={t('Nhập mã sự cố')}
                isViewProp={true}
              />
            </Grid>
            <Grid item xs={12}>
              <CoreInput
                name={`name`}
                control={control}
                label={t('Tên sự cố')}
                placeholder={`${t('Nhập tên sự cố')}`}
                isViewProp={true}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CoreInput
                name={`incidentLocation.name`}
                control={control}
                label={t('Vị trí')}
                placeholder={`${t('Chọn vị trí')}`}
                isViewProp={true}
                rules={{
                  required: t('common:validation.required'),
                }}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CoreInput
                name={`severityManagement.name`}
                control={control}
                label={t('Mức độ nghiêm trọng')}
                placeholder={`${t('Chọn mức độ nghiêm trọng')}`}
                isViewProp={true}
              />
            </Grid>
            <Grid item xs={12}>
              <CoreInput
                name={`reason`}
                control={control}
                label={t('Lý do')}
                placeholder={`${t('Nhập lý do')}`}
                isViewProp={true}
                multiline
              />
            </Grid>
          </Grid>
        </form>
      )}
    </CoreDialog>
  )
}
