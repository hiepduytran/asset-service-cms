import { CoreButton } from '@/components/atoms/CoreButton'
import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import CoreInput from '@/components/atoms/CoreInput'
import PageContainer from '@/components/organism/PageContainer'
import { WHITE } from '@/helper/colors'
import { Grid, Typography } from '@mui/material'
import React from 'react'
import { useIncidentList } from './useIncidentList'
import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import { getAllDepartment } from '@/service/asset/requestAllocation/getList'
import { getListAsset } from '@/service/product/getListAsset'
import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import TableCustom from './components/TableCustom'

export default function IncidentList() {
  const [values, handles] = useIncidentList()

  const {
    methodForm,
    isLoadingTable,
    tableData,
    totalPages,
    page,
    size,
    selectedRows,
    setSelectedRows,
  } = values
  const { control } = methodForm

  const { t, onReset, onSubmit, onChangePageSize, handlePlan } = handles
  return (
    <PageContainer
      title={
        <CoreBreadcrumbs
          breadcrumbs={[
            {
              title: t('nav.weeklyIncidentList'),
            },
          ]}
        />
      }
    >
      <div className='flex flex-col'>
        <form
          onSubmit={onSubmit}
          className='flex flex-col p-5'
          style={{
            backgroundColor: WHITE,
            borderRadius: 20,
          }}
        >
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
                name='asset'
                label={t('table.assetName')}
                placeholder=''
                fetchDataFn={getListAsset}
                params={{
                  type: 'ASSET',
                }}
                hasAllOption
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <CoreAutoCompleteAPI
                control={control}
                name='department'
                label={t('table.part')}
                placeholder=''
                fetchDataFn={getAllDepartment}
                hasAllOption
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <CoreAutocomplete
                control={control}
                name='isActive'
                label={t('table.assetStatus')}
                options={[
                  { label: t('common:all'), value: null },
                  { label: 'Active', value: true },
                  { label: 'Inactive', value: false },
                ]}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <CoreAutocomplete
                control={control}
                name='isPlaned'
                label={t('table.planStatus')}
                options={[
                  { label: t('common:all'), value: null },
                  { label: 'Active', value: true },
                  { label: 'Inactive', value: false },
                ]}
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
        <div className='flex justify-start ml-10'>
          <CoreButton onClick={handlePlan} disabled={!selectedRows.length}>
            {t('btn.aggregatePlan')}
          </CoreButton>
        </div>
        <TableCustom
          t={t}
          isLoading={isLoadingTable}
          data={tableData ?? []}
          onChangePageSize={onChangePageSize}
          totalPages={totalPages ?? 0}
          page={page ?? 0}
          size={size ?? 0}
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
        />
      </div>
    </PageContainer>
  )
}
