import { Box } from '@mui/material'
import React from 'react'
import { useApproveMaintenancePlan } from './useApproveMaintenancePlan'
import PageWithDetail from '@/components/organism/PageWithDetail'
import { FormProvider } from 'react-hook-form'
import StepOne from './components/Step1'
import StepTwo from './components/Step2'
import StepThree from './components/Step3'
import StepFour from './components/Step4'
import { CoreButton } from '@/components/atoms/CoreButton'
import CustomStep from './components/CustomStep'
import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import { MENU_URL } from '@/routes'
import PageContainer from '@/components/organism/PageContainer'
import CoreLoading from '@/components/molecules/CoreLoading'

export default function ApproveMaintenancePlan() {
  const [values, handles] = useApproveMaintenancePlan()
  const { methodForm, isLoading, isLoadingSubmit, id, router } = values
  const { t, onSubmit, onCancel, onReject } = handles
  const { watch } = methodForm
  return (
    <>
      <FormProvider {...methodForm}>
        <PageContainer
          title={
            <CoreBreadcrumbs
              breadcrumbs={[
                {
                  title: t('nav.maintenance'),
                },
                {
                  title: t('nav.plannedMaintenance'),
                },
                {
                  title: t('nav.approvePlan'),
                  pathname: `${MENU_URL.APPROVE_MAINTENANCE_PLAN}`,
                },
                {
                  title: t('common:detail'),
                },
              ]}
            />
          }
        >
          {isLoading ? (
            <Box className='mt-25'>
              <CoreLoading />
            </Box>
          ) : (
            <form
              className='block bg-[#ffffff] rounded-xl mt-15'
              onSubmit={onSubmit}
            >
              <PageWithDetail
                tabName={`${t('common:detail')}`}
                className='mt-10'
                isHeight
              >
                <Box>
                  <StepOne />
                </Box>
              </PageWithDetail>
              <PageWithDetail
                tabName={`${t('listStep.assetMaintenanceSummary')}`}
                className='mt-10'
                isHeight
              >
                <Box>
                  <StepTwo />
                </Box>
              </PageWithDetail>
              <PageWithDetail
                tabName={`${t('listStep.sparePartsSummary')}`}
                className='mt-10'
                isHeight
              >
                <Box>
                  <StepThree />
                </Box>
              </PageWithDetail>
              <PageWithDetail
                tabName={`${t('listStep.maintenancePartsSummary')}`}
                className='mt-10'
                isHeight
              >
                <Box>
                  <StepFour />
                </Box>
              </PageWithDetail>
              {watch('approveEnum') === 'REJECT_1' ||
              watch('approveEnum') === 'REJECT_2' ? (
                <></>
              ) : (
                <Box className='space-x-12 mt-20'>
                  <CustomStep
                    step={watch('checkAccountLevel') === 'LEVEL_1' ? 0 : 1}
                    onChange={() => {}}
                    stepList={
                      watch('checkApproveLevel') === 'LEVEL_1'
                        ? [t('listStep.approvalLevel1')]
                        : [
                            t('listStep.approvalLevel1'),
                            t('listStep.approvalLevel2'),
                          ]
                    }
                  />
                </Box>
              )}
              {watch('approveEnum') === 'APPROVED' ||
              (watch('approveEnum') === 'APPROVED_LEVEL_1' &&
                watch('checkAccountLevel') === 'LEVEL_1') ||
              (watch('approveEnum') === 'REJECT_1' &&
                watch('checkAccountLevel') === 'LEVEL_1') ||
              watch('approveEnum') === 'REJECT_2' ? (
                <></>
              ) : (
                <Box className='space-x-12 text-center mt-20'>
                  <CoreButton
                    theme='reject'
                    variant='contained'
                    loading={isLoadingSubmit}
                    onClick={onReject}
                  >
                    {t('common:btn.reject')}
                  </CoreButton>
                  <CoreButton
                    type='submit'
                    variant='contained'
                    loading={isLoadingSubmit}
                  >
                    {t('common:btn.approval')}
                  </CoreButton>
                </Box>
              )}
            </form>
          )}
        </PageContainer>
      </FormProvider>
    </>
  )
}
