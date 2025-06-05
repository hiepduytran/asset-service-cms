import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import { CoreButton } from '@/components/atoms/CoreButton'
import { CoreDatePicker } from '@/components/atoms/CoreDatePicker'
import CoreInput from '@/components/atoms/CoreInput'
import { CoreTable } from '@/components/organism/CoreTable'
import PageContainer from '@/components/organism/PageContainer'
import { TableWithDropdown } from '@/components/organism/TableWithDropdown'
import { convertAround } from '@/enum'
import { MENU_URL } from '@/routes'
import { Grid, Typography } from '@mui/material'
import Image from 'next/image'
import DownUrl from 'src/assets/svg/caretDown.svg'
import { MenuItemAssetUseHistory } from '../../AssetUseHistory/components/MenuItem'
import useIncidentLogList from './useIncidentLogList'
import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import { getListCodes } from '@/service/asset/allocation/save/getListAsset'

export default function IncidentLogList() {
  const [
    {
      methods,
      router,
      columnsIdentity,
      dataTableIdentity,
      isLoadingIncidentLogLisIdentity,
      pageIdentity,
      columnsTime,
      dataTableTime,
      isLoadingIncidentLogListTime,
      pageTime,
      columnsTimeChild,
      dataTableTimeChild,
      isLoadingChild,
      anchorEl,
      defaultValues,
    },
    {
      t,
      onSubmit,
      onReset,
      onChangePageSize,
      setAnchorEl,
      fetchDataChild,
      setQueryPage,
    },
  ] = useIncidentLogList()
  const { control, watch, setValue, getValues, reset } = methods
  return (
    <PageContainer
      title={
        <CoreBreadcrumbs
          breadcrumbs={[
            {
              title: t('title'),
              pathname: MENU_URL.INCIDENT_LOG_LIST,
            },
          ]}
        />
      }
    >
      <form className='flex flex-col' onSubmit={onSubmit}>
        {getValues('around') === 'IDENTITY' && (
          <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={12} sm={12} md={4}>
              <CoreInput
                name='search'
                control={control}
                label={t('common:form.search.label')}
                placeholder={t('common:form.search.placeholder')}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <CoreAutocomplete
                name='source'
                control={control}
                options={[
                  { label: `${t('text.ALL')}`, value: null },
                  { label: `${t('text.MANUAL')}`, value: 'MANUAL' },
                  { label: `${t('text.RECOVER')}`, value: 'RECOVER' },
                  { label: `${t('text.TRANSFER')}`, value: 'TRANSFER' },
                ]}
                label={t('label.source')}
                returnValueType='enum'
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <CoreDatePicker
                name='date'
                control={control}
                label={t('label.date')}
                placeholder='DD/MM/YYYY'
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <CoreAutoCompleteAPI
                name='asset'
                control={control}
                fetchDataFn={getListCodes}
                labelPath='code'
                label={t('label.assetCode')}
                placeholder={t('placeholder.assetCode')}
                onChangeValue={(value) => {
                  setValue('assetId', value?.id)
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <CoreAutocomplete
                name='recordConditionType'
                control={control}
                options={[
                  { label: `${t('text.ALL')}`, value: null },
                  { label: `${t('text.NORMAL')}`, value: 'NORMAL' },
                  { label: `${t('text.BROKEN')}`, value: 'BROKEN' },
                ]}
                label={t('label.recordConditionType')}
                returnValueType='enum'
              />
            </Grid>
          </Grid>
        )}
        {getValues('around') === 'TIME' && (
          <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={12} sm={12} md={4}>
              <CoreInput
                name='search'
                control={control}
                label={t('common:btn.search')}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <CoreDatePicker
                name='date'
                control={control}
                label={t('label.date')}
                placeholder='DD/MM/YYYY'
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <CoreAutoCompleteAPI
                name='asset'
                control={control}
                fetchDataFn={getListCodes}
                labelPath='code'
                label={t('label.assetCode')}
                placeholder={t('placeholder.assetCode')}
                onChangeValue={(value) => {
                  setValue('assetId', value?.id)
                }}
              />
            </Grid>
          </Grid>
        )}
        <div className='flex justify-center mt-10 mb-10 gap-10'>
          <CoreButton onClick={onReset} theme='reset'>
            Reset
          </CoreButton>
          <CoreButton theme='submit' type='submit'>
            {t('common:btn.search')}
          </CoreButton>
        </div>

        <div className='py-4 flex justify-end gap-8'>
          <div className='flex items-center gap-4'>
            <Typography>{`${'text.around'}`}: </Typography>
            <div
              className='flex gap-4 items-center cursor-pointer'
              onClick={(e) => setAnchorEl(e.currentTarget)}
            >
              <Typography>{convertAround(watch('around'))}</Typography>
              <Image src={DownUrl} alt='' />
            </div>
            <MenuItemAssetUseHistory
              classes={{
                root: 'mt-4',
              }}
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
              itemList={[
                {
                  label: `${t("text.IDENTITY")}`,
                  value: 'IDENTITY',
                },
                {
                  label:  `${t("text.TIME")}`,
                  value: 'TIME',
                },
              ]}
              onItemAction={(item) => {
                setValue('around', item.value)
                setQueryPage({ search: '', date: '', page: 0, size: 10 })
                reset({ ...defaultValues, around: item.value })
                setAnchorEl(null)
              }}
              currentValue={watch('around')}
            />
          </div>
          <CoreButton
            onClick={() => router.push(`${MENU_URL.INCIDENT_LOG_LIST}/addNew`)}
          >
            {t('common:btn.add')}
          </CoreButton>
        </div>

        {getValues('around') === 'IDENTITY' && (
          <Grid item xs={12}>
            <CoreTable
              tableName='incidentLogList'
              columns={columnsIdentity}
              data={dataTableIdentity}
              isShowColumnStt
              onChangePageSize={onChangePageSize}
              isLoading={isLoadingIncidentLogLisIdentity}
              onRowClick={(id, row) => {
                router.push({
                  pathname: `${MENU_URL.INCIDENT_LOG_LIST}/[id]`,
                  query: {
                    id: id,
                    actionType: 'VIEW',
                  },
                })
              }}
              {...pageIdentity}
            />
          </Grid>
        )}

        {getValues('around') === 'TIME' && (
          <Grid item xs={12}>
            <TableWithDropdown
              tableName='incidentLogList'
              tabName={`${t("text.detailAssetError")}`}
              columns={columnsTime}
              data={dataTableTime}
              isShowColumnStt
              onChangePageSize={onChangePageSize}
              {...pageTime}
              objectShowDropdown={{
                header: 'Số lượng',
                fieldName: 'quantity',
              }}
              columnsChild={columnsTimeChild}
              dataChild={dataTableTimeChild}
              handleFetchDataChild={fetchDataChild}
              isLoadingChild={isLoadingChild}
              isLoading={isLoadingIncidentLogListTime}
              onRowClick={(id, row) => {
                router.push({
                  pathname: `${MENU_URL.INCIDENT_LOG_LIST}/[id]`,
                  query: {
                    id: id,
                    actionType: 'VIEW',
                  },
                })
              }}
            />
          </Grid>
        )}
      </form>
    </PageContainer>
  )
}
