import { PRIMARY } from '@/helper/colors'
import styled from '@emotion/styled'
import { TableCell, TableRow, Typography } from '@mui/material'

export const TableCellCommon = styled(TableCell)(() => ({
  '&:first-of-type': {
    borderLeft: '1px solid #DFE0EB',
  },
  '&:last-of-type': {
    borderRight: '1px solid #DFE0EB',
  },
}))

type Props = {
  columns: any
  append: any
  defaultValueLine: any
  action?: string | null
  style?: any
}

export const ActionTable = ({
  columns,
  append,
  defaultValueLine,
  action = 'Thêm sản phẩm',
  style,
}: Props) => {
  return (
    <TableRow>
      <TableCellCommon colSpan={columns.length + 1} style={style}>
        <div className='flex items-center gap-10 h-15 px-2'>
          <Typography
            variant='body1'
            style={{
              color: PRIMARY,
              cursor: 'pointer',
            }}
            onClick={() => append(defaultValueLine)}
          >
            {action}
          </Typography>
        </div>
      </TableCellCommon>
    </TableRow>
  )
}
