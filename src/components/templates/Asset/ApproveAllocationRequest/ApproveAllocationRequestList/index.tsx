import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import { CoreButton } from '@/components/atoms/CoreButton'
import { CoreDatePicker } from '@/components/atoms/CoreDatePicker'
import CoreInput from '@/components/atoms/CoreInput'
import { CoreTable } from '@/components/organism/CoreTable'
import PageContainer from '@/components/organism/PageContainer'
import { WHITE } from '@/helper/colors'
import { MENU_URL } from '@/routes'
import { Grid } from '@mui/material'
import { useRouter } from 'next/router'
import { useApproveAllocationRequestList } from './useApproveAllocationRequest'

export default function ApproveAllocationRequestList() {
  const router = useRouter()

  const [values, handles] = useApproveAllocationRequestList()

  const { methods, columns, tableData, page, isLoadingTable } = values
  const { control } = methods

  const { t, onSubmit, onChangePageSize, onReset } = handles
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
          className='flex flex-col py-10 px-5 mb-10'
          style={{
            backgroundColor: WHITE,
            borderRadius: 20,
          }}
        >
          <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={12} sm={12} md={4}>
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
            <Grid item xs={12} sm={12} md={4}>
              <CoreDatePicker
                control={control}
                name='requestDate'
                label={t('label.requestDate')}
                placeholder='DD/MM/YYYY'
              />
            </Grid>

            <Grid item xs={12} sm={12} md={4}>
              <CoreDatePicker
                control={control}
                name='desiredAllocationDate'
                label={t('label.desiredDate')}
                placeholder='DD/MM/YYYY'
              />
            </Grid>

            <Grid item xs={12} sm={12} md={4}>
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
            <Grid item xs={12} sm={12} md={4}>
              <CoreAutocomplete
                control={control}
                name='status'
                label={t('label.status')}
                valuePath='value'
                labelPath='label'
                disableClearable
                options={[
                  { value: null, label: t('common:all') },
                  { value: 'APPROVED', label: t('text.approval') },
                  { value: 'PENDING', label: t('text.pending_approval') },
                  { value: 'REJECTED', label: t('text.reject') },
                  { value: 'TERMINATE', label: t('text.cancel') },
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

        <CoreTable
          tableName='asset'
          columns={columns}
          data={tableData}
          onChangePageSize={onChangePageSize}
          isLoading={isLoadingTable}
          isShowColumnStt
          onRowClick={(id: number) => {
            router.push({
              pathname: `${MENU_URL.APPROVE_ALLOCATION_REQUEST}/[id]`,
              query: {
                id: id,
                actionType: 'VIEW',
              },
            })
          }}
          {...page}
        />
      </div>
    </PageContainer>
  )
}
