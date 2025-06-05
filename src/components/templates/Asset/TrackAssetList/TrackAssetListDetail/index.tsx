import { CoreButton } from '@/components/atoms/CoreButton'
import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import CoreInput from '@/components/atoms/CoreInput'
import PageContainer from '@/components/organism/PageContainer'
import { WHITE } from '@/helper/colors'
import { Grid } from '@mui/material'
import React from 'react'
import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import { CoreDatePicker } from '@/components/atoms/CoreDatePicker'
import { CoreTable } from '@/components/organism/CoreTable'
import { useTrackAssetListDetail } from './useTrackAssetListDetail'
import { MENU_URL } from '@/routes'

export default function TrackAssetListDetail(props: {
  allocationChooseType: string
}) {
  const { allocationChooseType } = props

  const [values, handles] = useTrackAssetListDetail(props)
  const { methodForm, isLoadingTable, columns, tableData, data, code } = values
  const { control } = methodForm

  const { t, onReset, onSubmit, onChangePageSize } = handles

  return (
    <PageContainer
      title={
        <CoreBreadcrumbs
          breadcrumbs={[
            {
              title:
                allocationChooseType === 'DEPARTMENT'
                  ? t('department')
                  : t('staff'),
              pathname:
                allocationChooseType === 'DEPARTMENT'
                  ? `${MENU_URL.TRACK_ASSET_LIST_DEPARTMENT}`
                  : `${MENU_URL.TRACK_ASSET_LIST_EMPLOYEE}`,
            },
            {
              title: code,
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
              <CoreAutocomplete
                control={control}
                name='allocationChooseType'
                label={t('table.source')}
                options={[]}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <CoreDatePicker
                control={control}
                name='date'
                label={t('table.allocateDate')}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <CoreAutocomplete
                control={control}
                name='status'
                label={t('table.status')}
                options={[]}
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
        <div className='py-5'>
          <CoreTable
            columns={columns}
            data={tableData}
            {...data}
            isLoading={isLoadingTable}
            isShowColumnStt
            onChangePageSize={onChangePageSize}
          />
        </div>
      </div>
    </PageContainer>
  )
}
