import { CoreButton } from '@/components/atoms/CoreButton'
import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import CoreInput from '@/components/atoms/CoreInput'
import PageContainer from '@/components/organism/PageContainer'
import { MENU_URL } from '@/routes'
import { Grid } from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'
import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import { useIncidentReportList } from './useIncidentReportList'
import { TableWithDropdown } from '@/components/organism/TableWithDropdown'
import { getListSeverityManagement } from '@/service/asset/operate/save/getListSeverityManagement'
import { getAllDepartment } from '@/service/asset/requestAllocation/getList'

export default function IncidentReportList() {
  const router = useRouter()

  const [values, handles] = useIncidentReportList()
  const {
    methodForm,
    isLoadingTable,
    columns,
    tableData,
    data,
    columnsChild,
    dataChild,
    isLoadingChild,
  } = values
  const { control } = methodForm

  const {
    t,
    onSubmit,
    onReset,
    onChangePageSize,
    refetch,
    handleFetchDataChild,
  } = handles
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
      <div className='flex flex-col'>
        <form onSubmit={onSubmit} className='flex flex-col p-5'>
          <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <CoreInput
                control={control}
                name='search'
                label={t('common:form.search.label')}
                placeholder={t('common:form.search.placeholder')}
                inputProps={{
                  maxLength: 50,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <CoreAutoCompleteAPI
                control={control}
                name='severityManagement'
                label={t('table.severityLevel')}
                placeholder=''
                fetchDataFn={getListSeverityManagement}
                hasAllOption
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <CoreAutoCompleteAPI
                control={control}
                name='department'
                label={t('table.department')}
                placeholder=''
                fetchDataFn={getAllDepartment}
                hasAllOption
              />
            </Grid>
          </Grid>
          <div className='flex justify-center mt-10 gap-10'>
            <CoreButton onClick={onReset} theme='reset'>
              {t('common:btn.reset')}
            </CoreButton>
            <CoreButton theme='submit' type='submit'>
              {t('common:btn.search')}
            </CoreButton>
          </div>
        </form>

        <div className='flex justify-end'>
          <CoreButton onClick={() => router.push(`${MENU_URL.INCIDENT_REPORT}/addNew`)}>
            {t('common:btn.add')}
          </CoreButton>
        </div>
        <div className='py-5'>
          <TableWithDropdown
            tableName='incidentReport'
            tableNameChild='incidentReportChild'
            columns={columns}
            data={tableData}
            {...data}
            isLoading={isLoadingTable}
            isShowColumnStt
            onChangePageSize={onChangePageSize}
            columnsChild={columnsChild}
            dataChild={dataChild}
            isLoadingChild={isLoadingChild}
            handleFetchDataChild={handleFetchDataChild}
            tabName={t('table.machineDetails')}
            onRowClick={(id: number) => {
              router.push({
                pathname: `${MENU_URL.INCIDENT_REPORT}/[id]`,
                query: {
                  id,
                  actionType: 'VIEW',
                },
              })
            }}
            objectShowDropdown={{
              header: t('table.machineDetails'),
              fieldName: 'detail',
            }}
          />
        </div>
      </div>
    </PageContainer>
  )
}
