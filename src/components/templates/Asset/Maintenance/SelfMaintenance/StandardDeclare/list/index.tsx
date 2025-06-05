import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import PageContainer from '@/components/organism/PageContainer'
import React from 'react'
import useStandardDeclare from './useStandardDeclare'
import { Grid, IconButton } from '@mui/material'
import CoreInput from '@/components/atoms/CoreInput'
import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import { CoreTable } from '@/components/organism/CoreTable'
import { MENU_URL } from '@/routes'

import { Dashboard } from '@mui/icons-material'
import { stateTypes } from '../utils'
import { CoreButton } from '@/components/atoms/CoreButton'

export default function StandardDeclare() {
  const [
    {
      methods,
      router,
      isView,
      isUpdate,
      columns,
      tableData,
      isLoadingStandardMaintenanceData,
      page,
    },
    { t, onSubmit, onReset, onChangePageSize, onRowClick },
  ] = useStandardDeclare()

  const { control } = methods
  return (
    <PageContainer
      title={
        <CoreBreadcrumbs
          breadcrumbs={[
            { title: t('title') },
            { title: t('self_maintenance.title') },
            { title: t('self_maintenance.standard_declare.title') },
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
          </Grid>
          <Grid item xs={12}>
            <div className='flex justify-center mt-10 gap-10'>
              <CoreButton onClick={onReset} theme='reset'>
                {t('common:btn.reset')}
              </CoreButton>
              <CoreButton
                theme='submit'
                type='submit'
                loading={isLoadingStandardMaintenanceData}
              >
                {t('common:btn.search')}
              </CoreButton>
            </div>
          </Grid>

          <div className='py-4 flex justify-end gap-4 items-center'>
            <CoreButton
              onClick={() =>
                router.push(
                  `${MENU_URL.MAINTENANCE.SELF_MAINTENANCE.STANDARD_DECLARE}/addNew`
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
          onChangePageSize={onChangePageSize}
          onRowClick={onRowClick}
          isLoading={isLoadingStandardMaintenanceData}
          {...page}
        />
      </div>
    </PageContainer>
  )
}
