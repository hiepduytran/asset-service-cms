import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import { CoreButton } from '@/components/atoms/CoreButton'
import CoreCheckbox from '@/components/atoms/CoreCheckbox'
import CoreLoading from '@/components/molecules/CoreLoading'
import CoreNavbar from '@/components/organism/CoreNavbar'
import PageContainer from '@/components/organism/PageContainer'
import { getListStockWarehouse } from '@/service/warehouse/getListStockWarehouse'
import { Box } from '@mui/material'
import { FormProvider } from 'react-hook-form'
import { useConfig } from './useConfig'

export default function Config() {
  const [values, handles] = useConfig()
  const { methodForm, isLoading, isLoadingSubmit } = values
  const { control } = methodForm
  const { t, onSubmit } = handles

  return (
    <PageContainer
      title={
        <CoreBreadcrumbs
          breadcrumbs={[
            {
              title: t('title'),
            },
          ]}
        />
      }
    >
      <CoreNavbar
        padding={'0px'}
        breadcrumbs={[
          {
            title: t('text.view'),
            content: isLoading ? (
              <CoreLoading />
            ) : (
              <FormProvider {...methodForm}>
                <form className='block rounded-xl mx-auto' onSubmit={onSubmit}>
                  <Box className='p-10 w-200'>
                    <CoreAutoCompleteAPI
                      control={control}
                      name='internalWarehouse'
                      label={t('label.internalWarehouse')}
                      placeholder=''
                      fetchDataFn={getListStockWarehouse}
                      params={{
                        state: 'APPROVED',
                        sourceProductType: 'INTERNAL',
                      }}
                      required
                      rules={{ required: t('common:validation.required') }}
                    />
                  </Box>
                  <Box className='p-8 text-[14px] font-bold w-full bg-[#DFE0EB]/25'>
                    {`${t('text.asset_allocation')}`}
                  </Box>
                  <Box className='px-10 py-5'>
                    <CoreCheckbox
                      control={control}
                      name='isApprove'
                      label={t('label.isApprove')}
                    />
                  </Box>

                  <div className='space-x-12 mx-auto text-center mt-10'>
                    <CoreButton theme='cancel'>
                      {t('common:btn.cancel')}
                    </CoreButton>
                    <CoreButton
                      theme='submit'
                      type='submit'
                      loading={isLoadingSubmit}
                    >
                      {t('common:btn.save_change')}
                    </CoreButton>
                  </div>
                </form>
              </FormProvider>
            ),
          },
        ]}
      />
    </PageContainer>
  )
}
