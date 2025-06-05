import {
  Box,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableProps,
  TableRow,
  Typography,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import RowItem from './RowItem'
import EmptyIcon from '@/components/icons/EmptyIcon'
import CoreLoading from '@/components/molecules/CoreLoading'
import { difference, map } from 'lodash'
import { MaintenanceForecasting } from '@/service/asset/maintenanceForecasting/type'
import CoreTablePagination from '@/components/organism/CoreTablePagination'

type Props = {
  t: any
  data: MaintenanceForecasting[]
  page?: number
  size?: number
  totalPages?: number
  isLoading: boolean
  onChangePageSize: (val: any) => void
  forecastingCheckedTable: any
  setForecastingCheckedTable: any
}

const CustomTable = styled(Table)<TableProps>(() => ({
  border: '1px solid #DFE0EB',
  '& td': {
    padding: '12px',
    '&.font-bold': {
      fontWeight: 500,
    },
  },
  '& th': {
    padding: '12px',
    fontWeight: 600,
  },
}))

const TableCustom = (props: Props) => {
  const {
    t,
    data,
    page,
    size,
    totalPages,
    isLoading,
    onChangePageSize,
    forecastingCheckedTable,
    setForecastingCheckedTable,
  } = props

  const notPlannedYetData = data.filter((item) => item?.status === 'NOT_PLANED')
  const listForecastingIds = map(notPlannedYetData, 'id')
  const listForecastingCheckedTableIds = map(forecastingCheckedTable, 'id')
  return (
    <Box className='overflow-auto px-5'>
      <CustomTable>
        <TableHead>
          <TableRow className='bg-[#F6F7F9]'>
            <TableCell className='w-10'>
              <Checkbox
                size='small'
                checked={
                  data.length > 0 ? (difference(listForecastingIds, listForecastingCheckedTableIds).length === 0) : false
                }
                onChange={(e, checked) => {
                  if (checked) {
                    const newData = notPlannedYetData.filter(
                      (v: any) =>
                        !listForecastingCheckedTableIds.includes(v?.id)
                    )

                    setForecastingCheckedTable((prev: any) => [
                      ...prev,
                      ...newData,
                    ])
                  } else {
                    setForecastingCheckedTable((prev: any) =>
                      prev.filter(
                        (v: any) => !listForecastingIds.includes(v.id)
                      )
                    )
                  }
                }}
              />
            </TableCell>
            <TableCell className='w-10'>STT</TableCell>
            <TableCell>{t('table.productCode')}</TableCell>
            <TableCell>{t('table.asset')}</TableCell>
            <TableCell>{t('table.department')}</TableCell>
            <TableCell>{t('table.maintenanceDate')}</TableCell>
            <TableCell>{t('table.accessory')}</TableCell>
            <TableCell>{t('table.status')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={8} variant='body'>
                <div className='flex justify-center min-h-[60px]'>
                  <CoreLoading />
                </div>
              </TableCell>
            </TableRow>
          ) : data?.length > 0 ? (
            data?.map((item, index) => {
              return (
                <RowItem
                  key={item?.id}
                  row={item}
                  index={index}
                  forecastingCheckedTable={forecastingCheckedTable}
                  setForecastingCheckedTable={setForecastingCheckedTable}
                />
              )
            })
          ) : (
            <TableRow>
              <TableCell
                colSpan={8}
                variant='body'
                align='center'
                className='py-8'
              >
                <div className='flex justify-center min-h-[60px] flex-col'>
                  <EmptyIcon />

                  <Typography variant='body2'>
                    Không tìm thấy dữ liệu nào!
                  </Typography>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </CustomTable>
      <div className='py-5'>
        {!isLoading && !!data?.length && (
          <CoreTablePagination
            size={size ?? 1}
            page={page ?? 1}
            totalPages={totalPages ?? 1}
            onChangePagination={(val: any) =>
              onChangePageSize && onChangePageSize(val)
            }
          />
        )}
      </div>
    </Box>
  )
}

export default TableCustom
