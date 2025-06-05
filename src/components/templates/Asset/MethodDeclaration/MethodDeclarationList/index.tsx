import { CoreButton } from '@/components/atoms/CoreButton'
import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import CoreInput from '@/components/atoms/CoreInput'
import { CoreTable } from '@/components/organism/CoreTable'
import PageContainer from '@/components/organism/PageContainer'
import { WHITE } from '@/helper/colors'
import { MENU_URL } from '@/routes'
import { Dashboard } from '@mui/icons-material'
import { Grid, IconButton, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'
import { useMethodDeclaration } from './useMethodDeclaration'
import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import { getGroupStandardList } from '@/service/asset/standardDeclaration/getList'

export default function MethodDeclarationList() {
  const [values, handles] = useMethodDeclaration()

  const { methodForm, columns, tableData, data, isLoadingTable } = values
  const { control, setValue } = methodForm

  const { t, onSubmit, onChangePageSize, onReset } = handles
  const router = useRouter()
  return (
    <PageContainer
      title={
        <CoreBreadcrumbs
          breadcrumbs={[
            {
              title: t('title.maintenance'),
            },
            {
              title: t('title.config'),
            },
            {
              title: t('title.method_declaration'),
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
              <CoreAutoCompleteAPI
                control={control}
                name='groupStandard'
                label={t('table.standardGroup')}
                placeholder={t('placeholder.groupStandard')}
                fetchDataFn={getGroupStandardList}
                onChangeValue={(value) => {
                  setValue('groupStandardId', value?.id)
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <CoreAutocomplete
                control={control}
                name='isActive'
                label={t('table.status')}
                placeholder={`${t('placeholder.status')}`}
                options={[
                  { label: 'Tất cả', value: null },
                  { label: 'Active', value: true },
                  { label: 'Inactive', value: false },
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
          <CoreButton
            onClick={() => router.push(`${MENU_URL.METHOD_DECLARATION}/addNew`)}
          >
            {t('common:btn.add')}
          </CoreButton>
        </div>

        <CoreTable
          tableName='methodDeclaration'
          columns={columns}
          data={tableData}
          onChangePageSize={onChangePageSize}
          {...data}
          isLoading={isLoadingTable}
          isShowColumnStt
          onRowClick={(id: number) => {
            router.push({
              pathname: `${MENU_URL.METHOD_DECLARATION}/[id]`,
              query: {
                id,
                actionType: 'VIEW',
              },
            })
          }}
        />
      </div>
    </PageContainer>
  )
}
