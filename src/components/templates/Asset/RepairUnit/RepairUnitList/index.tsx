import { CoreButton } from '@/components/atoms/CoreButton'
import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import CoreInput from '@/components/atoms/CoreInput'
import PageContainer from '@/components/organism/PageContainer'
import { WHITE } from '@/helper/colors'
import { MENU_URL } from '@/routes'
import { Grid, Menu, MenuItem } from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'
import { useRepairUnitList } from './useRepairUnitList'
import { TableWithDropdown } from '@/components/organism/TableWithDropdown'

export default function RepairUnitList() {
  const [values, handles] = useRepairUnitList()
  const { methodForm, columns, tableData, data, isLoadingTable, anchorEl, open, columnsChild, dataChild, isLoadingChild, } = values
  const { t, onSubmit, onChangePageSize, onReset, handleSelect, setAnchorEl, handleFetchDataChild } = handles
  const { control } = methodForm
  const router = useRouter()

  return (
    <PageContainer
      title={
        <CoreBreadcrumbs
          breadcrumbs={[
            {
              title: t('title.repairUnit'),
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
        <div className='flex justify-end my-10'>
          <CoreButton onClick={handleSelect}>
            {t('common:btn.add')}
          </CoreButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={() => {
              setAnchorEl(null)
            }}
          >
            <MenuItem
              sx={{ color: '#0078D4', borderBottom: '1px solid #DFE0EB' }}
              onClick={() => {
                router.push({
                  pathname: `${MENU_URL.REPAIR_UNIT}/addNew`,
                  query: {
                    type: 'AVAILABLE',
                  },
                })
              }}>
              Đơn vị có sẵn
            </MenuItem>
            <MenuItem
              sx={{ color: '#0078D4' }}
              onClick={() => {
                router.push({
                  pathname: `${MENU_URL.REPAIR_UNIT}/addNew`,
                  query: {
                    type: 'NEW',
                  },
                })
              }}>
              Đơn vị mới
            </MenuItem>
          </Menu>
        </div>

        <TableWithDropdown
          tableName='repairUnit'
          tableNameChild='repairUnitChild'
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
          tabName={t('title.assetDetailsInCharge')}
          onRowClick={(id: number) => {
            router.push({
              pathname: `${MENU_URL.REPAIR_UNIT}/[id]`,
              query: {
                id,
                actionType: 'VIEW',
              },
            })
          }}
          objectShowDropdown={{
            header: t('table.asset'),
            fieldName: 'product',
          }}
        />
      </div>
    </PageContainer>
  )
}
