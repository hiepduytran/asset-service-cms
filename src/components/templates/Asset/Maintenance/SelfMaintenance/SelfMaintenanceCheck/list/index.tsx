import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import { CoreButton } from '@/components/atoms/CoreButton'
import CoreInput from '@/components/atoms/CoreInput'
import { CoreTable } from '@/components/organism/CoreTable'
import PageContainer from '@/components/organism/PageContainer'
import { MENU_URL } from '@/routes'
import { Grid } from '@mui/material'
import useSelfMaintenanceCheck from './useSelfMaintenanceCheck'

const SelfMaintenanceCheck = () => {
  const [
    {
      methods,
      columns,
      tableData,
      router,
      isLoadingListAutoMaintenancesCheck,
      page,
    },
    { t, onChangePageSize, onSubmit, onReset },
  ] = useSelfMaintenanceCheck()
  const { control, setValue, getValues } = methods

  return (
    <PageContainer
      title={
        <CoreBreadcrumbs
          isShowDashboard
          breadcrumbs={[
            {
              title: t('Kiểm tra tự bảo dưỡng'),
            },
          ]}
        />
      }
    >
      <form onSubmit={onSubmit}>
        <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item sm={12} md={4}>
            <CoreInput
              name='search'
              control={control}
              label={t('common:btn.search')}
            />
          </Grid>
          <Grid item sm={12} md={4}>
            <CoreAutocomplete
              name='testStatus'
              control={control}
              label={t('Trạng thái kiểm tra')}
              placeholder={`${t('Chọn trạng thái kiểm tra')}`}
              options={[
                { label: 'Tất cả', value: null },
                { label: 'Chưa kiểm tra', value: 'UNCHECKED' },
                { label: 'Đã kiểm tra', value: 'CHECKED' },
              ]}
            />
          </Grid>
        </Grid>
        <div className='flex justify-center gap-10 mt-15 mb-15'>
          <CoreButton theme='cancel' onClick={onReset}>
            {t('common:btn.reset')}
          </CoreButton>
          <CoreButton theme='submit' type='submit'>
            {t('common:btn.search')}
          </CoreButton>
        </div>

        <CoreTable
          tableName='SelfMaintenancePerform'
          columns={columns}
          data={tableData}
          onChangePageSize={onChangePageSize}
          isShowColumnStt
          isLoading={isLoadingListAutoMaintenancesCheck}
          {...page}
          onRowClick={(id) => {
            router.push({
              pathname: `${MENU_URL.MAINTENANCE.SELF_MAINTENANCE.SELF_MAINTENANCE_CHECK}/[id]`,
              query: {
                id,
                actionType: 'VIEW',
              },
            })
          }}
        />
      </form>
    </PageContainer>
  )
}

export default SelfMaintenanceCheck
