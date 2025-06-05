import { CoreDialog } from '@/components/organism/CoreDialog'
import { CoreTable } from '@/components/organism/CoreTable'
import { Grid, TableCell } from '@mui/material'
import DialogIncident from '../DialogIncident'
import useDialogListIncident from './useDialogListIncident'
type Props = {
  hideDialogListIncident: () => void
  productId: number
  maintenanceScheduleShiftId: number
  maintenanceScheduleId: number
}

export default function DialogListIncident(props: Props) {
  const {
    hideDialogListIncident,
    productId,
    maintenanceScheduleId,
    maintenanceScheduleShiftId,
  } = props
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
      dataLineIncident,
    },
    {
      t,
      setIsShowDialogIncident,
      hideDialogIncident,
      setType,
      onChangePageSize,
      setDataLineIncident,
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
                isLoading={isLoadingGetIncidentRecordingMaintenance}
                {...page}
                actionTable={
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
                }
              />
            </Grid>
          </Grid>
          {isShowDialogIncident && (
            <DialogIncident
              type={type}
              hideDialogIncident={hideDialogIncident}
              dataLineIncident={dataLineIncident}
              productId={productId}
              maintenanceScheduleShiftId={maintenanceScheduleShiftId}
              maintenanceScheduleId={maintenanceScheduleId}
              refetchGetIncidentRecordingMaintenance={
                refetchGetIncidentRecordingMaintenance
              }
              handleChangeRecordConditionTypeSave={
                handleChangeRecordConditionTypeSave
              }
              recordConditionTypeStorageFn={recordConditionTypeStorageFn}
            />
          )}
        </form>
      }
    </CoreDialog>
  )
}
