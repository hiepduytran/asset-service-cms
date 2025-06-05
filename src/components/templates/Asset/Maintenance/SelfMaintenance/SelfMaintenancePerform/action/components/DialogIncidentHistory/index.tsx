import { CoreDialog } from '@/components/organism/CoreDialog'
import { useDialog, useDialog2 } from '@/components/hooks/dialog/useDialog'
import { useDialogIncidentHistory } from './useDialogIncidentHistory'
import { CoreTable } from '@/components/organism/CoreTable'
import { DialogIncidentDetail } from '@/components/templates/Asset/MaintenancePlan/IncidentList/components/DialogIncidentDetail'

export const DialogIncidentHistory = (props: any) => {
  const { hideDialog } = useDialog()
  const { showDialog2 } = useDialog2()
  const [values, handles] = useDialogIncidentHistory(props)
  const { methodForm, columns, tableData, data, isLoading } = values
  const { t, onChangePageSize } = handles

  return (
    <CoreDialog
      onClose={hideDialog}
      width={1100}
      title={t('incidentRecordingHistory')}
    >
      <div className='p-15'>
        <CoreTable
          tableName='incidentHistory'
          columns={columns}
          data={tableData}
          onChangePageSize={onChangePageSize}
          {...data}
          isLoading={isLoading}
          isShowColumnStt
          onRowClick={(id, data) => {
            showDialog2(
              <DialogIncidentDetail
                methodForm={methodForm}
                incidentCode={data?.code}
                incidentName={data?.name}
                location={data?.incidentLocation}
                severityLevel={data?.severityManagement}
                reason={data?.reason}
              />
            )
          }}
        />
      </div>
    </CoreDialog>
  )
}
