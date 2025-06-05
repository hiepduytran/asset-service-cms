import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import { CoreButton } from '@/components/atoms/CoreButton'
import CoreInput from '@/components/atoms/CoreInput'
import { CoreTable } from '@/components/organism/CoreTable'
import PageContainer from '@/components/organism/PageContainer'
import { MENU_URL } from '@/routes'
import { getAllDepartment } from '@/service/asset/requestAllocation/getList'
import { getListSeverityManagement } from '@/service/asset/severityManagement/list'
import { Grid } from '@mui/material'
import useIncidentApprove from './useIncidentApprove'

export default function IncidentApprove() {
  const [
    { methods, columns, tableData, isLoadingListIncidentApprove, router, page },
    { t, onChangePageSize, onSubmit, onReset },
  ] = useIncidentApprove()
  const { control } = methods
  return (
    <PageContainer
      title={
        <CoreBreadcrumbs
          breadcrumbs={[
            {
              title: t('title'),
              pathname: MENU_URL.INCIDENT_LOG_LIST,
            },
          ]}
        />
      }
    >
      <form className='flex flex-col' onSubmit={onSubmit}>
        <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12} sm={12} md={4}>
            <CoreInput
              name='search'
              control={control}
              label={t('common:form.search.label')}
              placeholder={t('common:form.search.placeholder')}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <CoreAutoCompleteAPI
              name='severityManagement'
              control={control}
              label={t('Mức độ nghiêm trọng')}
              placeholder={t('Chọn mức độ nghiêm trọng')}
              fetchDataFn={getListSeverityManagement}
              params={{
                managementType: 'SEVERITY_MANAGEMENT',
              }}
              defaultValue={null}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <CoreAutoCompleteAPI
              name='department'
              control={control}
              label={'Bộ phận'}
              placeholder={t('Chọn bộ phận')}
              fetchDataFn={getAllDepartment}
            />
          </Grid>
        </Grid>
        <div className='flex justify-center mt-10 mb-10 gap-10'>
          <CoreButton theme='reset' onClick={onReset}>
            Reset
          </CoreButton>
          <CoreButton theme='submit' type='submit'>
            {t('common:btn.search')}
          </CoreButton>
        </div>

        <Grid item xs={12}>
          <CoreTable
            tableName='incidentLogList'
            columns={columns}
            data={tableData}
            isShowColumnStt
            onChangePageSize={onChangePageSize}
            isLoading={isLoadingListIncidentApprove}
            onRowClick={(id) => {
              router.push({
                pathname: `${MENU_URL.INCIDENT_APPROVE}/[id]`,
                query: {
                  id: id,
                  actionType: 'VIEW',
                },
              })
            }}
            {...page}
          />
        </Grid>
      </form>
    </PageContainer>
  )
}
