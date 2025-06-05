import { CoreButton } from '@/components/atoms/CoreButton'
import { CoreDateTimePicker } from '@/components/atoms/CoreDateTimePicker'
import CoreInput from '@/components/atoms/CoreInput'
import { useDate } from '@/components/hooks/date/useDate'
import { CoreDialog } from '@/components/organism/CoreDialog'
import { REGEX } from '@/helper/regex'
import { ShutdownInformation } from '@/service/asset/maintenance/selfMaintenance/selfMaintenanceCheck/detail/type'
import { Grid } from '@mui/material'
import useDialogPauseMachine from './usePauseMachine'
import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import { getIncidentList } from '@/service/asset/incidentList/getList'
import { getIncidentRecordingMaintenanceAuto } from '@/service/asset/maintenance/selfMaintenance/selfMaintenancePerform/dialog'

const DialogPauseMachine = ({
  refetchAuditMaintenances,
  hideDialogPauseMachine,
  asset,
  maintenanceScheduleShiftId,
  startHour,
  shutdownInformation,
  isViewProp,
  severityManagement,
}: {
  refetchAuditMaintenances?: any
  hideDialogPauseMachine: () => void
  asset: {
    id: number
    code: string
  }
  maintenanceScheduleShiftId: number
  startHour: string
  shutdownInformation?: ShutdownInformation
  isViewProp?: boolean
  severityManagement?: {
    id: number
    code: string
    name: string
  }
}) => {
  const [
    { router, methods, isLoading },
    { t, onSubmit, compareHourAndMinute },
  ] = useDialogPauseMachine({
    refetchAuditMaintenances,
    hideDialogPauseMachine,
    maintenanceScheduleShiftId,
    asset,
    shutdownInformation,
    isViewProp,
    severityManagement,
  })
  const { control, getValues } = methods

  const { getDateNow, convertToTime } = useDate()

  return (
    <CoreDialog
      title='PHIẾU DỪNG MÁY'
      onClose={hideDialogPauseMachine}
      width={600}
    >
      <form className='py-15 px-20'>
        <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12}>
            <CoreInput
              name='code'
              control={control}
              label={t('Mã nhật ký dừng máy')}
              placeholder={t('Nhập mã nhật ký dừng máy')}
              isViewProp={isViewProp ?? false}
              rules={{
                pattern: {
                  value: REGEX.CODE_NEW,
                  message: t('common:validation.code_new_2'),
                },
              }}
              inputProps={{
                maxLength: 50,
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CoreDateTimePicker
              name='startDate'
              control={control}
              label={t('Dừng máy từ')}
              placeholder='DD/MM/YYYY HH:mm'
              minDate={getDateNow()}
              required
              rules={{
                required: t('common:validation.required'),
                validate: {
                  moreThan: (value: any) => {
                    return compareHourAndMinute(convertToTime(value), startHour)
                  },
                },
              }}
              isViewProp={isViewProp ?? false}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CoreDateTimePicker
              name='endDate'
              control={control}
              label={t('Dừng máy đến')}
              isViewProp={isViewProp ?? false}
              placeholder='DD/MM/YYYY HH:mm'
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <CoreAutoCompleteAPI
              name={`incidentRecoding`}
              control={control}
              label={'Sự cố tham chiếu'}
              placeholder=''
              fetchDataFn={getIncidentRecordingMaintenanceAuto}
              params={{
                isGetAll: false,
                assetId: asset.id,
              }}
              isViewProp={isViewProp ?? false}
              multiple
            />
          </Grid>
          <Grid item xs={12}>
            <CoreInput
              name='reason'
              control={control}
              label={t('Lý do dừng máy')}
              placeholder={t('Nhập lý do dừng máy')}
              required
              multiline
              minRows={3}
              rules={{
                required: t('common:validation.required'),
              }}
              isViewProp={isViewProp ?? false}
            />
          </Grid>
        </Grid>
        {!isViewProp && (
          <div className='flex items-center justify-center gap-10 mt-10'>
            <CoreButton theme='cancel' onClick={hideDialogPauseMachine}>
              {t('common:btn.destroy')}
            </CoreButton>
            <CoreButton onClick={onSubmit} loading={isLoading}>
              {t('Ghi nhận')}
            </CoreButton>
          </div>
        )}
      </form>
    </CoreDialog>
  )
}

export default DialogPauseMachine
