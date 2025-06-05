import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import { Box } from '@mui/material'
import React from 'react'
import { useWeeklyMaintenancePlan } from './useWeeklyMaintenancePlan'
import PageWithDetail from '@/components/organism/PageWithDetail'
import { FormProvider } from 'react-hook-form'
import StepOne from './components/Step1'
import StepTwo from './components/Step2'
import StepThree from './components/Step3'
import { CoreButton } from '@/components/atoms/CoreButton'
import StepFour from './components/Step4'
import CoreStep from '@/components/atoms/CoreStep'

export default function WeeklyMaintenancePlan() {
  const [values, handles] = useWeeklyMaintenancePlan()
  const { methodForm, step, isLoadingSubmit } = values
  const { t, onSubmit, onCancel, onDraft, watch, handleChangeStep, setStep } =
    handles

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
                  },
                  {
                    title: t('common:btn.add'),
                  },
                ]}
              />
            </div>
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
            <form
              className='block bg-[#ffffff] rounded-xl mt-15'
              onSubmit={onSubmit}
            >
              {step === 0 && <StepOne />}
              {step === 1 && <StepTwo />}
              {step === 2 && <StepThree />}
              {step === 3 && <StepFour />}

              <Box className='flex justify-center w-full gap-10 mt-15'>
                <CoreButton theme='cancel' onClick={onCancel}>
                  {t('common:btn.cancel')}
                </CoreButton>
                <CoreButton theme='submit' onClick={onDraft}>
                  {t('btn.saveDraft')}
                </CoreButton>
                {step === 0 && (
                  <CoreButton
                    theme='submit'
                    onClick={() => handleChangeStep(1)}
                  >
                    {t('changeStep.moveStep2')}
                  </CoreButton>
                )}
                {step === 1 && (
                  <>
                    <CoreButton
                      theme='submit'
                      onClick={() => handleChangeStep(2)}
                    >
                      {t('changeStep.moveStep3')}
                    </CoreButton>
                  </>
                )}
                {step === 2 && (
                  <>
                    <CoreButton
                      theme='submit'
                      onClick={() => handleChangeStep(3)}
                    >
                      {t('changeStep.moveStep4')}
                    </CoreButton>
                  </>
                )}
                {step === 3 && (
                  <>
                    <CoreButton
                      type='submit'
                      variant='contained'
                      loading={isLoadingSubmit}
                    >
                      {t('btn.submitForApproval')}
                    </CoreButton>
                  </>
                )}
              </Box>
            </form>
          </div>
        </PageWithDetail>
      </FormProvider>
    </>
  )
}
