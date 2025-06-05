import { CoreButton } from '@/components/atoms/CoreButton'
import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import CoreInput from '@/components/atoms/CoreInput'
import PageContainer from '@/components/organism/PageContainer'
import { WHITE } from '@/helper/colors'
import { MENU_URL } from '@/routes'
import { FormControl, Grid, MenuItem, Select, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'
import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import { TableWithDropdown } from '@/components/organism/TableWithDropdown'
import { CoreDatePicker } from '@/components/atoms/CoreDatePicker'
import { SourceOfTrackAssetList } from '@/enum'
import { useTrackAssetList } from '@/components/templates/Asset/TrackAssetList/TrackAssetList/useTrackAssetList'
import { CoreTable } from '@/components/organism/CoreTable'

export default function TrackAssetList(props: {
  allocationChooseType: string
}) {
  const router = useRouter()

  const [values, handles] = useTrackAssetList(props)
  const { allocationChooseType } = props
  const {
    viewType,
    methodForm,
    isLoadingTable,
    columns,
    tableData,
    data,
    columnsChild,
    dataChild,
    isLoadingChild,
    isLoadingTableIdentifierCode,
    columnsIdentifierCode,
    tableDataIdentifierCode,
    dataIdentifierCode,
  } = values
  const { control } = methodForm

  const { t, onReset, onSubmit, onChangePageSize, handleFetchDataChild } =
    handles

  return (
    <PageContainer
      title={
        <CoreBreadcrumbs
          breadcrumbs={[
            {
              title: (
                <div className='flex gap-3 items-center'>
                  <Typography>
                    {allocationChooseType === 'DEPARTMENT'
                      ? t('department')
                      : t('staff')}
                  </Typography>
                </div>
              ),
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
                name='categoryId'
                label={t('table.assetCategory')}
                options={[{ value: null, label: t('common:all') }]}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <CoreAutocomplete
                control={control}
                name='sourceEnum'
                label={t('table.allocateSource')}
                options={SourceOfTrackAssetList}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <CoreDatePicker
                control={control}
                name='date'
                label={t('table.allocateDate')}
                placeholder='dd/mm/yyyy'
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
        <div className='flex justify-end items-center gap-2'>
          <Typography>Chiều:</Typography>
          <FormControl variant='standard'>
            <Select value={viewType} disableUnderline sx={{ color: '#0078D4' }}>
              <MenuItem
                value='ASSET_CODE'
                onClick={() => {
                  router.push({
                    pathname:
                      allocationChooseType === 'DEPARTMENT'
                        ? MENU_URL.TRACK_ASSET_LIST_DEPARTMENT
                        : MENU_URL.TRACK_ASSET_LIST_EMPLOYEE,
                  })
                }}
                sx={{ color: '#0078D4' }}
              >
                {t('table.assetCode')}
              </MenuItem>
              <MenuItem
                value='IDENTIFIER_CODE'
                onClick={() => {
                  router.push({
                    pathname:
                      allocationChooseType === 'DEPARTMENT'
                        ? MENU_URL.TRACK_ASSET_LIST_DEPARTMENT
                        : MENU_URL.TRACK_ASSET_LIST_EMPLOYEE,
                    query: {
                      view: 'IDENTIFIER_CODE',
                    },
                  })
                }}
                sx={{ color: '#0078D4' }}
              >
                {t('table.identifierCode')}
              </MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className='py-5'>
          {viewType === 'ASSET_CODE' ? (
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
              paramKeys={['id', 'assetAllocationIds']}
              tabName={t('detailTitle')}
              objectShowDropdown={{
                header: t('table.assetQuantity'),
                fieldName: 'assetQuantity',
              }}
              onRowClickChild={(id, data) => {
                router.push({
                  pathname:
                    allocationChooseType === 'DEPARTMENT'
                      ? `${MENU_URL.TRACK_ASSET_LIST_DEPARTMENT}/[id]`
                      : `${MENU_URL.TRACK_ASSET_LIST_EMPLOYEE}/[id]`,
                  query: { id, code: data?.code },
                })
              }}
            />
          ) : (
            <CoreTable
              columns={columnsIdentifierCode}
              data={tableDataIdentifierCode}
              {...dataIdentifierCode}
              isLoading={isLoadingTableIdentifierCode}
              isShowColumnStt
              onChangePageSize={onChangePageSize}
            />
          )}
        </div>
      </div>
    </PageContainer>
  )
}
