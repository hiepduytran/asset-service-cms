import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import CoreInput from '@/components/atoms/CoreInput'

import { CoreTable } from '@/components/organism/CoreTable'
import PageContainer from '@/components/organism/PageContainer'
import { Dashboard } from '@mui/icons-material'
import { Grid, IconButton } from '@mui/material'
import { stateTypes } from '../utils'
import useSelfMaintenanceFollow from './useSelfMaintenanceFollow'
import { CoreButton } from '@/components/atoms/CoreButton'

export default function SelfMaintenanceFollow() {
  const [
    {
      methods,
      router,
      isView,
      isUpdate,
      columns,
      tableData,
      isLoadingListMaintenanceCard,
      page,
    },
    {
      t,
      onSubmit,
      onReset,
      onChangePageSize,
      onRowClick,
      generateSelfMaintenanceTicket,
    },
  ] = useSelfMaintenanceFollow()

  const { control } = methods
  return (
    <PageContainer
      title={
        <CoreBreadcrumbs
          breadcrumbs={[
            { title: t('title') },
            { title: t('self_maintenance.title') },
            { title: t('self_maintenance.self_maintenance_follow.title') },
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
                label={t('search')}
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
                label={t('state')}
                placeholder={`${t('self_maintenance.standard_declare.state')}`}
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <div className='flex justify-center mt-10 gap-10'>
              <CoreButton onClick={onReset} theme='reset'>
                Reset
              </CoreButton>
              <CoreButton
                theme='submit'
                type='submit'
                loading={isLoadingListMaintenanceCard}
              >
                {t('common:btn.search')}
              </CoreButton>
            </div>
          </Grid>
          <Grid item xs={12}>
            <CoreButton onClick={generateSelfMaintenanceTicket} theme='submit'>
              {t(
                'self_maintenance.self_maintenance_follow.generateSelfMaintenanceTicket'
              )}
            </CoreButton>
          </Grid>
        </form>
        <CoreTable
          tableName='ListMaintenanceCard'
          columns={columns}
          data={tableData}
          isShowColumnStt
          onChangePageSize={onChangePageSize}
          onRowClick={onRowClick}
          isLoading={isLoadingListMaintenanceCard}
          {...page}
        />
      </div>
    </PageContainer>
  )
}
