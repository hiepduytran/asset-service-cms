import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import { CoreButton } from '@/components/atoms/CoreButton'
import { CoreDatePicker } from '@/components/atoms/CoreDatePicker'
import CoreInput from '@/components/atoms/CoreInput'
import { CoreTable } from '@/components/organism/CoreTable'
import PageContainer from '@/components/organism/PageContainer'
import { TableWithDropdown } from '@/components/organism/TableWithDropdown'
import { MENU_URL } from '@/routes'
import { getAllDepartment } from '@/service/asset/requestAllocation/getList'
import { getEmployeeListByDepartmentId } from '@/service/resource/getEmployeeListByDepartmentId'
import { Grid, Typography } from '@mui/material'
import Image from 'next/image'
import DownUrl from 'src/assets/svg/caretDown.svg'
import { MenuItemAssetUseHistory } from '../components/MenuItem'
import useAssetUseHistory from './useAssetUseHistory'

export default function AssetUseHistory() {
  const [
    {
      methods,
      dataTableIdentity,
      pageIdentity,
      columnsIdentity,
      isLoadingAssetHistoryList,
      columnsIdentityChild,
      columnsTime,
      dataTableIdentityChild,
      isLoadingChild,
      dataTableTime,
      pageTime,
      isLoadingAssetHistoryListTime,
      anchorEl,
      dataOrg,
    },

    {
      t,
      onSubmit,
      onReset,
      onChangePageSize,
      setAnchorEl,
      convertAround,
      fetchDataChild,
    },
  ] = useAssetUseHistory()
  const { watch, control, setValue, reset } = methods
  return (
    <PageContainer
      title={
        <CoreBreadcrumbs
          breadcrumbs={[
            {
              title: t('title'),
              pathname: MENU_URL.ASSET_USE_HISTORY,
            },
          ]}
        />
      }
    >
      <form className='flex flex-col' onSubmit={onSubmit}>
        <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12} sm={12} md={3}>
            <CoreInput
              name='search'
              control={control}
              label={t('common:form.search.label')}
              placeholder={t('common:form.search.placeholder')}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <CoreDatePicker
              name='startDate'
              control={control}
              label={'Ngày bắt đầu'}
              placeholder='DD/MM/YYYY'
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <CoreDatePicker
              name='endDate'
              control={control}
              label={'Ngày kết thúc'}
              placeholder='DD/MM/YYYY'
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <CoreAutocomplete
              name='status'
              control={control}
              options={[
                {
                  value: 'INITIAL_ASSET',
                  label: 'Cấp phát đầu kỳ',
                },
                {
                  value: 'REQUEST_ALLOCATION',
                  label: 'Yêu cầu cấp phát',
                },
                {
                  value: 'ASSET_RETRIEVAL',
                  label: 'Thu hồi tài sản',
                },
                {
                  value: 'ASSET_TRANSFER',
                  label: 'Bàn giao',
                },
                {
                  value: 'INCIDENT_RECORDING',
                  label: 'Ghi nhận sự cố',
                },
              ]}
              label={t('Trạng thái')}
              placeholder={`${t('Chọn trạng thái')}`}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <CoreAutocomplete
              name='org'
              control={control}
              options={dataOrg}
              labelPath='name'
              valuePath='id'
              label={t('label.org')}
              placeholder={`${t('placeholder.org')}`}
              returnValueType='option'
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <CoreAutoCompleteAPI
              name='department'
              control={control}
              fetchDataFn={getAllDepartment}
              label={t('label.department')}
              placeholder={t('placeholder.department')}
              defaultValue={{
                name: 'Tất cả',
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <CoreAutoCompleteAPI
              name='employee'
              control={control}
              fetchDataFn={getEmployeeListByDepartmentId}
              label={t('label.employee')}
              placeholder={t('placeholder.employee')}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <CoreAutocomplete
              name='status'
              control={control}
              options={[
                {
                  value: null,
                  label: `${t('Tất cả')}`,
                },
                {
                  label: 'Bình thường',
                  value: 'NORMAL',
                },
                {
                  label: 'Hỏng',
                  value: 'BROKEN',
                },
              ]}
              label={t('Tình trạng')}
              placeholder={`${t('Chọn tình trạng')}`}
            />
          </Grid>
        </Grid>
        <div className='flex justify-center mt-10 mb-10 gap-10'>
          <CoreButton onClick={onReset} theme='reset'>
            Reset
          </CoreButton>
          <CoreButton theme='submit' type='submit'>
            {t('common:btn.search')}
          </CoreButton>
        </div>

        <div className='flex justify-end items-center gap-4 py-8'>
          <Typography>Chiều: </Typography>
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
                label: 'Mã định danh',
                value: 'IDENTITY',
              },
              {
                label: 'Thời gian',
                value: 'TIME',
              },
            ]}
            onItemAction={(item) => {
              reset()
              setValue('around', item.value)
              setAnchorEl(null)
            }}
            currentValue={watch('around')}
          />
        </div>

        {watch('around') === 'TIME' && (
          <Grid item xs={12}>
            <CoreTable
              tableName='assetUseHistory'
              columns={columnsTime}
              data={dataTableTime}
              isShowColumnStt
              onChangePageSize={onChangePageSize}
              isLoading={isLoadingAssetHistoryListTime}
              {...pageTime}
            />
          </Grid>
        )}
        {watch('around') === 'IDENTITY' && (
          <Grid item xs={12}>
            <TableWithDropdown
              tabName='Chi tiết đối tượng sử dụng'
              tableName='assetUseHistory'
              columns={columnsIdentity}
              data={dataTableIdentity}
              isShowColumnStt={true}
              onChangePageSize={onChangePageSize}
              {...pageIdentity}
              objectShowDropdown={{
                header: '',
                fieldName: 'dropDown',
              }}
              columnsChild={columnsIdentityChild}
              dataChild={dataTableIdentityChild}
              handleFetchDataChild={fetchDataChild}
              isShowDropdown={true}
              isLoadingChild={isLoadingChild}
              isLoading={isLoadingAssetHistoryList}
            />
          </Grid>
        )}
      </form>
    </PageContainer>
  )
}
