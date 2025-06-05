import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import CoreLoading from '@/components/molecules/CoreLoading'
import CoreNavbar from '@/components/organism/CoreNavbar'
import PageContainer from '@/components/organism/PageContainer'
import { MENU_URL } from '@/routes'
import { FormProvider } from 'react-hook-form'
import Step1 from '../components/Step1'
import Step2 from '../components/Step2'
import useSelfMaintenanceApprovalAction from './useSelfMaintenanceApprovalAction'
import { getTitleBreadcrumbs } from '@/helper/getTitleBreadcrumbs'

export default function SelfMaintenanceApproval() {
  const [
    { methods, isView, isUpdate, step, isLoadingDetailMaintenancesCard },
    { t, onSubmit, handleChangeStep },
  ] = useSelfMaintenanceApprovalAction()
  return (
    <PageContainer
      title={
        <CoreBreadcrumbs
          breadcrumbs={[
            { title: t('title') },
            { title: t('self_maintenance.title') },

            {
              title: t('self_maintenance.self_maintenance_approval.title'),
              pathname:
                MENU_URL.MAINTENANCE.SELF_MAINTENANCE.SELF_MAINTENANCE_APPROVAL,
            },
            {
              title: getTitleBreadcrumbs(t, isView, isUpdate),
            },
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
