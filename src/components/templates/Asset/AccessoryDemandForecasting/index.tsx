import { CoreButton } from '@/components/atoms/CoreButton'
import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import CoreInput from '@/components/atoms/CoreInput'
import PageContainer from '@/components/organism/PageContainer'
import { WHITE } from '@/helper/colors'
import { Grid } from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'
import { CoreDatePicker } from '@/components/atoms/CoreDatePicker'
import TableRequestAllocationList from './TableCustom'
import { useAccessoryDemandForecastingList } from './useAccessoryDemandForecastingList'

export default function AccessoryDemandForecastingList() {
  const router = useRouter()

  const [values, handles] = useAccessoryDemandForecastingList()

  const { methodForm, tableData, isLoadingTable } = values
  const { control } = methodForm

  const { t, onSubmit, onChangePageSize, onReset } = handles
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
              title: t('title.demand_forecasting'),
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
          </Grid>

          <div className='flex justify-center mt-10 gap-10'>
            <CoreButton onClick={onReset} theme='reset'>
              Reset
            </CoreButton>
            <CoreButton theme='submit' type='submit'>
              {t('common:btn.search')}
            </CoreButton>
          </div>
        </form>

        <TableRequestAllocationList
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
