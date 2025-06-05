import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import { CoreButton } from '@/components/atoms/CoreButton'
import CoreInput from '@/components/atoms/CoreInput'
import { CoreTable } from '@/components/organism/CoreTable'
import PageContainer from '@/components/organism/PageContainer'
import { WHITE } from '@/helper/colors'
import { MENU_URL } from '@/routes'
import { getListPartner } from '@/service/resource/getPartner'
import { Grid, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useParamAssetList } from './useParamAssetList'

export default function ParamAssetList() {
  const router = useRouter()

  const [values, handles] = useParamAssetList()

  const {
    methodForm,
    columns,
    tableData,
    totalPages,
    size,
    page,
    isLoadingTable,
  } = values
  const { control } = methodForm

  const { t, onSubmit, onChangePageSize, onReset } = handles
  return (
    <PageContainer
      title={
        <CoreBreadcrumbs
          breadcrumbs={[
            {
              title: t('text.parameter_asset'),
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
              <CoreAutoCompleteAPI
                control={control}
                name='partner'
                label={t('label.partner')}
                placeholder={t('placeholder.partner')}
                valuePath='id'
                labelPath='name'
                params={{
                  activated: true,
                }}
                fetchDataFn={getListPartner}
                hasAllOption
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

        <div className='py-4 flex justify-end'>
          <div className='py-4 flex justify-end'>
            <CoreButton
              onClick={() => router.push(`${MENU_URL.PARAM_ASSET}/addNew`)}
            >
              {t('common:btn.add')}
            </CoreButton>
          </div>
        </div>

        <CoreTable
          tableName='paramAsset'
          columns={columns}
          data={tableData}
          onChangePageSize={onChangePageSize}
          paginationHidden={tableData.length < 1}
          totalPages={totalPages}
          page={page}
          size={size}
          isLoading={isLoadingTable}
          isShowColumnStt
          onRowClick={(id: number) => {
            router.push({
              pathname: `${MENU_URL.PARAM_ASSET}/[id]`,
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
