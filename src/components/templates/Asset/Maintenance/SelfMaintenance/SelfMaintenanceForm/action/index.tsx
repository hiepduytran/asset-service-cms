import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import CoreLoading from '@/components/molecules/CoreLoading'
import CoreNavbar from '@/components/organism/CoreNavbar'
import PageContainer from '@/components/organism/PageContainer'
import { MENU_URL } from '@/routes'
import { FormProvider } from 'react-hook-form'
import Step1 from '../components/Step1'
import Step2 from '../components/Step2'
import useSelfMaintenanceFormAction from './useSelfMaintenanceFormAction'
import { TopAction } from '@/components/molecules/TopAction'
import CoreStep from '@/components/atoms/CoreStep'
import { getTitleBreadcrumbs } from '@/helper/getTitleBreadcrumbs'

export default function SelfMaintenanceFormAction() {
  const [
    {
      id,
      router,
      methods,
      isView,
      isUpdate,
      step,
      isLoadingDetailMaintenancesCard,
      isLoadingGetStandardByIds,
      loadingSubmit,
    },
    { t, handleChangeStep, onSubmit },
  ] = useSelfMaintenanceFormAction()

  const { watch } = methods

  return (
    <PageContainer
      title={
        <CoreBreadcrumbs
          breadcrumbs={[
            { title: t('title') },
            { title: t('self_maintenance.title') },

            {
              title: t('self_maintenance.self_maintenance_form.title'),
              pathname:
                MENU_URL.MAINTENANCE.SELF_MAINTENANCE.SELF_MAINTENANCE_FORM,
            },
            {
              title: getTitleBreadcrumbs(t, isView, isUpdate),
            },
          ]}
        />
      }
    >
      {isView ? (
        <>
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
                rightAction: (
                  <TopAction
                    actionList={
                      isView &&
                      (watch('state') === 'PENDING' ||
                        watch('state') === 'DRAFT')
                        ? ['edit']
                        : []
                    }
                    onEditAction={() => {
                      router.push({
                        pathname:
                          MENU_URL.MAINTENANCE.SELF_MAINTENANCE
                            .SELF_MAINTENANCE_FORM + '/[id]',
                        query: { id },
                      })
                    }}
                  />
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
                      <Step2 />
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
        </>
      ) : (
        <CoreNavbar
          breadcrumbs={[
            {
              title: isView ? t('view') : isUpdate ? t('edit') : t('add'),
              content: isLoadingDetailMaintenancesCard ? (
                <CoreLoading />
              ) : (
                <FormProvider {...methods}>
                  <div className='flex justify-center items-center mb-15'>
                    {
                      <CoreStep
                        step={step}
                        onChangeStep={handleChangeStep}
                        stepList={[
                          `${t(
                            'self_maintenance.self_maintenance_form.detail_step_1'
                          )}`,
                          `${t(
                            'self_maintenance.self_maintenance_form.detail_step_2'
                          )}`,
                        ]}
                      />
                    }
                  </div>
                  <form onSubmit={onSubmit}>
                    {step === 0 && (
                      <Step1
                        loadingSubmit={loadingSubmit}
                        handleChangeStep={handleChangeStep}
                      />
                    )}
                    {step === 1 && (
                      <Step2
                        loadingSubmit={loadingSubmit}
                        isLoadingGetStandardByIds={isLoadingGetStandardByIds}
                      />
                    )}
                  </form>
                </FormProvider>
              ),
            },
          ]}
        />
      )}
    </PageContainer>
  )
}
