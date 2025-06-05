import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import CoreInput from '@/components/atoms/CoreInput'
import EditIcon from '@/components/icons/EditIcon'
import CoreLoading from '@/components/molecules/CoreLoading'
import CoreNavbar from '@/components/organism/CoreNavbar'
import PageContainer from '@/components/organism/PageContainer'
import { getTitleBreadcrumbs } from '@/helper/getTitleBreadcrumbs'
import { MENU_URL } from '@/routes'
import { Grid, Typography } from '@mui/material'
import Image from 'next/image'
import { FormProvider } from 'react-hook-form'
import { convertDayOfWeek } from '../../utils'
import DialogChangeShift from './components/DialogChangeShift'
import DialogDetailError from './components/DialogDetailError'
import CoreTableSelfMaintenancePerform from './components/TableSelfMaintenancePerform'
import useSelfMaintenancePerformAction from './useSelfMaintenancePerformAction'

const SelfMaintenancePerformAction = () => {
  const [
    {
      methods,
      isView,
      isUpdate,
      isLoadingAutoMaintenances,
      isShowChangeShift,
      isShowDialogDetailError,
      incidentRecordingId,
      errorAutoMaintenances,
    },
    {
      t,
      refetchAutoMaintenances,
      onChangeShift,
      hideDialogChangeShift,
      setIsShowDialogDetailError,
      setIncidentRecordingId,
    },
  ] = useSelfMaintenancePerformAction()
  const { control, getValues } = methods

  return (
    <PageContainer
      title={
        <CoreBreadcrumbs
          breadcrumbs={[
            {
              title: t('Thực hiện tự bảo dưỡng'),
              pathname:
                MENU_URL.MAINTENANCE.SELF_MAINTENANCE.SELF_MAINTENANCE_PERFORM,
            },
            { title: getTitleBreadcrumbs(t, isView, isUpdate) },
          ]}
        />
      }
    >
      <CoreNavbar
        breadcrumbs={[
          {
            title: 'Chi tiết',
            content: isLoadingAutoMaintenances ? (
              <CoreLoading />
            ) : (
              <FormProvider {...methods}>
                <form>
                  <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item sm={6} md={4}>
                      <CoreInput
                        name='department.name'
                        control={control}
                        label={t(
                          'self_maintenance.self_maintenance_perform.department.label'
                        )}
                        placeholder={t(
                          'self_maintenance.self_maintenance_perform.department.placeholder'
                        )}
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
                          getValues('maintenanceShifts.0')?.isShow.findIndex(
                            (item) => item
                          ) + 1
                        }`}
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
                          {(getValues('maintenanceShifts.0.isShow') ?? []).map(
                            (item, index) => {
                              if (
                                item &&
                                getValues(
                                  `maintenanceShifts.0.incidentRecording.${index}`
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
                                          `maintenanceShifts.0.incidentRecording.${index}.id`
                                        )
                                      )
                                    }}
                                  />
                                )
                              }
                            }
                          )}
                        </div>
                      </div>
                    </Grid>
                    <Grid item xs={12}>
                      <CoreTableSelfMaintenancePerform
                        refetchAutoMaintenances={refetchAutoMaintenances}
                      />
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
                  {isShowChangeShift && (
                    <DialogChangeShift
                      hideDialogChangeShift={hideDialogChangeShift}
                    />
                  )}
                </form>
              </FormProvider>
            ),
            rightAction: (
              <div
                className='flex items-center cursor-pointer'
                onClick={onChangeShift}
              >
                <EditIcon />
                <Typography variant='body2' sx={{ color: '#0078D4' }}>
                  Cập nhật ca làm việc
                </Typography>
              </div>
            ),
          },
        ]}
      />
    </PageContainer>
  )
}

export default SelfMaintenancePerformAction
