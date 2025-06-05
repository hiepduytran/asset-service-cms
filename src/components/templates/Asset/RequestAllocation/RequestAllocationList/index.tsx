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
import { useRequestAllocationList } from './useRequestAllocationList'

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
  ] = useRequestAllocationList()
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
                label={t('label.allocationChooseType')}
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
                label={t('label.status') ?? undefined}
                valuePath='value'
                labelPath='label'
                options={[
                  { value: null, label: t('common:all') },
                  { value: 'APPROVED', label: t('text.APPROVED') },
                  { value: 'PENDING', label: t('text.PENDING') },
                  { value: 'REJECTED', label: t('text.REJECTED') },
                  { value: 'TERMINATE', label: t('text.TERMINATE') },
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
              onClick={() =>
                router.push(`${MENU_URL.REQUEST_ALLOCATION}/addNew`)
              }
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
          tabName={t('Chi tiết tài sản cấp phát')}
          onRowClick={(id: number) => {
            router.push({
              pathname: `${MENU_URL.REQUEST_ALLOCATION}/[id]`,
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
