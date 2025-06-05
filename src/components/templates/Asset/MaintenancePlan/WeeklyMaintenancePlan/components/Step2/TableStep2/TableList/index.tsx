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

const TableList = ({
  t,
  fields,
  append,
  remove,
  index,
}: {
  t: any
  fields: any
  append: any
  remove: any
  index: number
}) => {
  return (
    <Box className='mb-30 overflow-auto'>
      <CustomTable>
        <TableHead>
          <TableRow className='bg-[#F6F7F9]'>
            <TableCell className='w-10'>STT</TableCell>
            <TableCell>{t('table.sparePart')}</TableCell>
            <TableCell>{t('table.attribute')}</TableCell>
            <TableCell>{t('table.quantity')}</TableCell>
            <TableCell>{t('table.issue')}</TableCell>
            <TableCell>{t('table.selection')}</TableCell>
            <TableCell>{t('table.note')}</TableCell>
            <TableCell className='w-10'></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {fields?.length === 0 ? (
            <TableRow>
              <TableCell
                variant='body'
                align='center'
                className='py-8'
                colSpan={9}
              >
                <div className='flex justify-center min-h-[60px] flex-col'>
                  <EmptyIcon />
                  <Typography variant='body2'>
                    {t('common:table.no_data')}
                  </Typography>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            fields.map((item: any, index1: number) => {
              return (
                <RowItem
                  key={item.keyConfigMaintenance}
                  append={append}
                  remove={remove}
                  index={index}
                  index1={index1}
                />
              )
            })
          )}
        </TableBody>
      </CustomTable>
    </Box>
  )
}

export default TableList
