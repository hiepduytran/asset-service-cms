import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import { CoreButton } from '@/components/atoms/CoreButton'
import CoreLoading from '@/components/molecules/CoreLoading'
import PageWithDetail from '@/components/organism/PageWithDetail'
import { toastError } from '@/toast'
import { MENU_URL } from '@/routes'
import { Box } from '@mui/material'
import { FormProvider } from 'react-hook-form'
import StepOne from './components/StepOne'
import StepTwo from './components/StepTwo'
import { useCheckImplMaintenancePlanSave } from './useCheckImpleMaintenancePlanSave'

export default function CheckImplMaintenancePlanSave() {
  const [
    {
      methods,
      isLoadingGetImplementMaintenancePlanCheckDetail,
      isLoadingImplementMaintenancePlanCheck,
      errorImplementMaintenancePlanDetail,
      is_Level_1,
      is_passed_1,
      is_passed_2,
    },
    { t, onSubmit, onCancel },
  ] = useCheckImplMaintenancePlanSave()

  return (
    <>
      <FormProvider {...methods}>
        {errorImplementMaintenancePlanDetail[0]?.message ? (
          <>{toastError(errorImplementMaintenancePlanDetail[0]?.message)}</>
        ) : (
          <form onSubmit={onSubmit}>
            <PageWithDetail
              title={
                <CoreBreadcrumbs
                  breadcrumbs={[
                    {
                      title: t('title.maintenance'),
                    },
                    {
                      title: t('title.maintenance_plan'),
                    },
                    {
                      title: t('title.implement_maintenance_plan_check'),
                      pathname: MENU_URL.CHECK_IMPLEMENT_MAINTENANCE_PLAN,
                    },
                    {
                      title: t('common:detail'),
                    },
                  ]}
                />
              }
              tabName={`${t('text.info_plan_step_1')}`}
            >
              {isLoadingGetImplementMaintenancePlanCheckDetail ? (
                <CoreLoading />
              ) : (
                <StepOne />
              )}
            </PageWithDetail>
            <PageWithDetail
              tabName={`${t('text.record_implementation_step_2')}`}
              className='mt-10'
              isHeight
            >
              {isLoadingGetImplementMaintenancePlanCheckDetail ? (
                <CoreLoading />
              ) : (
                <>
                  <StepTwo />
                  {!(is_passed_2 || (is_Level_1 && is_passed_1)) && (
                    <Box className='flex justify-center w-full gap-10 mt-15'>
                      <CoreButton theme='cancel' onClick={onCancel}>
                        {t('btn.cancel')}
                      </CoreButton>
                      <CoreButton
                        theme='submit'
                        loading={isLoadingImplementMaintenancePlanCheck}
                        type='submit'
                      >
                        {t('common:btn.save_change')}
                      </CoreButton>
                    </Box>
                  )}
                </>
              )}
            </PageWithDetail>
          </form>
        )}
      </FormProvider>
    </>
  )
}
