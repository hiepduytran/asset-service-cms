import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import { CoreButton } from '@/components/atoms/CoreButton'
import CoreInput from '@/components/atoms/CoreInput'
import { CoreTable } from '@/components/organism/CoreTable'
import PageContainer from '@/components/organism/PageContainer'
import { MENU_URL } from '@/routes'
import { getDepartmentList } from '@/service/resource/getDepartmentList'
import { Grid } from '@mui/material'
import useSelfMaintenancePerform from './useSelfMaintenancePerform'

const SelfMaintenancePerform = () => {
  const [
    {
      methods,
      columns,
      tableData,
      router,
      isLoadingListAutoMaintenances,
      page,
    },
    { t, onChangePageSize, onSubmit, onReset },
  ] = useSelfMaintenancePerform()
  const { control, setValue, getValues } = methods

  return (
    <PageContainer
      title={
        <CoreBreadcrumbs
          isShowDashboard
          breadcrumbs={[
            {
              title: t('Thực hiện tự bảo dưỡng'),
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
              label={t('common:form.search.label')}
              placeholder={t('common:form.search.placeholder')}
            />
          </Grid>
          <Grid item sm={12} md={4}>
            <CoreAutoCompleteAPI
              name='department'
              control={control}
              label={t('Bộ phận')}
              placeholder={t('Chọn bộ phận')}
              fetchDataFn={getDepartmentList}
              multiple
              onChangeValue={(value) => {
                setValue(
                  'departmentIds',
                  value.map((item: any) => item.id)
                )
              }}
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
          isLoading={isLoadingListAutoMaintenances}
          {...page}
          onRowClick={(id) => {
            router.push({
              pathname: `${MENU_URL.MAINTENANCE.SELF_MAINTENANCE.SELF_MAINTENANCE_PERFORM}/[id]`,
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

export default SelfMaintenancePerform
