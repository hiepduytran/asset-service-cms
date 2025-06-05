import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import { CoreButton } from '@/components/atoms/CoreButton'
import CoreInput from '@/components/atoms/CoreInput'
import { CoreTable } from '@/components/organism/CoreTable'
import PageContainer from '@/components/organism/PageContainer'
import { MENU_URL } from '@/routes'
import { Dashboard } from '@mui/icons-material'
import { Grid, IconButton } from '@mui/material'
import { stateTypes } from '../utils'
import useSelfMaintenanceApproval from './useSelfMaintenanceApproval'

export default function SelfMaintenanceApproval() {
  const [
    { methods, router, isView, isUpdate, columns, tableData, data, isFetching },
    { t, onSubmit, onReset, onChangePageSize },
  ] = useSelfMaintenanceApproval()

  const { control } = methods
  return (
    <PageContainer
      title={
        <CoreBreadcrumbs
          breadcrumbs={[
            { title: t('title') },
            { title: t('self_maintenance.title') },
            { title: t('self_maintenance.self_maintenance_approval.title') },
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
          {...data}
          data={tableData}
          isShowColumnStt
          onChangePageSize={onChangePageSize}
          isLoading={isFetching}
          onRowClick={(id: number, e) => {
            router.push({
              pathname: `${MENU_URL.MAINTENANCE.SELF_MAINTENANCE.SELF_MAINTENANCE_APPROVAL}/[id]`,
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
