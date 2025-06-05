import { CoreButton } from '@/components/atoms/CoreButton'
import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import CoreInput from '@/components/atoms/CoreInput'
import PageContainer from '@/components/organism/PageContainer'
import { WHITE } from '@/helper/colors'
import { MENU_URL } from '@/routes'
import { Grid } from '@mui/material'
import React from 'react'
import { useRecoveryList } from './useRecoveryList'
import { TableWithDropdown } from '@/components/organism/TableWithDropdown'
import { CoreDatePicker } from '@/components/atoms/CoreDatePicker'
import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'

export default function RecoveryList() {
  const [
    {
      router,
      methods,
      page,
      isLoadingRecoveryList,
      columns,
      tableData,
      columnsChild,
      dataChild,
      isLoadingChild,
    },
    { t, onReset, onSubmit, onChangePageSize, handleFetchDataChild },
  ] = useRecoveryList()

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
                label={t('Đối tượng cấp phát')}
                placeholder={`${t('Chọn đối tượng cấp phát')}`}
                options={[
                  {
                    label: t('common:all'),
                    value: null,
                  },
                  {
                    label: t('table.organization'),
                    value: 'ORGANIZATION',
                  },
                  {
                    label: t('table.department'),
                    value: 'DEPARTMENT',
                  },
                  {
                    label: t('table.employee'),
                    value: 'EMPLOYEE',
                  },
                ]}
                returnValueType='enum'
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <CoreDatePicker
                control={control}
                name='requestDate'
                label={t('table.requestDate')}
                placeholder={'DD/MM/YYYY'}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <CoreDatePicker
                control={control}
                name='desiredAllocationDate'
                label={t('table.updateDate')}
                placeholder={'DD/MM/YYYY'}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <CoreAutocomplete
                control={control}
                name='status'
                label={t('table.allocationStatus')}
                placeholder={`${t('common:form.search.placeholder')}`}
                options={[
                  {
                    label: t('common:all'),
                    value: null,
                  },
                  {
                    label: t('table.quantityRecall'),
                    value: 'RECALLED',
                  },
                  {
                    label: t('table.notReclaimed'),
                    value: 'NOT_RECALL',
                  },
                  {
                    label: t('table.partiallyReclaimed'),
                    value: 'ONE_PART_RECALL',
                  },
                ]}
                returnValueType='enum'
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
          <CoreButton
            onClick={() => router.push(`${MENU_URL.RECOVERY}/addNew`)}
          >
            {t('common:btn.add')}
          </CoreButton>
        </div>
        <div className='py-5'>
          <TableWithDropdown
            tableName='recovery'
            tableNameChild='recoveryChild'
            columns={columns}
            data={tableData}
            {...page}
            isLoading={isLoadingRecoveryList}
            isShowColumnStt
            onChangePageSize={onChangePageSize}
            columnsChild={columnsChild}
            dataChild={dataChild}
            isLoadingChild={isLoadingChild}
            handleFetchDataChild={handleFetchDataChild}
            tabName={t('reclaimedAssetDetails')}
            onRowClick={(id: number) => {
              router.push({
                pathname: `${MENU_URL.RECOVERY}/[id]`,
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
