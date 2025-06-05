import { TableCell, TableRow, Typography } from '@mui/material'
import EmptyIcon from '@/components/icons/EmptyIcon'
import { useTranslation } from 'next-i18next'
import { TRANSLATE } from '@/routes'

type Props = {
  colSpan: number
  isShowNoDataText: boolean
}

export const TableRowEmpty = (props: Props) => {
  const { t } = useTranslation(TRANSLATE.COMMON)
  const { colSpan, isShowNoDataText } = props

  if (!isShowNoDataText) return null

  return <TableRow>
    <TableCell
      colSpan={colSpan}
      variant="body"
      align="center"
      className="py-8"
    >
      <div className="flex justify-center min-h-[60px] flex-col">
        <EmptyIcon />
        <Typography variant="body2">
          {t('table.no_data')}
        </Typography>
      </div>
    </TableCell>
  </TableRow>
}