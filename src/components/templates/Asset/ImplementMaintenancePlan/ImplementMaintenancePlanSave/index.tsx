import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'

import { CoreButton } from '@/components/atoms/CoreButton'
import CoreStep from '@/components/atoms/CoreStep'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import CoreLoading from '@/components/molecules/CoreLoading'
import { TopAction } from '@/components/molecules/TopAction'
import PageWithDetail from '@/components/organism/PageWithDetail'
import { toastError } from '@/toast'
import { MENU_URL } from '@/routes'
import { Box } from '@mui/material'
import { useRouter } from 'next/router'
import { FormProvider } from 'react-hook-form'
import { DialogDelete } from '../DialogDelete'
import StepOne from './components/StepOne'
import StepTwo from './components/StepTwo'
import { useImplementMaintenancePlanSave } from './useImplementMaintenancePlanSave'

export default function ImplementMaintenancePlanSave() {
  const [
    {
      methods,
      isUpdate,
      id,
      isLoadingImplementMaintenancePlanDetail,
      isLoadingImplementMaintenancePlanTask,
      isLoadingPage,
      step,
      errorImplementMaintenancePlanDetail,
      isLoadingFinish,
      isLoadingDraft,
      isViewProp,
    },
    { t, onSubmit, onDraft, setStep, handleChangeStep },
  ] = useImplementMaintenancePlanSave()
  const router = useRouter()
  const { showDialog } = useDialog()

  const {
    getValues,
    trigger,
    formState: { errors },
  } = methods

  return (
    <PageWithDetail
      title={
        <div className='flex justify-between items-center'>
          <CoreBreadcrumbs
            breadcrumbs={[
              {
                title: t('title.maintenance'),
              },
              {
                title: t('title.maintenance_plan'),
              },
              {
                title: t('title.implement_maintenance_plan'),
                pathname: MENU_URL.IMPLEMENT_MAINTENANCE_PLAN,
              },
              {
                title: t('common:detail'),
              },
            ]}
          />
        </div>
      }
      tabName={`${t('common:detail')}`}
      topAction={
        isUpdate && (
          <TopAction
            actionList={isViewProp ? [] : isUpdate ? ['delete'] : []}
            onEditAction={() => {
              router.replace({
                pathname: `${MENU_URL.IMPLEMENT_MAINTENANCE_PLAN}/[id]`,
                query: {
                  id,
                },
              })
            }}
            onDeleteAction={() => {
              showDialog(
                <DialogDelete
                  id={Number(id)}
                  backFn={() => {
                    router.push({
                      pathname: MENU_URL.IMPLEMENT_MAINTENANCE_PLAN,
                    })
                  }}
                />
              )
            }}
          />
        )
      }
    >
      {errorImplementMaintenancePlanDetail[0]?.message ? (
        <>{toastError(errorImplementMaintenancePlanDetail[0].message)}</>
      ) : isLoadingImplementMaintenancePlanDetail ? (
        <CoreLoading />
      ) : (
        <FormProvider {...methods}>
          <form className='w-full block rounded-xl mx-auto' onSubmit={onSubmit}>
            <div className='w-full flex flex-col'>
              <div className='flex justify-center items-center mb-15'>
                <CoreStep
                  step={step}
                  onChangeStep={handleChangeStep}
                  stepList={[
                    `${t('text.info_plan')}`,
                    `${t('text.record_implementation')}`,
                  ]}
                  className='w-1/4'
                />
              </div>

              {step === 0 && <StepOne />}
              {step === 1 && <StepTwo />}

              {!isViewProp && (
                <Box className='flex justify-center w-full gap-10 mt-15'>
                  <CoreButton
                    theme='cancel'
                    onClick={() =>
                      router.push(MENU_URL.IMPLEMENT_MAINTENANCE_PLAN)
                    }
                  >
                    {t('btn.cancel')}
                  </CoreButton>
                  {
                    // !(getValues('status') === 'IN_PROCESS') &&
                    <CoreButton
                      theme='submit'
                      loading={isLoadingDraft}
                      onClick={onDraft}
                    >
                      {t('common:btn.draft')}
                    </CoreButton>
                  }
                  <CoreButton type='submit' loading={isLoadingFinish}>
                    {step === 0
                      ? t('btn.next_step_2')
                      : t('common:btn.completed')}
                  </CoreButton>
                </Box>
              )}
            </div>
          </form>
        </FormProvider>
      )}
    </PageWithDetail>
  )
}
