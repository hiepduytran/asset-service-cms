import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import { CoreButton } from '@/components/atoms/CoreButton'
import CoreInput from '@/components/atoms/CoreInput'
import PageContainer from '@/components/organism/PageContainer'
import { TableWithDropdown } from '@/components/organism/TableWithDropdown'
import { WHITE } from '@/helper/colors'
import { Grid } from '@mui/material'
import { useTrackMaintenancePartAllocationList } from './useTrackMaintenancePartAllocationList'

export default function TrackMaintenancePartAllocationList() {
  const [
    {
      methods,
      tableData,
      isLoadingPlanMaintenanceAllocation,
      isLoadingChild,
      optionStatus,
      page,
      columns,
      columnsChild,
      tableDataChild,
    },
    { t, onSubmit, onChangePageSize, onReset, fetchDataChild },
  ] = useTrackMaintenancePartAllocationList()

  const { control } = methods

  return (
    <PageContainer
      title={
        <CoreBreadcrumbs
          breadcrumbs={[
            {
              title: t('title.maintenance'),
            },
            {
              title: t('title.plan_maintenance'),
            },
            {
              title: t('title.allocation_follow'),
            },
          ]}
        />
      }
    >
      <div className='flex flex-col'>
        <form
          onSubmit={onSubmit}
          className='flex flex-col py-10 px-5 mb-10'
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
                name='status'
                label={t('label.status')}
                options={optionStatus}
              />
            </Grid>
          </Grid>
          <div className='flex mt-10 items-end justify-center gap-10'>
            <CoreButton onClick={onReset} theme='reset'>
              Reset
            </CoreButton>
            <CoreButton theme='submit' type='submit'>
              {t('common:btn.search')}
            </CoreButton>
          </div>
        </form>

        <TableWithDropdown
          columns={columns}
          columnsChild={columnsChild}
          data={tableData}
          dataChild={tableDataChild}
          handleFetchDataChild={fetchDataChild}
          isShowDropdown={true}
          tabName={`${t('text.detail_maintenance')}`}
          isLoadingChild={isLoadingChild}
          objectShowDropdown={{
            header: t('maintenanceAccessory'),
            fieldName: 'maintenanceAccessory',
          }}
          onChangePageSize={onChangePageSize}
          isLoading={isLoadingPlanMaintenanceAllocation}
          isShowColumnStt
          {...page}
        />
      </div>
    </PageContainer>
  )
}
