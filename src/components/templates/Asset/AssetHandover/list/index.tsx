import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import { CoreButton } from '@/components/atoms/CoreButton'
import { CoreDatePicker } from '@/components/atoms/CoreDatePicker'
import CoreInput from '@/components/atoms/CoreInput'
import PageContainer from '@/components/organism/PageContainer'
import { TableWithDropdown } from '@/components/organism/TableWithDropdown'
import { WHITE } from '@/helper/colors'
import { MENU_URL } from '@/routes'
import { Grid } from '@mui/material'
import { useRouter } from 'next/router'
import { useAssetHandover } from './useAssetHandover'

export default function RequestAllocationList() {
  const router = useRouter()
  const [
    {
      methods,
      isLoadingTable,
      columns,
      tableData,
      data,
      columnsChild,
      dataChild,
      isLoadingChild,
    },
    { t, onReset, onSubmit, onChangePageSize, handleFetchDataChild },
  ] = useAssetHandover()
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
          className='flex flex-col py-10 px-5'
          style={{
            backgroundColor: WHITE,
            borderRadius: 20,
          }}
        >
          <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={4}>
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
            <Grid item xs={4}>
              <CoreAutocomplete
                control={control}
                name='allocationChooseType'
                label={t('label.handoverTarget')}
                inputProps={{
                  maxLength: 50,
                }}
                options={[
                  {
                    value: null,
                    label: `${t('common:all')}`,
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
            <Grid item xs={4}>
              <CoreDatePicker
                control={control}
                name='updateDate'
                label={t('label.handoverDate')}
                placeholder='DD/MM/YYYY'
              />
            </Grid>
            <Grid item xs={4}>
              <CoreAutocomplete
                control={control}
                name='status'
                label={t('label.statusOfRequest')}
                options={[
                  {
                    value: null,
                    label: `${t('common:all')}`,
                  },
                  {
                    value: 'TRANSFER',
                    label: `${t('text.TRANSFER')}`,
                  },
                  {
                    value: 'NOT_TRANSFER',
                    label: `${t('text.NOT_TRANSFER')}`,
                  },
                  {
                    value: 'ONE_PART_TRANSFER',
                    label: `${t('text.ONE_PART_TRANSFER')}`,
                  },
                ]}
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
              onClick={() => router.push(`${MENU_URL.ASSET_HANDOVER}/addNew`)}
            >
              {t('common:btn.add')}
            </CoreButton>
          </div>
        </div>
        <TableWithDropdown
          tableName='requestAllocation'
          tableNameChild='requestAllocationChild'
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
          tabName={t('table.title_child')}
          onRowClick={(id: number) => {
            router.push({
              pathname: `${MENU_URL.ASSET_HANDOVER}/[id]`,
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
    </PageContainer>
  )
}
