import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import { CoreButton } from '@/components/atoms/CoreButton'
import { Action } from '@/components/molecules/Action'
import CoreLoading from '@/components/molecules/CoreLoading'
import PageWithDetail from '@/components/organism/PageWithDetail'
import { getWorkingScheduleConfigs } from '@/service/hrm/getWorkingScheduleConfigs'
import { getListStaff } from '@/service/resource/getListStaff'
import { getListByUser } from '@/service/uaa/getListByUser'
import { Box } from '@mui/material'
import { FormProvider } from 'react-hook-form'
import { usePolicyRole } from './usePolicyRole'

export default function PolicyRole() {
  const [values, handles] = usePolicyRole()
  const {
    methodForm,
    isLoading,
    isLoadingSubmit,
    fields,
    tokenAccess,
    exceptValuesRole,
  } = values
  const { control } = methodForm
  const { t, onSubmit, onCancel, append, remove } = handles
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
              title: t('title.policy_role'),
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
              <Box className='p-8 text-[14px] font-bold w-full bg-[#DFE0EB]/25 border-0 border-y-2 border-solid border-[#DFE0EB]'>
                {`${t('text.policy_work')}`}
              </Box>
              <CoreAutoCompleteAPI
                control={control}
                name='policy'
                label={t('label.policy')}
                placeholder={t('placeholder.policy')}
                fetchDataFn={getWorkingScheduleConfigs}
                className='w-200'
                sx={{ margin: '1rem' }}
                required
                rules={{ required: t('common:validation.required') }}
              />
              <Box className='p-8 text-[14px] font-bold w-full bg-[#DFE0EB]/25 border-0 border-y-2 border-solid border-[#DFE0EB]'>
                {`${t('text.config_role')}`}
              </Box>
              {fields.map((field, index) => (
                <Box key={'key' + index}>
                  <Box className='p-8 flex gap-20 flex-wrap'>
                    <CoreAutoCompleteAPI
                      control={control}
                      name={`policyRoleMap.${index}.role`}
                      label={t('label.role')}
                      placeholder={t('placeholder.role')}
                      fetchDataFn={getListByUser}
                      params={{
                        userId: tokenAccess?.userId,
                        tenantId: tokenAccess?.tenantId,
                      }}
                      className='w-200'
                      exceptValues={exceptValuesRole}
                    />
                    <CoreAutoCompleteAPI
                      control={control}
                      name={`policyRoleMap.${index}.staff`}
                      label={t('label.staff')}
                      placeholder={t('placeholder.staff')}
                      fetchDataFn={getListStaff}
                      className='w-200'
                      multiple
                      labelPathDisplay={['name', 'code']}
                    />
                    <Action
                      actionList={
                        fields.length === 1 ? ['append'] : ['append', 'remove']
                      }
                      onAppendAction={() => {
                        append({
                          role: null,
                          staff: [],
                        })
                      }}
                      onRemoveAction={() => {
                        remove(index)
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
