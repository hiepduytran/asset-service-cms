import CoreLoading from '@/components/molecules/CoreLoading'
import CoreTableDropDown from '@/components/organism/CoreTableDropDown'
import { FormProvider } from 'react-hook-form'
import AssetDelivery from '../AssetDelivery'
import DialogDelivery from '../DialogDelivery'
import AssetDeliveryDetail from '../TableAssetDeliveryDetail'
import useTableWarehouseReceipt from './useTableWarehouseReceipt'

export default function TableDelivery(props: { cardId: number; id: number }) {
  const [
    {
      methods,
      dataStockPickingDeliver,
      columns,
      tableData,
      isLoadingStockPickingDeliver,
      columnsChild,
      tableDataChild,
      dataChild,
      isLoadingChild,
      isShowDialog,
      isFirstDialog,
    },
    {
      t,
      handleFetchDataChild,
      setIsShowDialog,
      hideDialog,
      changeIsFirstDialog,
    },
  ] = useTableWarehouseReceipt(props)
  const { getValues } = methods
  return (
    <FormProvider {...methods}>
      {isLoadingStockPickingDeliver ? (
        <CoreLoading />
      ) : dataStockPickingDeliver.length > 1 ? (
        <>
          <CoreTableDropDown
            tabName={`${t('text.detail_delivery')}`}
            data={tableData}
            dataChild={tableDataChild}
            columns={columns}
            columnsChild={columnsChild}
            tableNameChild='detailRecovery'
            component={<AssetDeliveryDetail dataChild={dataChild} />}
            isShowColumnStt
            paginationHidden
            handleFetchDataChild={handleFetchDataChild}
            isLoadingChild={isLoadingChild}
            onRowClickChild={(id, row) => {
              setIsShowDialog({
                isShow: true,
                productId: row?.product?.id,
              })
            }}
            columnNameDropDown='dropDown'
          />
          {getValues('state') === 'DONE' && isShowDialog.isShow && (
            <DialogDelivery
              hideDialog={hideDialog}
              productId={isShowDialog.productId ?? 0}
              cardId={dataStockPickingDeliver[0]?.id}
              isFirstDialog={isFirstDialog}
              changeIsFirstDialog={changeIsFirstDialog}
            />
          )}
        </>
      ) : (
        <AssetDelivery dataStockPickingDeliver={dataStockPickingDeliver} />
      )}
    </FormProvider>
  )
}
