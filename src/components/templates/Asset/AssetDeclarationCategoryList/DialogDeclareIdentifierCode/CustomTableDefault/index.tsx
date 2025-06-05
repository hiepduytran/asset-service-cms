import {
  TableContainerCommon,
  TableHeadCommon,
} from '@/components/organism/CoreTable'
import { Table, TableBody, TableRow } from '@mui/material'
import { TableCellHeaderNoneBorder } from '../..'
import { useCustomTableDefault } from './useCustomTableDefault'
import React from 'react'
import RowItem from './RowItem'
import { useFormContext } from 'react-hook-form'

const CustomTableDefault = (props: any) => {
  const [values, handles] = useCustomTableDefault(props)
  const { } = values
  const { t } = handles
  const { index, isLoadingSerialLot, setIndexes, productId, productCategory, totalQuantity, setTotalQuantity, quantityUnidentified, uomName, uomId } = props
  const { watch } = useFormContext()
  return (
    <div className='p-20 py-10'>
      <TableContainerCommon layout='Layout1'>
        <Table>
          <TableHeadCommon layout='Layout1'>
            <TableRow>
              <TableCellHeaderNoneBorder style={{ width: '50px' }}>
                STT
              </TableCellHeaderNoneBorder>
              <TableCellHeaderNoneBorder>
                {t('table.location')}
              </TableCellHeaderNoneBorder>
              <TableCellHeaderNoneBorder>
                {t('table.serialAndIdentifierCode')}
              </TableCellHeaderNoneBorder>
              <TableCellHeaderNoneBorder>
                {t('table.origin')}
              </TableCellHeaderNoneBorder>
              <TableCellHeaderNoneBorder>
                {t('table.manufacturer')}
              </TableCellHeaderNoneBorder>
              <TableCellHeaderNoneBorder>
                {t('table.supplier')}
              </TableCellHeaderNoneBorder>
              <TableCellHeaderNoneBorder>
                {t('table.dateOfPurchase')}
              </TableCellHeaderNoneBorder>
              <TableCellHeaderNoneBorder>
                {t('table.dateOfUse')}
              </TableCellHeaderNoneBorder>
              <TableCellHeaderNoneBorder></TableCellHeaderNoneBorder>
            </TableRow>
          </TableHeadCommon>
          <TableBody>
            {watch(`pickIn.${index}.locationLot`)?.map(
              (item1: any, index1: number) => (
                <RowItem
                  key={index1}
                  item1={item1}
                  index={index}
                  index1={index1}
                  setIndexes={setIndexes}
                  productId={productId}
                  productCategory={productCategory}
                  totalQuantity={totalQuantity}
                  setTotalQuantity={setTotalQuantity}
                  quantityUnidentified={quantityUnidentified}
                  uomName={uomName}
                  uomId={uomId}
                />
              )
            )}
          </TableBody>
        </Table>
      </TableContainerCommon>
    </div>
  )
}
export default CustomTableDefault
