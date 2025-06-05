import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import { CoreButton } from '@/components/atoms/CoreButton'
import CoreInput from '@/components/atoms/CoreInput'
import { CoreTable } from '@/components/organism/CoreTable'
import PageContainer from '@/components/organism/PageContainer'
import { MENU_URL } from '@/routes'
import { Grid } from '@mui/material'
import useAssetStatusManagement from './useAssetStatusManagement'

export default function AssetStatusManagement() {
  const [
    {
      methods,
      router,
      columns,
      dataTable,
      isLoadingGetListAssetStatusManagement,
      page,
    },
    { t, onSubmit, onChangePageSize, onReset },
  ] = useAssetStatusManagement()

  const { control } = methods
  return (
    <PageContainer
      title={
        <CoreBreadcrumbs
          breadcrumbs={[
            {
              title: t('title'),
            },
          ]}
        />
      }
    >
      <div className='flex flex-col' onSubmit={onSubmit}>
        <form className='flex flex-col p-5'>
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
            <Grid
              item
              xs={12}
              sm={12}
              md={4}
              lg={4}
              className='flex items-end  gap-10'
            >
              <CoreButton theme='reset' onClick={onReset}>
                {t('common:btn.reset')}
              </CoreButton>
              <CoreButton theme='submit' type='submit'>
                {t('common:btn.search')}
              </CoreButton>
            </Grid>
          </Grid>

          <div className='flex justify-end mt-10 gap-10'>
            <CoreButton
              onClick={() => {
                router.push(`${MENU_URL.ASSET_STATUS_MANAGEMENT}/addNew`)
              }}
              theme='submit'
            >
              {t('common:btn.add')}
            </CoreButton>
          </div>
          <div className='py-5'>
            <CoreTable
              tableName=''
              columns={columns}
              data={dataTable}
              isLoading={isLoadingGetListAssetStatusManagement}
              isShowColumnStt
              onChangePageSize={onChangePageSize}
              onRowClick={(id) => {
                router.push({
                  pathname: `${MENU_URL.ASSET_STATUS_MANAGEMENT}/[id]`,
                  query: { id: id, actionType: 'VIEW' },
                })
              }}
              {...page}
            />
          </div>
        </form>
      </div>
    </PageContainer>
  )
}
