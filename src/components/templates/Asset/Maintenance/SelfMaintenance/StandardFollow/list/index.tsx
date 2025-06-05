import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import PageContainer from '@/components/organism/PageContainer'
import { Dashboard } from '@mui/icons-material'
import { Grid, IconButton } from '@mui/material'
import React from 'react'
import useStandardFollow from './useStandardFollow'
import CoreInput from '@/components/atoms/CoreInput'
import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'

import { CoreTable } from '@/components/organism/CoreTable'
import { stateTypes } from '../../utils'
import { CoreButton } from '@/components/atoms/CoreButton'

export default function StandardFollow() {
  const [
    { methods, columns, tableData, isLoading, page },
    { t, onSubmit, onReset, onChangePageSize, onRowClick },
  ] = useStandardFollow()
  const { control } = methods

  return (
    <PageContainer
      title={
        <CoreBreadcrumbs
          breadcrumbs={[
            { title: t('title') },
            { title: t('self_maintenance.title') },
            { title: t('self_maintenance.standard_follow.title') },
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
                label={t('common:form.search.label')}
                placeholder={t('common:form.search.placeholder')}
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
                label={t('self_maintenance.standard_follow.label.status')}
                placeholder={`${t(
                  'self_maintenance.standard_follow.placeholder.status'
                )}`}
              />
            </Grid>
          </Grid>
          <div className='flex justify-center mt-15'>
            <div className='m-5'>
              <CoreButton theme='reset' onClick={onReset}>
                Reset
              </CoreButton>
            </div>
            <div className='m-5'>
              <CoreButton theme='submit' type='submit' loading={isLoading}>
                {t('common:btn.search')}
              </CoreButton>
            </div>
          </div>

          <div className='py-4 flex justify-end gap-4 items-center'></div>
        </form>
        <CoreTable
          tableName=''
          columns={columns}
          data={tableData}
          isShowColumnStt
          onChangePageSize={onChangePageSize}
          onRowClick={onRowClick}
          {...page}
          isLoading={isLoading}
        />
      </div>
    </PageContainer>
  )
}
