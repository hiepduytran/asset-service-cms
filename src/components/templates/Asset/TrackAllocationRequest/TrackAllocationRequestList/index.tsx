import { CoreButton } from '@/components/atoms/CoreButton'
import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import CoreInput from '@/components/atoms/CoreInput'
import PageContainer from '@/components/organism/PageContainer'
import { WHITE } from '@/helper/colors'
import { MENU_URL } from '@/routes'
import { Grid } from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'
import { useTrackAllocationRequestList } from './useTrackAllocationRequestList'
import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import { CoreDatePicker } from '@/components/atoms/CoreDatePicker'
import { TableWithDropdown } from '@/components/organism/TableWithDropdown'

export default function TrackAllocationRequestList() {
  const router = useRouter()
  const [values, handles] = useTrackAllocationRequestList()
  const {
    methods,
    isLoadingTable,
    columns,
    tableData,
    data,
    columnsChild,
    dataChild,
    isLoadingChild,
    optionState,
  } = values
  const { control } = methods
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
          className='flex flex-col'
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
                label={t('label.requestDate')}
                placeholder='DD/MM/YYYY'
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <CoreDatePicker
                control={control}
                name='desiredAllocationDate'
                label={t('label.desiredDate')}
                placeholder='DD/MM/YYYY'
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <CoreAutocomplete
                control={control}
                name='allocationChooseType'
                label={t('label.allocation_object')}
                labelPath='label'
                valuePath='value'
                options={[
                  {
                    value: null,
                    label: `${t('text.ALL')}`,
                  },
                  {
                    value: 'ORGANIZATION',
                    label: `${t('text.ORGANIZATION')}`,
                  },
                  {
                    value: 'DEPARTMENT',
                    label: `${t('text.DEPARTMENT')}`,
                  },
                  {
                    value: 'EMPLOYEE',
                    label: `${t('text.EMPLOYEE')}`,
                  },
                ]}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <CoreAutocomplete
                control={control}
                name='status'
                label={t('label.status')}
                valuePath='value'
                labelPath='label'
                disableClearable
                options={optionState}
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

          <div className='flex justify-end mt-10 mb-10'>
            <CoreButton
              theme='submit'
              onClick={() => {
                router.push(`${MENU_URL.REQUEST_ALLOCATION}/addNew`)
              }}
            >
              {t('common:btn.add')}
            </CoreButton>
          </div>
        </form>
        <TableWithDropdown
          tableName='trackAllocationRequest'
          tableNameChild='trackAllocationRequestChild'
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
          tabName={t('detailTitle')}
          onRowClick={(id: number) => {
            router.push({
              pathname: `${MENU_URL.TRACK_ALLOCATION_REQUEST}/[id]`,
              query: {
                id,
                actionType: 'VIEW',
              },
            })
          }}
          objectShowDropdown={{
            header: t('table.quantity'),
            fieldName: 'requestQuantity',
          }}
        />
      </div>
    </PageContainer>
  )
}
