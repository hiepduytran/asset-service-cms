import { CoreButton } from '@/components/atoms/CoreButton'
import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import CoreInput from '@/components/atoms/CoreInput'
import PageContainer from '@/components/organism/PageContainer'
import { MENU_URL } from '@/routes'
import { Grid } from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'
import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import { useOperateList } from './useOperateList'
import { CoreDatePicker } from '@/components/atoms/CoreDatePicker'
import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import { EvaluateAsset } from '@/enum'
import { getShiftList } from '@/service/hrm/getListShift'
import { getAssetList } from '@/service/asset/asset/getList'
import { TableWithDropdown } from '@/components/organism/TableWithDropdown'
import { getListStage } from '@/service/manu/getListStage'
import { getListProductionRequest } from '@/service/manu/getListProductionRequest'

export default function OperateList() {
  const router = useRouter()

  const [values, handles] = useOperateList()
  const {
    methodForm,
    isLoadingTable,
    columns,
    tableData,
    data,
    columnsChild,
    dataChild,
    isLoadingChild,
  } = values
  const { control } = methodForm

  const {
    t,
    onSubmit,
    onReset,
    onChangePageSize,
    refetch,
    handleFetchDataChild,
  } = handles
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
      <div className='flex flex-col'>
        <form onSubmit={onSubmit} className='flex flex-col p-5'>
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
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <CoreAutoCompleteAPI
                control={control}
                name='asset'
                label={t('asset')}
                placeholder=''
                valuePath='id'
                labelPath='name'
                fetchDataFn={getAssetList}
                hasAllOption
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <CoreAutoCompleteAPI
                control={control}
                name='stage'
                label={t('stage')}
                placeholder={t('placeholder.stage')}
                valuePath='id'
                labelPath='name'
                fetchDataFn={getListStage}
                params={{
                  isActive: true,
                }}
                hasAllOption
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <CoreAutoCompleteAPI
                control={control}
                name='shift'
                label={t('shift')}
                placeholder={t('placeholder.shift')}
                valuePath='id'
                labelPath='name'
                fetchDataFn={getShiftList}
                hasAllOption
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <CoreAutoCompleteAPI
                control={control}
                name='productionRequest'
                label={t('productionRequest')}
                placeholder={t('placeholder.productionRequest')}
                valuePath='id'
                labelPath='code'
                fetchDataFn={getListProductionRequest}
                hasAllOption
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <CoreDatePicker
                control={control}
                name='start'
                label={t('start')}
                placeholder='dd/mm/yyyy'
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <CoreDatePicker
                control={control}
                name='end'
                label='Đến'
                placeholder='dd/mm/yyyy'
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <CoreAutocomplete
                control={control}
                name='evaluateAsset'
                label={t('evaluateAsset')}
                options={[
                  { value: null, label: t('common:all') },
                  ...EvaluateAsset,
                ]}
              />
            </Grid>
          </Grid>

          <div className='flex justify-center mt-10 gap-10'>
            <CoreButton onClick={onReset} theme='reset'>
              {t('common:btn.reset')}
            </CoreButton>
            <CoreButton theme='submit' type='submit'>
              {t('common:btn.search')}
            </CoreButton>
          </div>
        </form>

        <div className='flex justify-end'>
          <CoreButton onClick={() => router.push(`${MENU_URL.OPERATE}/addNew`)}>
            {t('common:btn.add')}
          </CoreButton>
        </div>
        <div className='py-5'>
          <TableWithDropdown
            tableName='operate'
            tableNameChild='operateChild'
            columns={columns}
            data={tableData}
            {...data}
            isLoading={isLoadingTable}
            isShowColumnStt
            onChangePageSize={onChangePageSize}
            columnsChild={columnsChild}
            dataChild={dataChild}
            isLoadingChild={isLoadingChild}
            handleFetchDataChild={handleFetchDataChild}
            tabName={t('detail_operate')}
            onRowClick={(id: number) => {
              router.push({
                pathname: `${MENU_URL.OPERATE}/[id]`,
                query: {
                  id,
                  actionType: 'VIEW',
                },
              })
            }}
            objectShowDropdown={{
              header: t('parameter'),
              fieldName: 'parameter',
            }}
          />
        </div>
      </div>
    </PageContainer>
  )
}
