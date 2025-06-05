import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  Checkbox,
} from '@mui/material'
import RowItem from './TableRow'
import CoreLoading from '@/components/molecules/CoreLoading'
import EmptyIcon from '@/components/icons/EmptyIcon'
import CoreTablePagination from '@/components/organism/CoreTablePagination'
import { IncidentList } from '@/service/asset/incidentList/getList/type'
import { TableContainerCommon, TableHeadCommon } from '@/components/organism/CoreTable'
import { TableCellHeaderNoneBorder } from '@/components/templates/Asset/AssetDeclarationCategoryList'

const TableCustom = ({
  t,
  isLoading,
  data,
  onChangePageSize,
  totalPages,
  page,
  size,
  selectedRows,
  setSelectedRows,
}: {
  t: any
  isLoading: boolean
  data: IncidentList[]
  onChangePageSize: any
  totalPages: number
  page: number
  size: number
  selectedRows?: any
  setSelectedRows?: any
}) => {
  return (
    <div className='p-10'>
      <TableContainerCommon layout='Layout1'>
        <Table>
          <TableHeadCommon layout='Layout1'>
            <TableRow>
              <TableCellHeaderNoneBorder className='w-10'>
                <Checkbox
                  size='small'
                  checked={selectedRows.length === data.length && data.length > 0}
                  onChange={(event) => {
                    const isChecked = event.target.checked
                    if (isChecked) {
                      setSelectedRows(data)
                    } else {
                      setSelectedRows([])
                    }
                  }}
                />
              </TableCellHeaderNoneBorder>
              <TableCellHeaderNoneBorder className='w-10'>STT</TableCellHeaderNoneBorder>
              <TableCellHeaderNoneBorder className='w-100'>{t('table.identifierCode')}</TableCellHeaderNoneBorder>
              <TableCellHeaderNoneBorder className='w-100'>{t('table.assName')}</TableCellHeaderNoneBorder>
              <TableCellHeaderNoneBorder className='w-100'>{t('table.part')}</TableCellHeaderNoneBorder>
              <TableCellHeaderNoneBorder className='w-100'>{t('table.incident')}</TableCellHeaderNoneBorder>
              <TableCellHeaderNoneBorder className='w-100'>{t('table.assetStatus')}</TableCellHeaderNoneBorder>
              <TableCellHeaderNoneBorder>{t('table.planStatus')}</TableCellHeaderNoneBorder>
            </TableRow>
          </TableHeadCommon>

          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={9} variant='body'>
                  <div className='flex justify-center min-h-[60px]'>
                    <CoreLoading />
                  </div>
                </TableCell>
              </TableRow>
            ) : data?.length === 0 ? (
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
              data.map((item: IncidentList, index: number) => {
                return (
                  <RowItem
                    key={item?.asset?.id}
                    incidentList={item}
                    index={index}
                    selectedRows={selectedRows}
                    setSelectedRows={setSelectedRows}
                  />
                )
              })
            )}
          </TableBody>
        </Table>
      </TableContainerCommon>
      <div className='py-5'>
        <CoreTablePagination
          size={size ?? 1}
          page={page ?? 1}
          totalPages={totalPages ?? 1}
          onChangePagination={(val: any) =>
            onChangePageSize && onChangePageSize(val)
          }
        />
      </div>
    </div>
  )
}

export default TableCustom
