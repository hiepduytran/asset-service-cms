import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import { CoreButton } from '@/components/atoms/CoreButton'
import { CoreDatePicker } from '@/components/atoms/CoreDatePicker'
import CoreInput from '@/components/atoms/CoreInput'
import PageContainer from '@/components/organism/PageContainer'
import { MENU_URL } from '@/routes'
import { Grid, Typography } from '@mui/material'
import Image from 'next/image'
import DownUrl from 'src/assets/svg/caretDown.svg'
import { MenuItemAssetUseHistory } from '../../AssetUseHistory/components/MenuItem'
import { CoreTableDamagedAssetManagement } from '../components/tableCustom'
import { TableWithDropdownDamagedAssetManagement } from '../components/tableCustomDropDown'
import useDamagedAssetManagement from './useDamagedAssetManagement'
import { convertAround } from '@/enum'

export default function DamagedAssetManagement() {
  const [
    {
      methods,
      isUpdate,
      isView,
      dataCheckbox,
      page,
      columnsIdentity,
      dataTableIdentity,
      isLoadingIncidentRecordingManageList,
      // columnsTime,
      // dataTableTime,
      // columnsIncidentLog,
      // dataTableIncidentLog,
      // columnsIncidentLogChild,
      // fetchDataChild,
      // isLoadingChild,
      // dataTableIncidentChild,
      anchorEl,
    },

    { t, onSubmit, onChangePageSize, setAnchorEl, onReset },
  ] = useDamagedAssetManagement()
  const { watch, control, setValue, getValues } = methods
  return (
    <PageContainer
      title={
        <CoreBreadcrumbs
          breadcrumbs={[
            {
              title: t('title'),
              pathname: MENU_URL.DAMAGED_ASSET_MANAGEMENT,
            },
          ]}
        />
      }
    >
      <form className='flex flex-col' onSubmit={onSubmit}>
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
              label={'Ngày cập nhật'}
              placeholder='DD/MM/YYYY'
            />
          </Grid>

          <Grid item xs={12} sm={12} md={4}>
            <CoreAutocomplete
              name=''
              control={control}
              options={[]}
              label={'Mã tài sản'}
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

        <div className='flex justify-end items-center mt-10 gap-8'>
          <CoreButton
            theme='submit'
            onClick={() => {}}
            disabled={!(dataCheckbox.length > 0)}
          >
            Yêu cầu thanh lý
          </CoreButton>
          <CoreButton
            theme='submit'
            type='submit'
            disabled={!(dataCheckbox.length > 0)}
          >
            Lập kế hoạch sửa chữa/bảo hành
          </CoreButton>
        </div>

        <div className='flex justify-end items-center gap-4 py-8'>
          <Typography>Chiều: </Typography>
          <div
            className='flex gap-4 items-center cursor-pointer'
            onClick={(e) => setAnchorEl(e.currentTarget)}
          >
            <Typography>{convertAround(watch('around') ?? '')}</Typography>
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
              // {
              //   label: 'Thời gian',
              //   value: 'TIME',
              // },
              {
                label: 'Mã định danh',
                value: 'IDENTITY',
              },
              // {
              //   label: 'Ghi nhận sự cố',
              //   value: 'INCIDENT_LOG',
              // },
            ]}
            onItemAction={(item) => {
              setValue('around', item.value)
              setAnchorEl(null)
            }}
            currentValue={watch('around')}
          />
        </div>

        {/* {watch('around') === 'TIME' && (
          <Grid item xs={12}>
            <CoreTableDamagedAssetManagement
              tableName='damagedAssetManagement'
              columns={columnsTime}
              data={dataTableTime}
              isShowColumnStt
              onChangePageSize={onChangePageSize}
              {...page}
            />
          </Grid>
        )} */}
        {watch('around') === 'IDENTITY' && (
          <Grid item xs={12}>
            <CoreTableDamagedAssetManagement
              tableName='damagedAssetManagement'
              columns={columnsIdentity}
              data={dataTableIdentity}
              isLoading={isLoadingIncidentRecordingManageList}
              isShowColumnStt
              onChangePageSize={onChangePageSize}
              {...page}
            />
          </Grid>
        )}
        {/* {watch('around') === 'INCIDENT_LOG' && (
          <Grid item xs={12}>
            <TableWithDropdownDamagedAssetManagement
              tabName='Chi tiết đối tượng sử dụng'
              tableName='damagedAssetManagement'
              columns={columnsIncidentLog}
              data={dataTableIncidentLog}
              isShowColumnStt
              onChangePageSize={onChangePageSize}
              {...page}
              objectShowDropdown={{
                header: 'Số lượng',
                fieldName: 'quantity',
              }}
              columnsChild={columnsIncidentLogChild}
              dataChild={dataTableIncidentChild}
              handleFetchDataChild={fetchDataChild}
              isShowDropdown={true}
              isLoadingChild={isLoadingChild}
              isLoading={false}
              isShowCheckBox={true}
            />
          </Grid>
        )} */}
      </form>
    </PageContainer>
  )
}
