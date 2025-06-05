import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import { CoreButton } from '@/components/atoms/CoreButton'
import CoreInput from '@/components/atoms/CoreInput'
import { CoreDialog } from '@/components/organism/CoreDialog'
import { REGEX } from '@/helper/regex'
import { getListAssetAccessoryId } from '@/service/asset/IncidentLogList/dialog'
import { IncidentRecordingMaintenance } from '@/service/asset/IncidentLogList/dialog/type'
import {
  getListSeverityManagement,
  getListSeverityManagementHigher,
} from '@/service/asset/severityManagement/list'
import { Grid } from '@mui/material'
import useDialogIncident from './useDialogIncident'
type Props = {
  hideDialogIncident: () => void
  type: string
  dataRow?: IncidentRecordingMaintenance
  productId: number
  refetchGetIncidentRecordingMaintenance?: any
  refetchIncidentRecordingMaintenanceIsUpdate?: any
  indexLine: number
  index2Line: number
  handleChangeRecordConditionTypeSave: (id?: number) => void
  recordConditionTypeStorageFn: (data: IncidentRecordingMaintenance) => void
  dataLineId?: number
  departmentId: number | null
  dataIncidentListAll?: IncidentRecordingMaintenance[]
}
export default function DialogIncident(props: Props) {
  const { dataRow, hideDialogIncident, type, productId, dataIncidentListAll } =
    props
  const [{ methods, isView }, { t, getTitleDialog, getTextButton, onSubmit }] =
    useDialogIncident(props)
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
                isView ||
                type === 'REVIEW_AGAIN' ||
                type === 'REVIEW_EDIT' ||
                type === 'EDIT_NEW'
              }
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
          <Grid item xs={12}>
            <CoreInput
              name='name'
              control={control}
              label={t('Tên Sự cố ')}
              required
              rules={{
                required: t('common:validation.required'),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <CoreAutoCompleteAPI
              name='incidentLocation'
              control={control}
              label={t('Vị trí')}
              placeholder={`${t('Chọn vị trí')}`}
              parentPath='product'
              required
              rules={{
                required: t('common:validation.required'),
              }}
              fetchDataFn={getListAssetAccessoryId}
              params={{
                productId: productId,
                notIds: (dataIncidentListAll ?? []).map((item) => {
                  return item.incidentLocation?.id
                }),
              }}
              valuePath='id'
              onChangeValue={(val) => {
                if (val) {
                  setValue('incidentLocation', val?.product)
                } else {
                  setValue('incidentLocation', null)
                }
              }}
              isViewProp={
                isView || type === 'REVIEW_AGAIN' || type === 'REVIEW_EDIT'
              }
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
                params={{
                  managementType: 'SEVERITY_MANAGEMENT',
                  isActive: true,
                }}
                fetchDataFn={getListSeverityManagement}
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
                  levelId:
                    dataRow?.severityLevels[dataRow.severityLevels.length - 1]
                      ?.severityManagement.id,
                  managementType: 'SEVERITY_MANAGEMENT',
                  isActive: true,
                }}
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
                maxLength: 255,
              }}
              required
              rules={{
                required: t('common:validation.required'),
              }}
            />
          </Grid>
        </Grid>

        {!isView && (
          <div className='flex justify-center gap-10 mt-20'>
            <CoreButton theme='cancel' onClick={hideDialogIncident}>
              {t('common:btn.destroy')}
            </CoreButton>
            {getTextButton(type)}
          </div>
        )}
      </form>
    </CoreDialog>
  )
}
