import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import { CoreButton } from '@/components/atoms/CoreButton'
import CoreInput from '@/components/atoms/CoreInput'
import { CoreDialog } from '@/components/organism/CoreDialog'
import { IncidentRecordingMaintenanceAuto } from '@/service/asset/maintenance/selfMaintenance/selfMaintenancePerform/dialog/type'
import {
  getListSeverityManagement,
  getListSeverityManagementHigher,
} from '@/service/asset/severityManagement/list'
import { Grid } from '@mui/material'
import useDialogIncident from './useDialogIncident'

type Props = {
  hideDialogIncident: () => void
  type: string
  dataLineIncident?: IncidentRecordingMaintenanceAuto
  productId: number
  refetchGetIncidentRecordingMaintenance?: any
  handleChangeRecordConditionTypeSave: (id?: number) => void
  recordConditionTypeStorageFn: (data: IncidentRecordingMaintenanceAuto) => void
  maintenanceScheduleShiftId: number
  maintenanceScheduleId: number
}
export default function DialogIncident(props: Props) {
  const {
    hideDialogIncident,
    type,
    productId,
    maintenanceScheduleShiftId,
    maintenanceScheduleId,
    dataLineIncident,
  } = props
  const [
    {
      methods,
      isView,
      dataGetMaintenanceScheduleIncidentAllocation,
      isLoadingGetMaintenanceScheduleIncidentAllocation,
    },
    { t, getTitleDialog, getTextButton },
  ] = useDialogIncident(props)
  const { control, setValue, getValues } = methods

  return (
    <CoreDialog
      title={getTitleDialog(type).toUpperCase()}
      onClose={hideDialogIncident}
      width={800}
    >
      <form className='p-20'>
        <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12}>
            <CoreInput
              name='code'
              control={control}
              label={t('Mã Sự cố ')}
              isViewProp={
                type === 'REVIEW_AGAIN' ||
                type === 'REVIEW_EDIT' ||
                type === 'EDIT_NEW'
              }
            />
          </Grid>
          <Grid item xs={12}>
            <CoreInput
              name='name'
              control={control}
              label={t('Tên Sự cố ')}
              required
              rules={{
                required: t('common:validation.required'),
              }}
              isViewProp={false}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <CoreAutocomplete
              name='incidentLocation'
              control={control}
              label={t('Vị trí')}
              placeholder={`${t('Chọn vị trí')}`}
              options={dataGetMaintenanceScheduleIncidentAllocation}
              required
              rules={{
                required: t('common:validation.required'),
              }}
              valuePath='id'
              labelPath='name'
              loading={isLoadingGetMaintenanceScheduleIncidentAllocation}
              onChangeValue={(val) => {
                if (val) {
                  setValue('incidentLocation', {
                    id: val.id,
                    code: val.sku,
                    sku: val.sku,
                    name: val.name,
                  })
                } else {
                  setValue('incidentLocation', null)
                }
              }}
              isViewProp={type === 'REVIEW_AGAIN' || type === 'REVIEW_EDIT'}
              returnValueType='option'
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            {type === 'CREATE_NEW' ? (
              <CoreAutoCompleteAPI
                name='severityManagement'
                control={control}
                label={t('Mức độ nghiêm trọng')}
                placeholder={t('Chọn mức độ nghiêm trọng')}
                required
                rules={{
                  required: t('common:validation.required'),
                }}
                fetchDataFn={getListSeverityManagement}
                params={{
                  managementType: 'SEVERITY_MANAGEMENT',
                  isActive: true,
                }}
                isViewProp={false}
              />
            ) : (
              <CoreAutoCompleteAPI
                name='severityManagement'
                control={control}
                label={t('Mức độ nghiêm trọng')}
                placeholder={t('Chọn mức độ nghiêm trọng')}
                required
                rules={{
                  required: t('common:validation.required'),
                }}
                fetchDataFn={getListSeverityManagementHigher}
                params={{
                  managementType: 'SEVERITY_MANAGEMENT',
                  isActive: true,
                }}
                isViewProp={false}
              />
            )}
          </Grid>
          <Grid item xs={12}>
            <CoreInput
              name='reason'
              control={control}
              label={t('Lý do')}
              multiline
              inputProps={{
                maxLength: 1000,
              }}
              isViewProp={false}
            />
          </Grid>
        </Grid>

        <div className='flex justify-center gap-10 mt-20'>
          <CoreButton theme='cancel' onClick={hideDialogIncident}>
            {t('common:btn.destroy')}
          </CoreButton>
          {getTextButton(type)}
        </div>
      </form>
    </CoreDialog>
  )
}
