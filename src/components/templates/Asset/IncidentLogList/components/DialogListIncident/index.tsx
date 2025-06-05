import { CoreDialog } from '@/components/organism/CoreDialog'
import { CoreTable } from '@/components/organism/CoreTable'
import { Grid, TableCell } from '@mui/material'
import DialogIncident from '../DialogIncident'
import useDialogListIncident from './useDialogListIncident'
type Props = {
  hideDialogListIncident: () => void
  productId: number
  indexLine: number
}

export default function DialogListIncident(props: Props) {
  const { hideDialogListIncident, productId, indexLine } = props
  const [
    {
      methods,
      columns,
      isView,
      isShowDialogIncident,
      type,
      tableData,
      isLoadingGetIncidentRecordingMaintenance,
      page,
      dataRow,
      index2Line,
      // isLoadingGetIncidentRecordingMaintenanceIsUpdate,
      dataIncidentListAll,
    },
    {
      t,
      setIsShowDialogIncident,
      hideDialogIncident,
      setType,
      onChangePageSize,
      setDataRow,
      handleChangeRecordConditionTypeSave,
      refetchGetIncidentRecordingMaintenance,
      recordConditionTypeStorageFn,
      onSubmit,
    },
  ] = useDialogListIncident(props)
  const { getValues } = methods
  return (
    <CoreDialog
      title={`${t('danh sách sự cố')}`.toUpperCase()}
      onClose={hideDialogListIncident}
      width={1500}
    >
      {
        <form className='p-15'>
          <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={12}>
              <CoreTable
                tableName='incident-list'
                columns={columns}
                data={tableData}
                isShowColumnStt
                onChangePageSize={onChangePageSize}
                isLoading={
                  isLoadingGetIncidentRecordingMaintenance
                  // ||
                  // isLoadingGetIncidentRecordingMaintenanceIsUpdate
                }
                {...page}
                // onRowClick={
                //   isView
                //     ? (id, row) => {
                //         setIsShowDialogIncident(true)
                //         setType('DETAIL')
                //         setDataRow(row)
                //       }
                //     : undefined
                // }
                actionTable={
                  isView ? (
                    <></>
                  ) : (
                    <TableCell
                      colSpan={2}
                      sx={{
                        border: 'none',
                      }}
                      onClick={() => {
                        setIsShowDialogIncident(true)
                        setType('CREATE_NEW')
                      }}
                    >
                      <div className='flex text-[#0078D4] text-[12px] cursor-pointer select-none'>
                        + Ghi nhận sự cố mới
                      </div>
                    </TableCell>
                  )
                }
              />
            </Grid>
          </Grid>

          {/* <div className='flex gap-10 mt-15 justify-center'>
            <CoreButton theme='cancel' onClick={() => hideDialogListIncident()}>
              {t('common:btn.destroy')}
            </CoreButton>
            <CoreButton theme='submit' onClick={onSubmit}>
              {t('Ghi nhận sự cố')}
            </CoreButton>
          </div> */}

          {isShowDialogIncident && (
            <DialogIncident
              type={type}
              hideDialogIncident={hideDialogIncident}
              dataRow={dataRow}
              productId={productId}
              refetchGetIncidentRecordingMaintenance={
                refetchGetIncidentRecordingMaintenance
              }
              // refetchIncidentRecordingMaintenanceIsUpdate={
              //   refetchIncidentRecordingMaintenanceIsUpdate
              // }
              indexLine={indexLine}
              index2Line={index2Line}
              handleChangeRecordConditionTypeSave={
                handleChangeRecordConditionTypeSave
              }
              dataLineId={getValues(`asset.${indexLine}.assetIdentity.id`)}
              recordConditionTypeStorageFn={recordConditionTypeStorageFn}
              departmentId={
                getValues('allocationChooseType') === 'DEPARTMENT'
                  ? getValues('department.id')
                  : null
              }
              dataIncidentListAll={getValues(
                `asset.${indexLine}.recordConditionTypeAll`
              )}
            />
          )}
        </form>
      }
    </CoreDialog>
  )
}
