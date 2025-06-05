import { useDialog } from '@/components/hooks/dialog/useDialog'
import CoreLoading from '@/components/molecules/CoreLoading'
import CoreTableDropDown from '@/components/organism/CoreTableDropDown'
import { FormProvider } from 'react-hook-form'
import AssetWarehouseReceipt from '../AssetWarehouseReceipt'
import DialogWarehouseReceipt from '../DialogWarehouseReceipt'
import useTableWarehouseReceipt from './useTableWarehouseReceipt'
import WarehouseReceiptDetail from '../WarehouseReceiptDetail'

export default function TableWarehouseReceipt(props: {
  cardId: number
  id: number
}) {
  const { cardId, id } = props
  const [
    {
      methods,
      dataStockPickingWarehouseReceipt,
      columns,
      tableData,
      isLoadingStockPickingWarehouseReceipt,
      columnsChild,
      tableDataChild,
      dataChild,
      isLoadingChild,
    },
    { t, handleFetchDataChild },
  ] = useTableWarehouseReceipt(props)
  const { getValues, control } = methods
  const { showDialog } = useDialog()
  return (
    <FormProvider {...methods}>
      {isLoadingStockPickingWarehouseReceipt ? (
        <CoreLoading />
      ) : dataStockPickingWarehouseReceipt.length > 1 ? (
        <CoreTableDropDown
          tabName={t('reclaimedAssetDetails')}
          data={tableData}
          dataChild={tableDataChild}
          columns={columns}
          columnsChild={columnsChild}
          tableNameChild='detailRecovery'
          component={<WarehouseReceiptDetail dataChild={dataChild} />}
          isShowColumnStt
          paginationHidden
          handleFetchDataChild={handleFetchDataChild}
          isLoadingChild={isLoadingChild}
          onRowClickChild={(id, row) => {
            getValues('state') === 'DONE' &&
              showDialog(
                <DialogWarehouseReceipt
                  productId={row.product.id}
                  cardId={dataStockPickingWarehouseReceipt[0]?.id}
                />
              )
          }}
          columnNameDropDown='dropDown'
        />
      ) : (
        <AssetWarehouseReceipt
          dataStockPickingWarehouseReceipt={dataStockPickingWarehouseReceipt}
        />
      )}
    </FormProvider>
  )
}
