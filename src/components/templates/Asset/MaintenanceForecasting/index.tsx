import { CoreButton } from '@/components/atoms/CoreButton'
import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import CoreInput from '@/components/atoms/CoreInput'
import PageContainer from '@/components/organism/PageContainer'
import { WHITE } from '@/helper/colors'
import { Dashboard } from '@mui/icons-material'
import { Grid, IconButton, Typography } from '@mui/material'
import React from 'react'
import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import { CoreDatePicker } from '@/components/atoms/CoreDatePicker'
import { getDepartmentList } from '@/service/resource/getDepartmentList'
import { useMaintenanceForecastingList } from './useMaintenanceForecastingList'
import TableCustom from './TableCustom'

export default function MaintenanceForecastingList() {
  const [values, handles] = useMaintenanceForecastingList()

  const {
    methodForm,
    tableData,
    isLoadingTable,
    forecastingCheckedTable,
    setForecastingCheckedTable,
  } = values
  const { control } = methodForm

  const { t, onSubmit, onChangePageSize, onReset, handlePlan } = handles
  return (
    <PageContainer
      title={
        <CoreBreadcrumbs
          breadcrumbs={[
            {
              title: t('title.maintenance'),
            },
            {
              title: t('title.forecasting'),
            },
            {
              title: t('title.maintenance_forecasting'),
            },
          ]}
        />
      }
    >
      <div className='flex flex-col'>
        <form
          onSubmit={onSubmit}
          className='flex flex-col py-10 px-5'
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
                name='departmentId'
                label={t('label.department')}
                valuePath='id'
                placeholder=''
                labelPath='name'
                fetchDataFn={getDepartmentList}
                hasAllOption
                disableClearable
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <CoreDatePicker
                control={control}
                name='startDate'
                label={t('label.startDate')}
                disablePast
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <CoreDatePicker
                control={control}
                name='endDate'
                label={t('label.endDate')}
                disablePast
              />
            </Grid>
            <Grid item xs={12}>
              <div className='flex justify-center gap-10'>
                <CoreButton onClick={onReset} theme='reset'>
                  Reset
                </CoreButton>
                <CoreButton theme='submit' type='submit'>
                  {t('common:btn.search')}
                </CoreButton>
              </div>
            </Grid>

            <Grid item xs={12}>
              <Typography
                fontSize={'14px'}
                marginTop={1}
                marginBottom={2}
                fontWeight={700}
              >
                {`${t('text.supplier_recommend')}`}
              </Typography>
              <CoreButton
                theme='submit'
                onClick={() => handlePlan()}
                disabled={!forecastingCheckedTable.length}
              >
                {t('btn.plan')}
              </CoreButton>
            </Grid>
          </Grid>
        </form>

        <TableCustom
          forecastingCheckedTable={forecastingCheckedTable}
          setForecastingCheckedTable={setForecastingCheckedTable}
          data={tableData?.content ?? []}
          {...tableData}
          onChangePageSize={onChangePageSize}
          t={t}
          isLoading={isLoadingTable}
        />
      </div>
    </PageContainer>
  )
}
