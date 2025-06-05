import { CoreButton } from '@/components/atoms/CoreButton'
import CoreInput from '@/components/atoms/CoreInput'
import CoreLoading from '@/components/molecules/CoreLoading'
import { Grid } from '@mui/material'
import { convertDayOfWeek } from '../../../../utils'
import TableCustomSelfMaintenanceCheck from '../TableCustom'
import useContentBreadcrumb from './useContentBreadcrumb'

export type Props = {
  id: number
}
export default function ContentBreadcrumb(props: Props) {
  const [
    { methods, isLoadingAuditMaintenances },
    { t, onSubmit, refetchAuditMaintenances, handlePlan },
  ] = useContentBreadcrumb(props)
  const { control, watch, getValues } = methods
  return isLoadingAuditMaintenances ? (
    <CoreLoading />
  ) : (
    <form onSubmit={onSubmit}>
      <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item sm={6} md={4}>
          <CoreInput
            name='department.name'
            control={control}
            label={t(
              'self_maintenance.self_maintenance_perform.department.label'
            )}
            placeholder={t(
              'self_maintenance.self_maintenance_perform.department.placeholder'
            )}
            isViewProp={true}
          />
        </Grid>
        <Grid item sm={6} md={4}>
          <CoreInput
            name='dayOfWeek'
            control={control}
            label={t(
              'self_maintenance.self_maintenance_perform.dayOfWeek.label'
            )}
            placeholder={t(
              'self_maintenance.self_maintenance_perform.dayOfWeek.placeholder'
            )}
            isViewProp={true}
            value={convertDayOfWeek(getValues('dayOfWeek'))}
          />
        </Grid>
        <Grid item sm={6} md={4}>
          <CoreInput
            name='currentShift.name'
            control={control}
            label={t(
              'self_maintenance.self_maintenance_perform.currentShift.label'
            )}
            placeholder={t(
              'self_maintenance.self_maintenance_perform.currentShift.placeholder'
            )}
            isViewProp={true}
            value={
              getValues('maintenanceShiftAudits.0')?.isShow.findIndex(
                (item) => item
              ) + 1
            }
          />
        </Grid>
        <Grid item sm={6} md={4}>
          <CoreInput
            name='maintenanceCard.name'
            control={control}
            label={t(
              'self_maintenance.self_maintenance_perform.maintenanceCard.label'
            )}
            placeholder={t(
              'self_maintenance.self_maintenance_perform.maintenanceCard.placeholder'
            )}
            isViewProp={true}
          />
        </Grid>
        <Grid item sm={6} md={4}>
          <CoreInput
            name='identity'
            control={control}
            label={t(
              'self_maintenance.self_maintenance_perform.identity.label'
            )}
            placeholder={t(
              'self_maintenance.self_maintenance_perform.identity.placeholder'
            )}
            isViewProp={true}
          />
        </Grid>
        <Grid item sm={6} md={4}>
          <CoreInput
            name='product.name'
            control={control}
            label={t('self_maintenance.self_maintenance_perform.product.label')}
            placeholder={t(
              'self_maintenance.self_maintenance_perform.product.placeholder'
            )}
            isViewProp={true}
          />
        </Grid>

        <Grid item sm={12}>
          <TableCustomSelfMaintenanceCheck
            refetchAuditMaintenances={refetchAuditMaintenances}
          />
          {watch('isShowDetail') && (
            <div className='flex justify-center mt-10'>
              <CoreButton
                loading={isLoadingAuditMaintenances}
                onClick={handlePlan}
              >{`${t(
                'self_maintenance.self_maintenance_check.btn.contingency_plan'
              )}`}</CoreButton>
            </div>
          )}
        </Grid>
      </Grid>
    </form>
  )
}
