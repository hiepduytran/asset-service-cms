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
import { AccessoryDemandForecasting } from '@/service/asset/accessoryDemandForecasting/type'
import CoreTablePagination from '@/components/organism/CoreTablePagination'

type Props = {
  data: AccessoryDemandForecasting[]
  t: any
  page?: number
  size?: number
  isLoading?: boolean
  totalPages?: number
  onChangePageSize?: (val: any) => void
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
}: Props) => {
  return (
    <Box className='overflow-auto'>
      <CustomTable>
        <TableHead>
          <TableRow className='bg-[#F6F7F9]'>
            <TableCell className='w-10'>STT</TableCell>
            <TableCell>{t('table.accessoryCode')}</TableCell>
            <TableCell>{t('table.maintenanceAccessory')}</TableCell>
            <TableCell>{t('table.type')}</TableCell>
            <TableCell>{t('table.availableQuantity')}</TableCell>
            <TableCell>{t('table.demandQuantity')}</TableCell>
            <TableCell>{t('table.needQuantity')}</TableCell>
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
              return <RowItem key={item?.id} row={item} index={index} />
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
