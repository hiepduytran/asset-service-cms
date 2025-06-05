import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import { CoreButton } from '@/components/atoms/CoreButton'
import CoreInput from '@/components/atoms/CoreInput'
import PageContainer from '@/components/organism/PageContainer'
import { TableWithDropdown } from '@/components/organism/TableWithDropdown'
import { optionPlanType } from '@/enum'
import { WHITE } from '@/helper/colors'
import { MENU_URL } from '@/routes'
import { Grid } from '@mui/material'
import { useRouter } from 'next/router'
import { useImplementMaintenancePlanList } from './useImplementMaintenancePlanList'

export default function ImplementMaintenancePlanList() {
  const router = useRouter()

  const [
    {
      methods,
      tableData,
      isLoadingImplementMaintenancePlanList,
      isLoadingChild,
      columns,
      columnsChild,
      tableDataChild,
      page,
      dataImplementMaintenancePlanList,
    },
    { t, onSubmit, onChangePageSize, onReset, fetchDataChild },
  ] = useImplementMaintenancePlanList()

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
              title: t('title.maintenance_plan'),
            },
            {
              title: t('title.implement_maintenance_plan'),
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
                name='planType'
                label={t('label.planType')}
                options={optionPlanType(t)}
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

        <TableWithDropdown
          columns={columns}
          columnsChild={columnsChild}
          data={tableData}
          dataChild={tableDataChild}
          handleFetchDataChild={fetchDataChild}
          isShowDropdown={true}
          tabName={t('text.detail_maintenance')}
          isLoadingChild={isLoadingChild}
          objectShowDropdown={{
            header: t('tableChild.planType'),
            fieldName: 'totalAssets',
          }}
          onChangePageSize={onChangePageSize}
          isLoading={isLoadingImplementMaintenancePlanList}
          isShowColumnStt
          onRowClickChild={(idChild: number) => {
            router.push({
              pathname: `${MENU_URL.IMPLEMENT_MAINTENANCE_PLAN}/[id]`,
              query: { id: idChild },
            })
          }}
          {...page}
        />
      </div>
    </PageContainer>
  )
}
