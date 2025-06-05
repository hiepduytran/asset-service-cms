import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import CoreInput from '@/components/atoms/CoreInput'
import PageContainer from '@/components/organism/PageContainer'
import { Grid } from '@mui/material'
import React from 'react'

import { MENU_URL } from '@/routes'
import { CoreTable } from '@/components/organism/CoreTable'
import useSelfMaintenanceForm from './useSelfMaintenanceForm'
import { stateTypes } from '../utils'
import { CoreButton } from '@/components/atoms/CoreButton'

export default function SelfMaintenanceForm() {
  const [
    {
      methods,
      router,
      isView,
      isUpdate,
      columns,
      tableData,
      isLoadingMaintenancesCardData,
      page,
    },
    { t, onSubmit, onReset, onChangePageSize, onRowClick },
  ] = useSelfMaintenanceForm()

  const { control } = methods
  return (
    <PageContainer
      title={
        <CoreBreadcrumbs
          breadcrumbs={[
            { title: t('title') },
            { title: t('self_maintenance.title') },
            { title: t('self_maintenance.self_maintenance_form.title') },
          ]}
        />
      }
    >
      <div className='flex flex-col'>
        <form onSubmit={onSubmit}>
          <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={12} sm={12} md={6}>
              <CoreInput
                name='search'
                control={control}
                label={t('search')}
                placeholder={t('search_option')}
                inputProps={{
                  maxLength: 50,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <CoreAutocomplete
                name='state'
                control={control}
                valuePath='value'
                labelPath='label'
                options={stateTypes}
                label={t('state')}
                placeholder={`${t('self_maintenance.standard_declare.state')}`}
              />
            </Grid>

            <Grid item xs={12}>
              <div className='flex justify-center mt-10 gap-10'>
                <CoreButton onClick={onReset} theme='reset'>
                  {t('common:btn.reset')}
                </CoreButton>
                <CoreButton
                  theme='submit'
                  type='submit'
                  loading={isLoadingMaintenancesCardData}
                >
                  {t('common:btn.search')}
                </CoreButton>
              </div>
            </Grid>
          </Grid>

          <div className='py-4 flex justify-end gap-4 items-center'>
            <CoreButton
              onClick={() =>
                router.push(
                  `${MENU_URL.MAINTENANCE.SELF_MAINTENANCE.SELF_MAINTENANCE_FORM}/addNew`
                )
              }
            >
              {t('common:btn.add')}
            </CoreButton>
          </div>
        </form>
        <CoreTable
          tableName=''
          columns={columns}
          data={tableData}
          isShowColumnStt
          isLoading={isLoadingMaintenancesCardData}
          onChangePageSize={onChangePageSize}
          onRowClick={onRowClick}
          {...page}
        />
      </div>
    </PageContainer>
  )
}
