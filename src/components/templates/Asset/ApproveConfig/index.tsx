import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import { Box } from '@mui/material'
import React from 'react'
import { useApproveConfig } from './useApproveConfig'
import { FormProvider } from 'react-hook-form'
import PageWithDetail from '@/components/organism/PageWithDetail'
import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import CoreLoading from '@/components/molecules/CoreLoading'
import { fieldsApproveConfig } from '@/enum'
import { getListByUser } from '@/service/uaa/getListByUser'
import { CoreButton } from '@/components/atoms/CoreButton'
import CoreCheckbox from '@/components/atoms/CoreCheckbox'

type ApproveConfigKeys =
  | 'assetSelfMaintainStandard'
  | 'selfMaintainVoucher'
  | 'weeklyPlan'
  | 'emergingWeeklyPlan'
  | 'annualPlan'
  | 'emergencyFix'
  | 'regularMaintenance'

export default function ApproveConfig() {
  const [values, handles] = useApproveConfig()
  const { methodForm, isLoading, isLoadingSubmit, tokenAccess } = values
  const { control, watch, setValue, clearErrors } = methodForm
  const { t, onSubmit, onCancel } = handles
  return (
    <PageWithDetail
      paddingContent={0}
      title={
        <CoreBreadcrumbs
          breadcrumbs={[
            {
              title: t('title.maintenance'),
            },
            {
              title: t('title.config'),
            },
            {
              title: t('title.approve_config'),
            },
          ]}
        />
      }
    >
      <>
        {isLoading ? (
          <CoreLoading />
        ) : (
          <FormProvider {...methodForm}>
            <form onSubmit={onSubmit}>
              {fieldsApproveConfig.map((config, index) => (
                <Box key={'key' + index}>
                  <Box className='p-8 text-[14px] font-bold w-full bg-[#DFE0EB]/25 border-0 border-y-2 border-solid border-[#DFE0EB]'>
                    {config.label}
                  </Box>
                  <Box className='px-10 py-15 flex gap-20 flex-wrap'>
                    <CoreCheckbox
                      control={control}
                      label={t('label.approve_1')}
                      name={`${config.value}.level1.isActive`}
                      disabled={isLoading || isLoadingSubmit}
                      readOnly={isLoading || isLoadingSubmit}
                      required={watch(
                        `${config.value as ApproveConfigKeys}.level2.isActive`
                      )}
                      rules={{
                        required: watch(
                          `${config.value as ApproveConfigKeys}.level2.isActive`
                        )
                          ? t('common:validation.required')
                          : false,
                      }}
                      onChangeValue={() => {
                        setValue(
                          `${
                            config.value as ApproveConfigKeys
                          }.level1.groupStaff`,
                          null
                        )
                        clearErrors(
                          `${
                            config.value as ApproveConfigKeys
                          }.level1.groupStaff`
                        )
                      }}
                      isShowHelperText
                    />
                    <CoreAutoCompleteAPI
                      control={control}
                      label={t('label.type_approve')}
                      placeholder={t('placeholder.type_approve')}
                      name={`${config.value}.level1.groupStaff`}
                      className='w-150'
                      fetchDataFn={getListByUser}
                      params={{
                        userId: tokenAccess?.userId,
                        tenantId: tokenAccess?.tenantId,
                      }}
                      valuePath='id'
                      labelPath='name'
                      disabled={
                        !watch(
                          `${config.value as ApproveConfigKeys}.level1.isActive`
                        )
                      }
                      required={watch(
                        `${config.value as ApproveConfigKeys}.level1.isActive`
                      )}
                      rules={{
                        required: watch(
                          `${config.value as ApproveConfigKeys}.level1.isActive`
                        )
                          ? t('common:validation.required')
                          : false,
                      }}
                    />
                    <CoreCheckbox
                      control={control}
                      label={t('label.approve_2')}
                      name={`${config.value}.level2.isActive`}
                      disabled={isLoading || isLoadingSubmit}
                      readOnly={isLoading || isLoadingSubmit}
                      onChangeValue={() => {
                        setValue(
                          `${
                            config.value as ApproveConfigKeys
                          }.level2.groupStaff`,
                          null
                        )
                        clearErrors(
                          `${
                            config.value as ApproveConfigKeys
                          }.level2.groupStaff`
                        )
                      }}
                      isShowHelperText
                    />
                    <CoreAutoCompleteAPI
                      control={control}
                      label={t('label.type_approve')}
                      placeholder={t('placeholder.type_approve')}
                      name={`${config.value}.level2.groupStaff`}
                      className='w-150'
                      fetchDataFn={getListByUser}
                      params={{
                        userId: tokenAccess?.userId,
                        tenantId: tokenAccess?.tenantId,
                      }}
                      valuePath='id'
                      labelPath='name'
                      disabled={
                        !watch(
                          `${config.value as ApproveConfigKeys}.level2.isActive`
                        )
                      }
                      required={watch(
                        `${config.value as ApproveConfigKeys}.level2.isActive`
                      )}
                      rules={{
                        required: watch(
                          `${config.value as ApproveConfigKeys}.level2.isActive`
                        )
                          ? t('common:validation.required')
                          : false,
                      }}
                    />
                  </Box>
                </Box>
              ))}

              <div className='space-x-12 text-center my-10'>
                <CoreButton theme='cancel' onClick={onCancel}>
                  {t('common:btn.cancel')}
                </CoreButton>
                <CoreButton
                  theme='submit'
                  type='submit'
                  loading={isLoading || isLoadingSubmit}
                >
                  {t('common:btn.save_change')}
                </CoreButton>
              </div>
            </form>
          </FormProvider>
        )}
      </>
    </PageWithDetail>
  )
}
