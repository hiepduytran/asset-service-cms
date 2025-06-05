import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import { Box } from '@mui/material'
import React from 'react'
import { useAnnualMaintenancePlan } from './useAnnualMaintenancePlan'
import PageWithDetail from '@/components/organism/PageWithDetail'
import { FormProvider } from 'react-hook-form'
import StepOne from './components/Step1'
import StepTwo from './components/Step2'
import StepThree from './components/Step3'
import { CoreButton } from '@/components/atoms/CoreButton'
import StepFour from './components/Step4'
import { MENU_URL } from '@/routes'
import { TopAction } from '@/components/molecules/TopAction'
import { DialogDelete } from '../DialogDeleteAnnualMaintenancePlan'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import CoreStep from '@/components/atoms/CoreStep'
import CoreLoading from '@/components/molecules/CoreLoading'
import { getTitleBreadcrumbs } from '@/helper/getTitleBreadcrumbs'

export default function AnnualMaintenancePlan() {
  const { showDialog } = useDialog()
  const [values, handles] = useAnnualMaintenancePlan()
  const {
    methodForm,
    step,
    isLoading,
    isLoadingSubmit,
    id,
    isView,
    isUpdate,
    router,
  } = values
  const { t, onSubmit, onDraft, onCancel, handleChangeStep, setStep } = handles
  const { watch } = methodForm

  return (
    <>
      <FormProvider {...methodForm}>
        <PageWithDetail
          title={
            <div className='flex justify-between items-center'>
              <CoreBreadcrumbs
                breadcrumbs={[
                  {
                    title: t('nav.maintenance'),
                  },
                  {
                    title: t('nav.plannedMaintenance'),
                  },
                  {
                    title: t('nav.maintenancePlanning'),
                    pathname: `${MENU_URL.ANNUAL_MAINTENANCE_PLAN}`,
                  },
                  {
                    title: getTitleBreadcrumbs(t, isView, isUpdate),
                  },
                ]}
              />
            </div>
          }
          topAction={
            !!id && (
              <TopAction
                actionList={
                  watch('approveEnum') === 'DRAFT' ? ['edit', 'delete'] : []
                }
                onEditAction={() => {
                  router.replace({
                    pathname: `${MENU_URL.ANNUAL_MAINTENANCE_PLAN}/[id]`,
                    query: { id },
                  })
                }}
                onDeleteAction={() =>
                  showDialog(
                    <DialogDelete
                      id={id}
                      backFn={() => {
                        router.push({
                          pathname: MENU_URL.ANNUAL_MAINTENANCE_PLAN,
                        })
                      }}
                    />
                  )
                }
              />
            )
          }
          tabName={`${t('common:detail')}`}
        >
          <div className='w-full flex flex-col'>
            <div className='flex justify-center items-center'>
              <CoreStep
                step={step}
                onChangeStep={handleChangeStep}
                stepList={[
                  watch('plantType') === 'WEEK'
                    ? t('listStep.weeklyMaintenancePlanning')
                    : watch('plantType') === 'WEEKLY_INCIDENT'
                      ? t('listStep.emergencyWeeklyMaintenancePlanning')
                      : t('listStep.annualMaintenancePlanning'),
                  t('listStep.addMaintenanceParts'),
                  t('listStep.workDescription'),
                  t('listStep.maintenancePartsSummary'),
                ]}
              />
            </div>
            {isLoading ? (
              <Box>
                <CoreLoading />
              </Box>
            ) : (
              <form
                className='block bg-[#ffffff] rounded-xl mt-15'
                onSubmit={onSubmit}
              >
                {step === 0 && <StepOne isView={isView} isUpdate={isUpdate} />}
                {step === 1 && <StepTwo isView={isView} />}
                {step === 2 && <StepThree isView={isView} />}
                {step === 3 && <StepFour />}

                {!isView && (
                  <Box className='flex justify-center w-full gap-10 mt-15'>
                    <CoreButton theme='cancel' onClick={onCancel}>
                      {t('common:btn.cancel')}
                    </CoreButton>

                    {(watch('approveEnum') === 'DRAFT' ||
                      (!isUpdate && !isView)) && (
                        <CoreButton theme='submit' onClick={onDraft}>
                          {t('btn.saveDraft')}
                        </CoreButton>
                      )}
                    {step === 0 && (
                      <CoreButton
                        theme='submit'
                        onClick={() => handleChangeStep(1)}
                      >
                        {t('changeStep.moveStep2')}
                      </CoreButton>
                    )}
                    {step === 1 && (
                      <CoreButton
                        theme='submit'
                        onClick={() => handleChangeStep(2)}
                      >
                        {t('changeStep.moveStep3')}
                      </CoreButton>
                    )}
                    {step === 2 && (
                      <CoreButton
                        theme='submit'
                        onClick={() => handleChangeStep(3)}
                      >
                        {t('changeStep.moveStep4')}
                      </CoreButton>
                    )}

                    {step === 3 && (
                      <CoreButton
                        type='submit'
                        variant='contained'
                        loading={isLoadingSubmit}
                      >
                        {t('btn.submitForApproval')}
                      </CoreButton>
                    )}
                  </Box>
                )}
              </form>
            )}
          </div>
        </PageWithDetail>
      </FormProvider>
    </>
  )
}
