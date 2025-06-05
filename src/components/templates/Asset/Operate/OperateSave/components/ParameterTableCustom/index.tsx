import {
  styled,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material'
import React, { useState } from 'react'
import { RowItem } from './RowItem'
import { OperateLine } from '@/service/asset/operate/save/type'
import EmptyIcon from '@/components/icons/EmptyIcon'
import CoreLoading from '@/components/molecules/CoreLoading'
import { useTranslation } from 'react-i18next'
import { TRANSLATE } from '@/routes'
import { TableContainerCommon, TableHeadCommon } from '@/components/organism/CoreTable'

export const StyledTableCell = styled(TableCell)(() => ({
  fontWeight: 600,
  minWidth: 200,
}))

export const HeaderTable = () => {
  const { t } = useTranslation(TRANSLATE.OPERATE)
  return (
    <TableHeadCommon layout='Layout1' sx={{
      position: 'sticky',
      top: 0,
      zIndex: 1,
    }}>
      <TableRow>
        <StyledTableCell>{`${t('operate_save.table.name')}`}</StyledTableCell>
        <StyledTableCell>{`${t('operate_save.table.value')}`}</StyledTableCell>
        <StyledTableCell>{`${t('operate_save.table.type')}`}</StyledTableCell>
        <StyledTableCell>{`${t('operate_save.table.level')}`}</StyledTableCell>
        <StyledTableCell>{`${t(
          'operate_save.table.expected'
        )}`}</StyledTableCell>
        <StyledTableCell>{`${t(
          'operate_save.table.value_2'
        )}`}</StyledTableCell>
        <StyledTableCell>{`${t('operate_save.table.time')}`}</StyledTableCell>
        <StyledTableCell>{`${t(
          'operate_save.table.warning'
        )}`}</StyledTableCell>
        <StyledTableCell>{`${t(
          'operate_save.table.propose'
        )}`}</StyledTableCell>
      </TableRow>
    </TableHeadCommon>
  )
}

export const BodyTable = ({
  operateLine,
  isLoading,
}: {
  operateLine: OperateLine[]
  isLoading: boolean
}) => {
  const { t } = useTranslation(TRANSLATE.OPERATE)

  return (
    <TableBody>
      {isLoading ? (
        <TableRow>
          <TableCell variant='body'>
            <div className='flex justify-center min-h-[60px]'>
              <CoreLoading />
            </div>
          </TableCell>
        </TableRow>
      ) : operateLine?.length === 0 ? (
        <TableRow>
          <TableCell variant='body' align='center' className='py-8' colSpan={9}>
            <div className='flex justify-center min-h-[60px] flex-col'>
              <EmptyIcon />
              <Typography variant='body2'>
                {t('common:table.no_data')}
              </Typography>
            </div>
          </TableCell>
        </TableRow>
      ) : (
        operateLine.map((item, index) => {
          return <RowItem item={item} index={index} key={'key' + index} />
        })
      )}
    </TableBody>
  )
}

type Props = {
  operateLine: OperateLine[]
}

export default function ParameterTableCustom({ operateLine }: Props) {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <TableContainerCommon layout='Layout1' sx={{ maxHeight: 440 }}>
      <Table>
        <HeaderTable />
        <BodyTable operateLine={operateLine} isLoading={isLoading} />
      </Table>
    </TableContainerCommon>
  )
}
