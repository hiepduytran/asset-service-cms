import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import CoreInput from '@/components/atoms/CoreInput'
import CoreLoading from '@/components/molecules/CoreLoading'
import { CoreDialog } from '@/components/organism/CoreDialog'
import { Grid } from '@mui/material'
import { optionErrorAssessment } from '../../../../utils'
import useDialogSelfMaintenanceHistory from './useDialogSelfMaintenanceHistory'
type Props = {
  shiftSequenceId: number
  sequence: number
}
export default function DialogSelfMaintenanceHistory(props: Props) {
  const [
    { methods, isLoadingAutoMaintenanceHistoryErrorDetail },
    { t, hideDialog },
  ] = useDialogSelfMaintenanceHistory(props)
  const { control } = methods

  return (
    <CoreDialog title='MÔ TẢ LỖI' onClose={hideDialog} width={600}>
      {isLoadingAutoMaintenanceHistoryErrorDetail ? (
        <div className='mb-25'>
          <CoreLoading />
        </div>
      ) : (
        <form className='flex justify-center px-15 mt-15 mb-15 text-center'>
          <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={12}>
              <CoreInput
                name='reasonError'
                control={control}
                label={t(
                  'self_maintenance.self_maintenance_check.finalReasonError.label'
                )}
                placeholder={t(
                  'self_maintenance.self_maintenance_check.finalReasonError.placeholder'
                )}
                multiline
                minRows={3}
                isViewProp={true}
              />
            </Grid>
            <Grid item xs={12}>
              <CoreAutocomplete
                name='errorType'
                control={control}
                label={t(
                  'self_maintenance.self_maintenance_check.finalErrorType.label'
                )}
                valuePath='value'
                labelPath='label'
                options={optionErrorAssessment}
                placeholder={`${t(
                  'self_maintenance.self_maintenance_check.finalErrorType.placeholder'
                )}`}
                isViewProp={true}
                required
                rules={{
                  required: t('common:validation.required'),
                }}
              />
            </Grid>
          </Grid>
        </form>
      )}
    </CoreDialog>
  )
}
