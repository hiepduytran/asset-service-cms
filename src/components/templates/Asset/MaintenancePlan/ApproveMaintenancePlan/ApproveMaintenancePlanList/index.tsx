import { CoreButton } from '@/components/atoms/CoreButton'
import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import CoreInput from '@/components/atoms/CoreInput'
import { CoreTable } from '@/components/organism/CoreTable'
import PageContainer from '@/components/organism/PageContainer'
import { WHITE } from '@/helper/colors'
import { MENU_URL } from '@/routes'
import { Grid, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'
import { useApproveMaintenancePlanList } from './useApproveMaintenancePlanList'
import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import { planTypeOfMaintenancePlan } from '@/enum'

export default function ApproveMaintenancePlanList() {
  const [values, handles] = useApproveMaintenancePlanList()

  const { methodForm, columns, tableData, data, isLoadingTable } = values
  const { control } = methodForm

  const { t, onSubmit, onChangePageSize, onReset } = handles
  const router = useRouter()
  return (
    <PageContainer
      title={
        <CoreBreadcrumbs
          breadcrumbs={[
            {
              title: (
                <div className='flex gap-3 items-center'>
                  <Typography>{t('nav.maintenance')}</Typography>
                </div>
              ),
            },
            {
              title: (
                <div className='flex gap-3 items-center'>
                  <Typography>{t('nav.plannedMaintenance')}</Typography>
                </div>
              ),
            },
            {
              title: (
                <div className='flex gap-3 items-center'>
                  <Typography>{t('nav.approvePlan')}</Typography>
                </div>
              ),
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
            <Grid item xs={12} sm={12} md={6} lg={6}>
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
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <CoreAutocomplete
                control={control}
                name='planType'
                label={t('table.planType')}
                options={planTypeOfMaintenancePlan}
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
        <CoreTable
          tableName='approveMaintenancePlan'
          columns={columns}
          data={tableData}
          onChangePageSize={onChangePageSize}
          {...data}
          isLoading={isLoadingTable}
          isShowColumnStt
          onRowClick={(id: number) => {
            router.push({
              pathname: `${MENU_URL.APPROVE_MAINTENANCE_PLAN}/[id]`,
              query: {
                id,
              },
            })
          }}
        />
      </div>
    </PageContainer>
  )
}
