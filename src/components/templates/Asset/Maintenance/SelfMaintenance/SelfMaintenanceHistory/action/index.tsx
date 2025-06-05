import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import { CoreButton } from '@/components/atoms/CoreButton'
import { CoreDatePicker } from '@/components/atoms/CoreDatePicker'
import CoreLoading from '@/components/molecules/CoreLoading'
import CoreNavbar from '@/components/organism/CoreNavbar'
import { CoreTable } from '@/components/organism/CoreTable'
import PageContainer from '@/components/organism/PageContainer'
import { MenuItemAssetUseHistory } from '@/components/templates/Asset/AssetUseHistory/components/MenuItem'
import { getTitleBreadcrumbs } from '@/helper/getTitleBreadcrumbs'
import { MENU_URL } from '@/routes'
import { getListAssetAccessoryId } from '@/service/asset/IncidentLogList/dialog'
import { getListSeverityManagement } from '@/service/asset/severityManagement/list'
import { Grid, Typography } from '@mui/material'
import Image from 'next/image'
import { FormProvider } from 'react-hook-form'
import DownUrl from 'src/assets/svg/caretDown.svg'
import TableCustomSelfMaintenanceHistory from './components/CoreTableCustom'
import useSelfMaintenanceHistoryAction from './useSelfMaintenanceHistory'
const SelfMaintenanceHistoryAction = () => {
  const [
    {
      id,
      router,
      defaultValues,
      methods,
      isView,
      isUpdate,
      columns,
      tableData,
      isLoadingAutoMaintenancesHistory,
      anchorEl,
      page,
      isLoadingAutoMaintenancesHistoryIncident,
    },
    {
      t,
      refetchAutoMaintenancesHistory,
      setAnchorEl,
      convertAround,
      onSubmit,
      onReset,
      onChangePageSize,
    },
  ] = useSelfMaintenanceHistoryAction()
  const { control, watch, reset, setValue, getValues } = methods

  return (
    <PageContainer
      title={
        <CoreBreadcrumbs
          breadcrumbs={[
            {
              title: t('self_maintenance.self_maintenance_history.title'),
              pathname:
                MENU_URL.MAINTENANCE.SELF_MAINTENANCE.SELF_MAINTENANCE_HISTORY,
            },
            { title: getTitleBreadcrumbs(t, isView, isUpdate) },
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
                <form onSubmit={onSubmit}>
                  <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
                    {getValues('around') === 'INCIDENT' && (
                      <>
                        <Grid item sm={6} md={4}>
                          <CoreAutoCompleteAPI
                            name='incidentLocation'
                            control={control}
                            label={t('Vị trí')}
                            placeholder={`${t('Chọn vị trí')}`}
                            parentPath='product'
                            fetchDataFn={getListAssetAccessoryId}
                            params={{
                              productId: 217,
                            }}
                            onChangeValue={(val) => {
                              if (val) {
                                setValue('incidentLocationId', val?.product.id)
                              } else {
                                setValue('incidentLocationId', null)
                              }
                            }}
                            isViewProp={false}
                          />
                        </Grid>
                        <Grid item sm={6} md={4}>
                          <CoreAutoCompleteAPI
                            name='severityManagement'
                            control={control}
                            label={t('Mức độ nghiêm trọng')}
                            placeholder={`${t('Chọn mức độ nghiêm trọng')}`}
                            fetchDataFn={getListSeverityManagement}
                            onChangeValue={(val) => {
                              if (val) {
                                setValue('severityManagementId', val?.id)
                              } else {
                                setValue('severityManagementId', null)
                              }
                            }}
                            isViewProp={false}
                          />
                        </Grid>
                        <Grid item sm={6} md={4}>
                          <CoreAutocomplete
                            name='isHandle'
                            control={control}
                            label={t('Trạng thái xử lý')}
                            placeholder={`${t('Chọn trạng thái xử lý')}`}
                            options={[
                              {
                                label: 'Tất cả',
                                value: null,
                              },
                              {
                                label: 'Chưa xử lý',
                                value: false,
                              },
                              {
                                label: 'Đã xử lý',
                                value: true,
                              },
                            ]}
                            isViewProp={false}
                          />
                        </Grid>
                        <Grid item sm={6} md={4}>
                          <CoreDatePicker
                            name='startDate'
                            control={control}
                            label={t('Thời gian bắt đầu')}
                            isViewProp={false}
                          />
                        </Grid>
                        <Grid item sm={6} md={4}>
                          <CoreDatePicker
                            name='endDate'
                            control={control}
                            label={t('Thời gian kết thúc')}
                            isViewProp={false}
                          />
                        </Grid>
                      </>
                    )}

                    {getValues('around') === 'SELF_MAINTENANCE' && (
                      <Grid item sm={12} md={4}>
                        <CoreDatePicker
                          name='date'
                          control={control}
                          label={t('Thời gian ghi nhận')}
                          isViewProp={false}
                        />
                      </Grid>
                    )}
                  </Grid>
                  <div className='flex justify-center mt-10 mb-20 gap-10'>
                    <CoreButton theme='cancel' onClick={onReset}>
                      {t('common:btn.reset')}
                    </CoreButton>
                    <CoreButton theme='submit' type='submit'>
                      {t('common:btn.search')}
                    </CoreButton>
                  </div>

                  {isLoadingAutoMaintenancesHistory ? (
                    <CoreLoading />
                  ) : (
                    <>
                      {getValues('around') === 'SELF_MAINTENANCE' && (
                        <div className='flex gap-4 items-center'>
                          <Typography
                            color={'#0078D4'}
                            sx={{
                              fontWeight: 600,
                            }}
                          >
                            MÃ PHIẾU KẾ HOẠCH THỰC HIỆN TỰ BẢO DƯỠNG:{' '}
                          </Typography>
                          <div
                            className='flex gap-4 items-center cursor-pointer'
                            onClick={() => {
                              router.push({
                                pathname: `${MENU_URL.MAINTENANCE.SELF_MAINTENANCE.SELF_MAINTENANCE_HISTORY}/[id]/selfMaintenanceFollowHistory`,
                                query: {
                                  id,
                                  maintenanceCardId:
                                    getValues('maintenanceCard.id'),
                                  actionType: 'VIEW',
                                },
                              })
                            }}
                          >
                            <Typography
                              color={'#0078D4'}
                              sx={{
                                fontWeight: 600,
                              }}
                            >
                              {getValues('maintenanceCard.code')}
                            </Typography>
                            <Image
                              src={require('@/assets/svg/errorBlack.svg')}
                              alt=''
                            />
                          </div>
                        </div>
                      )}

                      <div className='flex justify-between items-center'>
                        <Typography
                          sx={{
                            fontWeight: 600,
                          }}
                        >
                          DANH SÁCH LỊCH SỬ SỰ CỐ TỰ BẢO DƯỠNG
                        </Typography>
                        <div className='flex justify-end items-center gap-4 py-8'>
                          <Typography>Lọc: </Typography>
                          <div
                            className='flex gap-4 items-center cursor-pointer'
                            onClick={(e) => setAnchorEl(e.currentTarget)}
                          >
                            <Typography>
                              {convertAround(getValues('around') ?? '')}
                            </Typography>
                            <Image src={DownUrl} alt='' />
                          </div>
                          <MenuItemAssetUseHistory
                            classes={{
                              root: 'mt-4',
                            }}
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={() => setAnchorEl(null)}
                            itemList={[
                              {
                                label: 'Chiều sự cố',
                                value: 'INCIDENT',
                              },
                              {
                                label: 'Chiều tự bảo dưỡng',
                                value: 'SELF_MAINTENANCE',
                              },
                            ]}
                            onItemAction={(item) => {
                              reset(defaultValues)
                              setValue('around', item.value)
                              setAnchorEl(null)
                            }}
                            currentValue={getValues('around')}
                          />
                        </div>
                      </div>

                      {getValues('around') === 'INCIDENT' && (
                        <CoreTable
                          tableName='SelfMaintenanceHistory'
                          columns={columns}
                          data={tableData}
                          isShowColumnStt
                          isLoading={isLoadingAutoMaintenancesHistoryIncident}
                          {...page}
                          onChangePageSize={onChangePageSize}
                        />
                      )}

                      {getValues('around') === 'SELF_MAINTENANCE' && (
                        <TableCustomSelfMaintenanceHistory />
                      )}
                    </>
                  )}
                </form>
              </FormProvider>
            ),
          },
        ]}
      />
    </PageContainer>
  )
}

export default SelfMaintenanceHistoryAction
