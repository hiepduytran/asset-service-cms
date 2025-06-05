import { CoreButton } from '@/components/atoms/CoreButton'
import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import CoreInput from '@/components/atoms/CoreInput'
import PageContainer from '@/components/organism/PageContainer'
import { WHITE } from '@/helper/colors'
import { MENU_URL } from '@/routes'
import { Box, FormControl, Grid, MenuItem, Select, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'
import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import { TableWithDropdown } from '@/components/organism/TableWithDropdown'
import { CoreDatePicker } from '@/components/atoms/CoreDatePicker'
import { SourceOfTrackAssetList } from '@/enum'
import { CoreTable } from '@/components/organism/CoreTable'
import { useAllocatedAssetList } from './useAllocatedAssetList'
import CoreLoading from '@/components/molecules/CoreLoading'

export default function AllocatedAssetList() {
  const router = useRouter()
  const [values, handles] = useAllocatedAssetList()
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
    cardData,
    isLoadingCard,
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
              title: t('allocatedAsset'),
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
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <CoreAutocomplete
                control={control}
                name='allocationTarget'
                label={t('table.allocationTarget')}
                options={[{ value: null, label: t('common:all') }]}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <CoreAutocomplete
                control={control}
                name='status'
                label={t('table.status')}
                options={[{ value: null, label: t('common:all') }]}
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
        <Grid container spacing={{ xs: 1, sm: 2, md: 3 }} sx={{
          paddingY: '20px'
        }}>
          {
            isLoadingCard ? (<CoreLoading />) : (
              <>
                <Grid item xs={12} sm={12} md={3} lg={3}>
                  <Box sx={{
                    border: '1px solid #DFE0EB',
                    borderRadius: '2px',
                    boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.25)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    gap: '20px',
                    paddingY: '20px',
                    fontWeight: 400,
                    fontSize: '12px'
                  }}>
                    <Typography sx={{ color: '#0078D4', fontWeight: 700, fontSize: '24px' }}>
                      {cardData?.totalAllocationAsset}
                    </Typography>
                    <Typography sx={{ color: '#242424' }}>
                      {t('totalAllocatedAssets')}
                    </Typography>
                    <Typography sx={{ color: '#747474', fontStyle: 'italic' }}>
                      {t('includingQuantityNonReclaimableAssets', {
                        quantity: cardData?.nonAllocationAsset
                      })}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={3} lg={3}>
                  <Box sx={{
                    border: '1px solid #DFE0EB',
                    borderRadius: '2px',
                    boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.25)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    gap: '20px',
                    paddingY: '20px',
                    fontWeight: 400,
                    fontSize: '12px'
                  }}>
                    <Typography sx={{ color: '#0078D4', fontWeight: 700, fontSize: '24px' }}>
                      {cardData?.allocationAssetOrg}
                    </Typography>
                    <Typography sx={{ color: '#242424' }}>
                      {t('allocatingToOrganization')}
                    </Typography>
                    <Typography sx={{ color: '#747474', fontStyle: 'italic' }}>
                      {t('includingQuantityNonReclaimableAssets', {
                        quantity: cardData?.nonAllocationAssetOrg
                      })}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={3} lg={3}>
                  <Box sx={{
                    border: '1px solid #DFE0EB',
                    borderRadius: '2px',
                    boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.25)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    gap: '20px',
                    paddingY: '20px',
                    fontWeight: 400,
                    fontSize: '12px'
                  }}>
                    <Typography sx={{ color: '#0078D4', fontWeight: 700, fontSize: '24px' }}>
                      {cardData?.allocationAssetDepartment}
                    </Typography>
                    <Typography sx={{ color: '#242424' }}>
                      {t('allocatingToDepartment')}
                    </Typography>
                    <Typography sx={{ color: '#747474', fontStyle: 'italic' }}>
                      {t('includingQuantityNonReclaimableAssets', {
                        quantity: cardData?.nonAllocationAssetDepartment
                      })}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={3} lg={3}>
                  <Box sx={{
                    border: '1px solid #DFE0EB',
                    borderRadius: '2px',
                    boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.25)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    gap: '20px',
                    paddingY: '20px',
                    fontWeight: 400,
                    fontSize: '12px'
                  }}>
                    <Typography sx={{ color: '#0078D4', fontWeight: 700, fontSize: '24px' }}>
                      {cardData?.allocationAssetEmployee}
                    </Typography>
                    <Typography sx={{ color: '#242424' }}>
                      {t('allocatingToStaff')}
                    </Typography>
                    <Typography sx={{ color: '#747474', fontStyle: 'italic' }}>
                      {t('includingQuantityNonReclaimableAssets', {
                        quantity: cardData?.nonAllocationAssetEmployee
                      })}
                    </Typography>
                  </Box>
                </Grid>
              </>
            )
          }
        </Grid>
        <div className='flex justify-end items-center gap-2'>
          <Typography>Chiều:</Typography>
          <FormControl variant='standard'>
            <Select value={viewType} disableUnderline sx={{ color: '#0078D4' }}>
              <MenuItem
                value='ASSET_CODE'
                onClick={() => {
                  router.push({
                    pathname: MENU_URL.ALLOCATED_ASSET_LIST,
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
                    pathname: MENU_URL.ALLOCATED_ASSET_LIST,
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
              tabName={t('allocationIdentifierDetails')}
              objectShowDropdown={{
                header: t('table.allocateQuantity'),
                fieldName: 'allocateQuantity',
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
    </PageContainer >
  )
}
