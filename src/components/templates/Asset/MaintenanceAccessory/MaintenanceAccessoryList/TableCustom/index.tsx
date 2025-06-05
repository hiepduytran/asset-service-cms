import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableProps,
  TableRow,
  Typography,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import RowItem from './TableRow'
import EmptyIcon from '@/components/icons/EmptyIcon'
import CoreLoading from '@/components/molecules/CoreLoading'
import { MaintenanceAccessory } from '@/service/asset/maintenanceAccessory/getList/type'
import CoreTablePagination from '@/components/organism/CoreTablePagination'

type Props = {
  data: MaintenanceAccessory[]
  t: any
  page?: number
  size?: number
  isLoading?: boolean
  totalPages?: number
  onChangePageSize?: (val: any) => void
  onRowClick?: (id: number, row?: any) => void
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

const TableCustom = ({
  data,
  t,
  page,
  size,
  totalPages,
  isLoading,
  onChangePageSize,
  onRowClick,
}: Props) => {
  return (
    <Box className='overflow-auto'>
      <CustomTable>
        <TableHead>
          <TableRow className='bg-[#F6F7F9]'>
            <TableCell>STT</TableCell>
            <TableCell>{t('table.assetCode')}</TableCell>
            <TableCell>{t('table.assetName')}</TableCell>
            <TableCell>{t('table.accessory')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={5} variant='body'>
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
                  onRowClick={onRowClick}
                />
              )
            })
          ) : (
            <TableRow>
              <TableCell
                colSpan={5}
                variant='body'
                align='center'
                className='py-8'
              >
                <div className='flex justify-center min-h-[60px] flex-col'>
                  <EmptyIcon />

                  <Typography variant='body2'>
                    {`${t('text.no_data')}`}
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
