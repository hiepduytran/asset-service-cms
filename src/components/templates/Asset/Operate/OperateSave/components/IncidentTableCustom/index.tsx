import { CoreTable } from '@/components/organism/CoreTable'
import React from 'react'
import { useIncidentTableCustom } from './useIncidentTableCustom'
import { TableCell, Typography } from '@mui/material'
import { BLUE } from '@/helper/colors'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import { DialogIncident } from '../DialogIncident'

export default function IncidentTableCustom(props: any) {
  const { serviceType, productId, assetId } = props
  const [values, handles] = useIncidentTableCustom(props)
  const { showDialog } = useDialog()
  const { isView, methodForm, columns, tableData, data, isLoading, isLoadingAll, dataAll } = values
  const { t, onChangePageSize, refetch, refetchAll, setUpdatedItemsIncident, setUpdatedItemsIncidentAddNew } = handles

  return (
    <CoreTable
      tableName='incident'
      columns={columns}
      data={tableData}
      onChangePageSize={onChangePageSize}
      {...data}
      isLoading={isLoading || isLoadingAll}
      isShowColumnStt
      actionTable={
        isView ? null : (
          <TableCell colSpan={2}>
            <Typography
              sx={{
                padding: '4px',
                color: BLUE,
                cursor: 'pointer',
              }}
              onClick={() =>
                showDialog(
                  <DialogIncident
                    dataAll={dataAll}
                    serviceType={serviceType}
                    type='CREATE_NEW'
                    index={tableData?.length}
                    methodForm={methodForm}
                    productId={productId}
                    assetId={assetId}
                    refetch={refetch}
                    refetchAll={refetchAll}
                    numberOfReviewType={1}
                    setUpdatedItemsIncident={setUpdatedItemsIncident}
                    setUpdatedItemsIncidentAddNew={setUpdatedItemsIncidentAddNew}
                  />
                )
              }
            >
              + {t('action.recordNewIncident')}
            </Typography>
          </TableCell>
        )
      }
    />
  )
}
