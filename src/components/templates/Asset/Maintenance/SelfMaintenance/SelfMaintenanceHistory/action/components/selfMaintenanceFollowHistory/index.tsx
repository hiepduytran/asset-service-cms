import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import CoreLoading from '@/components/molecules/CoreLoading'
import CoreNavbar from '@/components/organism/CoreNavbar'
import PageContainer from '@/components/organism/PageContainer'
import { MENU_URL } from '@/routes'
import { FormProvider } from 'react-hook-form'
import Step1 from '../../../../SelfMaintenanceFollow/components/Step1'
import Step2 from '../../../../SelfMaintenanceFollow/components/Step2'
import useSelfMaintenanceFollowHistory from './useSelfMaintenanceFollowAction'

export default function SelfMaintenanceFollowHistory() {
  const [
    { id, methods, isView, isUpdate, step, isLoadingDetailMaintenancesCard },
    { t, onSubmit, handleChangeStep },
  ] = useSelfMaintenanceFollowHistory()

  const { getValues } = methods
  return (
    <PageContainer
      title={
        <CoreBreadcrumbs
          breadcrumbs={[
            {
              title: t('self_maintenance.self_maintenance_history.title'),
              pathname:
                MENU_URL.MAINTENANCE.SELF_MAINTENANCE.SELF_MAINTENANCE_HISTORY,
            },
            {
              title: getValues('code'),
              pathname: `${MENU_URL.MAINTENANCE.SELF_MAINTENANCE.SELF_MAINTENANCE_HISTORY}/${id}`,
              query: {
                actionType: 'VIEW',
              },
            },
            { title: t('Chi tiết phiếu kế hoạch tự bảo dưỡng') },
          ]}
        />
      }
    >
      <CoreNavbar
        breadcrumbs={[
          {
            title: `${t('self_maintenance.self_maintenance_form.step_1')}`,
            content: isLoadingDetailMaintenancesCard ? (
              <CoreLoading />
            ) : (
              <FormProvider {...methods}>
                <form onSubmit={onSubmit}>
                  <Step1 handleChangeStep={handleChangeStep} />
                </form>
              </FormProvider>
            ),
          },
        ]}
        minWidthTab={300}
        isFitContent
      />

      <CoreNavbar
        breadcrumbs={[
          {
            title: `${t('self_maintenance.self_maintenance_form.step_2')}`,
            content: isLoadingDetailMaintenancesCard ? (
              <CoreLoading />
            ) : (
              <FormProvider {...methods}>
                <form onSubmit={onSubmit}>
                  <Step2 step={step} />
                </form>
              </FormProvider>
            ),
          },
        ]}
        minWidthTab={300}
        styles={{
          marginTop: '20px',
        }}
      />
    </PageContainer>
  )
}
