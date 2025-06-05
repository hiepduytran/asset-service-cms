import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import CoreInput from '@/components/atoms/CoreInput'
import CoreLoading from '@/components/molecules/CoreLoading'
import CoreNavbar from '@/components/organism/CoreNavbar'
import PageContainer from '@/components/organism/PageContainer'
import { getTitleBreadcrumbs } from '@/helper/getTitleBreadcrumbs'
import { MENU_URL } from '@/routes'
import { Grid } from '@mui/material'
import Image from 'next/image'
import { FormProvider } from 'react-hook-form'
import { convertDayOfWeek } from '../../utils'
import DialogDetailError from './components/dialog/DialogDetailError'
import TableCustomSelfMaintenanceCheck from './components/TableCustom'
import useSelfMaintenanceCheckAction from './useSelfMaintenanceCheckAction'

const SelfMaintenanceCheckAction = () => {
  const [
    {
      methods,
      isView,
      isUpdate,
      isLoadingAuditMaintenances,
      isShowDialogDetailError,
      incidentRecordingId,
      dataGetInfoUser,
    },
    {
      t,
      onSubmit,
      refetchAuditMaintenances,
      setIsShowDialogDetailError,
      setIncidentRecordingId,
    },
  ] = useSelfMaintenanceCheckAction()

  const { control, getValues } = methods
  return (
    <PageContainer
      title={
        <CoreBreadcrumbs
          isShowDashboard
          breadcrumbs={[
            {
              title: t('Kiểm tra tự bảo dưỡng'),
              pathname:
                MENU_URL.MAINTENANCE.SELF_MAINTENANCE.SELF_MAINTENANCE_CHECK,
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
              <FormProvider {...methods}>
                {isLoadingAuditMaintenances ? (
                  <CoreLoading />
                ) : (
                  <form onSubmit={onSubmit}>
                    <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
                      <Grid item sm={6} md={4}>
                        <CoreInput
                          name='department.name'
                          control={control}
                          label={t('Bộ phận')}
                          placeholder={t('Chọn bộ phận')}
                          isViewProp={true}
                        />
                      </Grid>
                      <Grid item sm={6} md={4}>
                        <CoreInput
                          name='dayOfWeek'
                          control={control}
                          label={t(
                            'self_maintenance.self_maintenance_perform.dayOfWeek.label'
                          )}
                          placeholder={t(
                            'self_maintenance.self_maintenance_perform.dayOfWeek.placeholder'
                          )}
                          isViewProp={true}
                          value={convertDayOfWeek(getValues('dayOfWeek'))}
                        />
                      </Grid>
                      <Grid item sm={6} md={4}>
                        <CoreInput
                          name='currentShift.name'
                          control={control}
                          label={t(
                            'self_maintenance.self_maintenance_perform.currentShift.label'
                          )}
                          placeholder={t(
                            'self_maintenance.self_maintenance_perform.currentShift.placeholder'
                          )}
                          isViewProp={true}
                          value={`${
                            getValues(
                              'maintenanceShiftAudits.0'
                            )?.isShow.findIndex((item) => item) + 1
                          }  (${getValues('currentShift')?.startHour} - ${
                            getValues('currentShift')?.endHour
                          })`}
                        />
                      </Grid>
                      <Grid item sm={6} md={4}>
                        <CoreInput
                          name='maintenanceCard.name'
                          control={control}
                          label={t(
                            'self_maintenance.self_maintenance_perform.maintenanceCard.label'
                          )}
                          placeholder={t(
                            'self_maintenance.self_maintenance_perform.maintenanceCard.placeholder'
                          )}
                          isViewProp={true}
                        />
                      </Grid>
                      <Grid item sm={6} md={4}>
                        <CoreInput
                          name='asset.code'
                          control={control}
                          label={t(
                            'self_maintenance.self_maintenance_perform.identity.label'
                          )}
                          placeholder={t(
                            'self_maintenance.self_maintenance_perform.identity.placeholder'
                          )}
                          isViewProp={true}
                        />
                      </Grid>
                      <Grid item sm={6} md={4}>
                        <div className='flex items-end'>
                          <CoreInput
                            name='product.name'
                            control={control}
                            label={t(
                              'self_maintenance.self_maintenance_perform.product.label'
                            )}
                            placeholder={t(
                              'self_maintenance.self_maintenance_perform.product.placeholder'
                            )}
                            isViewProp={true}
                          />
                          <div className='pb-2'>
                            {(
                              getValues('maintenanceShiftAudits.0.isShow') ?? []
                            ).map((item, index) => {
                              if (
                                item &&
                                getValues(
                                  `maintenanceShiftAudits.0.incidentRecording.${index}`
                                )
                              ) {
                                return (
                                  <Image
                                    key={index}
                                    src={require('@/assets/svg/error.svg')}
                                    alt=''
                                    onClick={() => {
                                      setIsShowDialogDetailError(true)

                                      setIncidentRecordingId(
                                        getValues(
                                          `maintenanceShiftAudits.0.incidentRecording.${index}.id`
                                        )
                                      )
                                    }}
                                  />
                                )
                              }
                            })}
                          </div>
                        </div>
                      </Grid>

                      <Grid item sm={12}>
                        <TableCustomSelfMaintenanceCheck
                          refetchAuditMaintenances={refetchAuditMaintenances}
                          dataGetInfoUser={dataGetInfoUser?.data}
                        />
                        {/* {watch('isShowDetail') && (
                          <div className='flex justify-center mt-10'>
                            <CoreButton
                              loading={isLoadingAuditMaintenances}
                              onClick={handlePlan}
                            >{`${t(
                              'self_maintenance.self_maintenance_check.btn.contingency_plan'
                            )}`}</CoreButton>
                          </div>
                        )} */}
                      </Grid>
                    </Grid>
                    {isShowDialogDetailError && (
                      <DialogDetailError
                        hideDialog={() => {
                          setIsShowDialogDetailError(false)
                        }}
                        incidentRecordingId={incidentRecordingId}
                      />
                    )}
                  </form>
                )}
              </FormProvider>
            ),
          },
        ]}
      />
    </PageContainer>
  )
}

export default SelfMaintenanceCheckAction
