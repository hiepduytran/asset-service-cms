import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import { CoreButton } from '@/components/atoms/CoreButton'
import CoreInput from '@/components/atoms/CoreInput'
import { useDate } from '@/components/hooks/date/useDate'
import CoreLoading from '@/components/molecules/CoreLoading'
import CoreNavbar from '@/components/organism/CoreNavbar'
import { CoreTable } from '@/components/organism/CoreTable'
import PageContainer from '@/components/organism/PageContainer'
import { getTitleBreadcrumbs } from '@/helper/getTitleBreadcrumbs'
import { MENU_URL } from '@/routes'
import { Grid, Typography } from '@mui/material'
import Image from 'next/image'
import { FormProvider } from 'react-hook-form'
import DialogDeleteIncident from './components/Dialog/DialogDeleteIncident'
import IncidentDetail from './components/IncidentDetail'
import useIncidentApproveAction from './useIncidentApproveAction'

export default function IncidentApproveAction() {
  const [
    {
      id,
      methods,
      isView,
      isUpdate,
      isLoadingDetailIncidentApprove,
      incidentRecordingMaintenancesFields,
      isLoadingApprove,
      isShowDialogDeleteIncident,
      tableData,
      columns,
    },
    {
      t,
      onReject,
      onSubmit,
      hideDialogDeleteIncident,
      refetchDetailIncidentApprove,
    },
  ] = useIncidentApproveAction()

  const { convertToTime } = useDate()
  const { control, getValues } = methods
  return (
    <PageContainer
      title={
        <CoreBreadcrumbs
          breadcrumbs={[
            {
              title: t('title'),
              pathname: MENU_URL.INCIDENT_APPROVE,
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
            content: isLoadingDetailIncidentApprove ? (
              <CoreLoading />
            ) : (
              <FormProvider {...methods}>
                <form className='flex flex-col' onSubmit={onSubmit}>
                  <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={12} sm={12} md={4}>
                      <CoreInput
                        name='code'
                        control={control}
                        label={t('Mã sự cố')}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                      <CoreInput
                        name='name'
                        control={control}
                        label={t('Tên sự cố')}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                      <CoreInput
                        name='asset.name'
                        control={control}
                        label={t('Tên tài sản')}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                      <CoreInput
                        name='incidentLocation.name'
                        control={control}
                        label={t('Vị trí lỗi')}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                      <CoreInput
                        name='department.name'
                        control={control}
                        label={t('Bộ phận')}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                      <CoreInput
                        name='recordingTime'
                        control={control}
                        label={t('Ngày ghi nhận gần nhất')}
                        value={convertToTime(getValues('recordingTime'))}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Typography
                        sx={{
                          fontWeight: 700,
                          fontSize: '16px',
                        }}
                      >{`${'SỰ CỐ CẦN PHÊ DUYỆT'}`}</Typography>
                    </Grid>

                    <Grid item xs={12}>
                      <div className='flex flex-col gap-10'>
                        <IncidentDetail
                          key={
                            getValues('incidentRecordingMaintenancesLast')?.id
                          }
                          title={
                            getValues('incidentRecordingMaintenancesLast')?.name
                          }
                          severity={
                            getValues('incidentRecordingMaintenancesLast')
                              ?.severityManagement?.name
                          }
                          source={
                            getValues('incidentRecordingMaintenancesLast')
                              ?.selfMaintenanceType
                          }
                          reporter={
                            getValues('incidentRecordingMaintenancesLast')
                              ?.recorder?.name
                          }
                          timestamp={
                            convertToTime(
                              getValues('incidentRecordingMaintenancesLast')
                                ?.recordingTime
                            ) ?? ''
                          }
                          reason={
                            getValues('incidentRecordingMaintenancesLast')
                              ?.reason
                          }
                        />
                      </div>
                    </Grid>

                    {(getValues(
                      `incidentRecordingMaintenances.${
                        getValues('incidentRecordingMaintenances')?.length - 1
                      }.approveStatus`
                    ) === 'PENDING' ||
                      !getValues('approveStatus')) && (
                      <Grid item xs={12}>
                        <div className='flex items-center gap-3 text-[12px] bg-[#FFEEBB] py-4 px-8 rounded-sm'>
                          <Image
                            src={require('@/assets/svg/errorYellow.svg')}
                            alt=''
                          />
                          Khi bấm Phê duyệt tức là bạn đã đồng thuận với Sự cố
                          ghi nhận gần nhất
                        </div>
                      </Grid>
                    )}

                    {tableData.length > 0 && (
                      <>
                        <Grid item xs={12}>
                          <Typography
                            sx={{
                              fontWeight: 700,
                              fontSize: '16px',
                            }}
                          >{`${'LỊCH SỬ GHI NHẬN'}`}</Typography>
                        </Grid>

                        <Grid item xs={12}>
                          <CoreTable
                            tableName='IncidentApprove'
                            data={tableData}
                            columns={columns}
                            isShowColumnStt
                            paginationHidden
                          />
                        </Grid>
                      </>
                    )}
                  </Grid>

                  {getValues(
                    `incidentRecordingMaintenances.${
                      getValues('incidentRecordingMaintenances')?.length - 1
                    }.approveStatus`
                  ) === 'PENDING' && (
                    <div className='flex justify-center mt-20 gap-10'>
                      <CoreButton theme='reject' onClick={onReject}>
                        {t('common:btn.reject')}
                      </CoreButton>
                      <CoreButton
                        theme='submit'
                        type='submit'
                        loading={isLoadingApprove}
                      >
                        {t('common:btn.approval')}
                      </CoreButton>
                    </div>
                  )}
                </form>

                {isShowDialogDeleteIncident && (
                  <DialogDeleteIncident
                    hideDialogDeleteIncident={hideDialogDeleteIncident}
                    refetchDetailIncidentApprove={refetchDetailIncidentApprove}
                  />
                )}
              </FormProvider>
            ),
          },
        ]}
      />
    </PageContainer>
  )
}
