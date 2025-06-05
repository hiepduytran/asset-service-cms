import { CoreButton } from '@/components/atoms/CoreButton'
import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import CoreInput from '@/components/atoms/CoreInput'
import PageContainer from '@/components/organism/PageContainer'
import { BLUE, WHITE } from '@/helper/colors'
import { MENU_URL } from '@/routes'
import { Dashboard } from '@mui/icons-material'
import { Box, Grid, IconButton, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'
import { useAssetPeriodList } from './useAssetPeriodList'
import TableCustom from './TableCustom'

export default function AssetPeriodList() {
  const router = useRouter()

  const [values, handles] = useAssetPeriodList()

  const { methodForm, tableData, isLoadingTable } = values
  const { control } = methodForm

  const { t, onSubmit, onChangePageSize, onReset } = handles
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
              title: t('title.asset_period'),
              pathname: MENU_URL.ASSET_PERIOD,
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

        <div className='py-4 flex justify-end'>
          <div className='py-4 flex justify-end'>
            <CoreButton
              onClick={() => router.push(`${MENU_URL.ASSET_PERIOD}/addNew`)}
            >
              {t('common:btn.add')}
            </CoreButton>
          </div>
        </div>

        <TableCustom
          data={tableData?.content ?? []}
          {...tableData}
          onChangePageSize={onChangePageSize}
          t={t}
          onRowClick={(id: number, e) => {
            router.push({
              pathname: `${MENU_URL.ASSET_PERIOD}/[id]`,
              query: {
                id,
                actionType: 'VIEW',
              },
            })
          }}
          isLoading={isLoadingTable}
        />
      </div>
    </PageContainer>
  )
}
