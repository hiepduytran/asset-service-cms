import { CoreButton } from '@/components/atoms/CoreButton'
import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import CoreInput from '@/components/atoms/CoreInput'
import PageContainer from '@/components/organism/PageContainer'
import { WHITE } from '@/helper/colors'
import { MENU_URL } from '@/routes'
import { Grid } from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'
import { useInitialAllocatedAssetsList } from './useInitialAllocatedAssetsList'
import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import { TableWithDropdown } from '@/components/organism/TableWithDropdown'
import { CoreDatePicker } from '@/components/atoms/CoreDatePicker'
import { typeOfInitialAllocation } from '@/enum'

export default function InitialAllocatedAssetsList() {
  const router = useRouter()

  const [values, handles] = useInitialAllocatedAssetsList()

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
  const { control, watch } = methodForm

  const { t, onReset, onSubmit, onChangePageSize, handleFetchDataChild } =
    handles
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
        <form
          onSubmit={onSubmit}
          className='flex flex-col p-5'
          style={{
            backgroundColor: WHITE,
            borderRadius: 20,
          }}
        >
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
              <CoreDatePicker
                control={control}
                name='requestDate'
                label={t('label.updateDate')}
                placeholder='dd/mm/yyyy'
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <CoreDatePicker
                control={control}
                name='desiredAllocationDate'
                label={t('label.allocateDate')}
                placeholder='dd/mm/yyyy'
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <CoreAutocomplete
                control={control}
                name='chooseType'
                label={t('table.object')}
                options={typeOfInitialAllocation}
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
        <div className='flex justify-end'>
          <CoreButton
            onClick={() =>
              router.push(`${MENU_URL.INITIAL_ALLOCATED_ASSETS}/addNew`)
            }
          >
            {t('common:btn.add')}
          </CoreButton>
        </div>
        <div className='py-5'>
          <TableWithDropdown
            tableName='allocation'
            tableNameChild='allocationChild'
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
            tabName={t('issuedAssetDetails')}
            onRowClick={(id: number) => {
              router.push({
                pathname: `${MENU_URL.INITIAL_ALLOCATED_ASSETS}/[id]`,
                query: {
                  id,
                  actionType: 'VIEW',
                },
              })
            }}
            objectShowDropdown={{
              header: t('table.quantity'),
              fieldName: 'quantity',
            }}
          />
        </div>
      </div>
    </PageContainer>
  )
}
