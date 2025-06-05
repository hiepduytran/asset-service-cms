import { CoreTable } from '@/components/organism/CoreTable'
import React from 'react'
import { useMachineStopTableCustom } from './useMachineStopTableCustom'
import { TableCell, Typography } from '@mui/material'
import { BLUE } from '@/helper/colors'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import { DialogMachineStop } from '../DialogMachineStop'

export default function MachineStopTableCustom(props: any) {
  const [values, handles] = useMachineStopTableCustom(props)
  const { assetId, shift, setUpdatedItemsMS } = props
  const { showDialog } = useDialog()
  const { isView, methodForm, columns, tableData, data, isLoading, isLoadingAll } = values
  const { t, onChangePageSize, refetch, refetchAll } = handles

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
                  <DialogMachineStop
                    type='ADD_NEW'
                    index={tableData?.length}
                    methodForm={methodForm}
                    refetch={refetch}
                    refetchAll={refetchAll}
                    assetId={assetId}
                    shift={shift}
                    setUpdatedItemsMS={setUpdatedItemsMS}
                  />
                )
              }
            >
              + Thêm dừng máy
            </Typography>
          </TableCell>
        )
      }
    />
  )
}
