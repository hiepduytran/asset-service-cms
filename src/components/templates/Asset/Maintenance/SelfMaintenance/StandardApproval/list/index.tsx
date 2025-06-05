import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import CoreInput from '@/components/atoms/CoreInput'
import { CoreTable } from '@/components/organism/CoreTable'
import PageContainer from '@/components/organism/PageContainer'
import { MENU_URL } from '@/routes'
import { Grid } from '@mui/material'
import React from 'react'
import useStandardApproval from './useStandardApproval'
import { stateTypes } from '../utils'
import { CoreButton } from '@/components/atoms/CoreButton'

export default function StandardApproval() {
  const [
    { methods, router, columns, tableData, isFetching, data },
    { t, onSubmit, onReset, onChangePageSize },
  ] = useStandardApproval()

  const { control } = methods
  return (
    <PageContainer
      title={
        <CoreBreadcrumbs
          breadcrumbs={[
            { title: t('label.maintenance') },
            { title: t('label.selfMaintenance') },
            { title: t('title') },
          ]}
        />
      }
    >
      <div className='flex flex-col'>
        <form onSubmit={onSubmit} className='flex flex-col py-10 px-5'>
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
                options={stateTypes}
                label={t('label.state')}
              />
            </Grid>
            <Grid item xs={12}>
              <div className='flex justify-center mt-10 gap-10'>
                <CoreButton onClick={onReset} theme='reset'>
                  {t('common:btn.reset')}
                </CoreButton>
                <CoreButton theme='submit' type='submit' loading={isFetching}>
                  {t('common:btn.search')}
                </CoreButton>
              </div>
            </Grid>
          </Grid>
        </form>

        <CoreTable
          tableName=''
          columns={columns}
          data={tableData}
          {...data}
          isShowColumnStt
          onChangePageSize={onChangePageSize}
          isLoading={isFetching}
          onRowClick={(id: number, e) => {
            router.push({
              pathname: `${MENU_URL.MAINTENANCE.SELF_MAINTENANCE.STANDARD_APPROVAL}/[id]`,
              query: {
                id,
                actionType: 'VIEW',
              },
            })
          }}
        />
      </div>
    </PageContainer>
  )
}
