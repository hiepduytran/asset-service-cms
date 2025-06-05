import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import { CoreButton } from '@/components/atoms/CoreButton'
import CoreInput from '@/components/atoms/CoreInput'
import CoreLoading from '@/components/molecules/CoreLoading'
import CoreNavbar from '@/components/organism/CoreNavbar'
import PageContainer from '@/components/organism/PageContainer'
import { MENU_URL } from '@/routes'
import { getAssetList } from '@/service/product/getAssetList'
import { Box, Grid, Typography } from '@mui/material'
import Image from 'next/image'
import { FormProvider } from 'react-hook-form'
import CustomStep from './CustomStep'
import TableStandard from './TableStandard'
import useStandardApprovalAction from './useStandardApprovalAction'
import { getTitleBreadcrumbs } from '@/helper/getTitleBreadcrumbs'

export default function StandardApprovalAction() {
  const [
    {
      methods,
      isView,
      isUpdate,
      step,
      dataDetail,
      isLoading,
      isLoadingApprove,
      id,
      standardMethodGroupFields,
    },
    { t, onSubmit, handleChangeStatus },
  ] = useStandardApprovalAction()

  const { control, setValue, watch } = methods
  return (
    <PageContainer
      title={
        <CoreBreadcrumbs
          breadcrumbs={[
            { title: t('label.maintenance') },
            { title: t('label.selfMaintenance') },
            {
              title: t('title'),
              pathname: MENU_URL.MAINTENANCE.SELF_MAINTENANCE.STANDARD_APPROVAL,
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
            title: t('common:detail'),
            content: (
              <>
                {isLoading ? (
                  <CoreLoading />
                ) : (
                  <FormProvider {...methods}>
                    <form onSubmit={onSubmit}>
                      <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                          <CoreAutoCompleteAPI
                            control={control}
                            label={t('label.assetCode')}
                            placeholder={t('placeholder.asset')}
                            valuePath='id'
                            labelPath='sku'
                            name='product'
                            fetchDataFn={getAssetList}
                            params={{
                              isAsset: true,
                            }}
                            required={true}
                            isViewProp={!!id}
                            rules={{
                              required: t('common:validation.required'),
                            }}
                            onChangeValue={(val) => {
                              setValue('productName', val?.name ?? '')
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                          <CoreInput
                            control={control}
                            name='productName'
                            label={t('label.assetName')}
                            isViewProp={true}
                          />
                        </Grid>

                        {!!watch('product') && (
                          <>
                            <Grid item xs={12}>
                              <Typography
                                fontSize={'14px'}
                                marginTop={1}
                                fontWeight={700}
                              >
                                {t('label.assetImage')}
                              </Typography>
                            </Grid>
                            <Grid item xs={12}>
                              <Box className='flex gap-10 mb-10'>
                                {watch('product')?.imageUrls?.map(
                                  (item, index) => (
                                    <div
                                      className='flex justify-center items-center p-2 border-[1px] border-solid border-[#DFE0EB] rounded-sm'
                                      key={'key' + index}
                                    >
                                      <Image
                                        width={100}
                                        height={100}
                                        alt=''
                                        className='rounded-sm'
                                        src={item ?? ''}
                                      />
                                    </div>
                                  )
                                )}
                              </Box>
                            </Grid>
                          </>
                        )}
                      </Grid>
                      <div className='flex flex-col'>
                        <div className='bg-[#f0f3f7] px-16 -mx-16 py-6 mt-18'>
                          <Typography variant='h6' sx={{ fontWeight: '700' }}>
                            {t('label.standardInfo')}
                          </Typography>
                        </div>
                        {standardMethodGroupFields?.map((item, index) => (
                          <div key={'key' + index}>
                            <Typography
                              sx={{
                                fontWeight: '600',
                                margin: '36px 0 20px 0',
                                fontSize: '15px',
                              }}
                            >
                              {
                                watch(
                                  `standardMethodGroups.${index}.standardGroup`
                                )?.name
                              }
                            </Typography>
                            <TableStandard index={index} />
                          </div>
                        ))}
                      </div>
                      {!(watch('state') === 'REJECT') && (
                        <div className='my-15'>
                          <CustomStep
                            step={
                              dataDetail?.checkAccountLevel === 'LEVEL_1'
                                ? 0
                                : 1
                            }
                            onChange={() => {}}
                            stepList={
                              dataDetail?.checkApproveLevel === 'LEVEL_2'
                                ? [
                                    `${t('text.approval_level_1')}`,
                                    `${t('text.approval_level_2')}`,
                                  ]
                                : [`${t('text.approval_level_1')}`]
                            }
                          />
                        </div>
                      )}

                      {((dataDetail?.state === 'PENDING' &&
                        dataDetail?.checkAccountLevel === 'LEVEL_1') ||
                        (dataDetail?.state === 'APPROVED_LEVEL_1' &&
                          dataDetail?.checkAccountLevel === 'LEVEL_2')) && (
                        <div className='flex justify-center mt-15'>
                          <div className='m-5'>
                            <CoreButton
                              theme='reject'
                              loading={isLoadingApprove}
                              onClick={() => {
                                const currentState =
                                  dataDetail?.checkAccountLevel === 'LEVEL_1'
                                    ? 'REJECT_1'
                                    : 'REJECT_2'
                                handleChangeStatus(currentState)
                              }}
                            >
                              {t('common:btn.reject')}
                            </CoreButton>
                          </div>

                          <div className='m-5'>
                            <CoreButton
                              theme='submit'
                              type='submit'
                              loading={isLoadingApprove}
                              onClick={() =>
                                handleChangeStatus(
                                  dataDetail?.state === 'PENDING'
                                    ? 'APPROVED_LEVEL_1'
                                    : 'APPROVED'
                                )
                              }
                            >
                              {t('common:btn.approval')}
                            </CoreButton>
                          </div>
                        </div>
                      )}
                    </form>
                  </FormProvider>
                )}
              </>
            ),
          },
        ]}
      />
    </PageContainer>
  )
}
