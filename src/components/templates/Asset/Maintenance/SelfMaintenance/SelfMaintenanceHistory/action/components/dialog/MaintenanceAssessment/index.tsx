import CoreCheckbox from '@/components/atoms/CoreCheckbox'
import CoreLoading from '@/components/molecules/CoreLoading'
import { CoreDialog } from '@/components/organism/CoreDialog'
import {
  TableContainerCommon,
  TableHeadCommon,
} from '@/components/organism/CoreTable'
import {
  InputLabel,
  Table,
  TableBody,
  TableRow,
  Typography,
} from '@mui/material'
import Image from 'next/image'
import React from 'react'
import { FormProvider } from 'react-hook-form'

import { TableCellHeader } from '@/components/templates/Asset/AssetDeclarationCategoryList'
import {
  TableCellHeaderBody,
  TableCellWithBorderRightCustom,
} from '../../../../../SelfMaintenanceCheck/action/components/TableCustom'
import DialogDetailError from '../../../../../SelfMaintenancePerform/action/components/DialogDetailError'
import useMaintenanceAssessment from './useMaintenanceAssessment'
type Props = {
  maintenanceShiftId: number
  maintenanceScheduleId: number
  hideDialog: () => void
  handleChangeRenderReview?: () => void
  infoRecorderAndStatus?: {
    name: string
    status: string
  }
  isViewProp?: boolean
  isUpdateProp?: boolean
  isApproveAll?: boolean
  roleId?: number
}
export default function MaintenanceAssessment(props: Props) {
  const {
    maintenanceShiftId,
    maintenanceScheduleId,
    hideDialog,
    infoRecorderAndStatus,
    isViewProp,
    isUpdateProp,
    isApproveAll,
    roleId,
  } = props
  const [
    {
      methods,
      auditFinalSequenceFields,
      isLoadingAuditFinalSequence,
      isShowDialogError,
      sequenceId,
    },
    { t, setIsShowDialogError, setSequenceId, convertStatusShift },
  ] = useMaintenanceAssessment(props)
  const { control, getValues, setValue, watch } = methods

  const maxLColumns = Math.max(
    ...getValues('maintenanceShifts').flatMap((shift) =>
      shift.groupStandard.flatMap((seq) =>
        seq.items.flatMap((line) => {
          return line.sequenceList.flatMap(
            (item) => item.sequenceListItem.length
          )
        })
      )
    )
  )

  return (
    <FormProvider {...methods}>
      <CoreDialog
        title={`${
          isViewProp
            ? t('Chi tiết kiểm tra tự bảo dưỡng').toUpperCase()
            : t(
                'self_maintenance.self_maintenance_check.text.check_maintenance_dialog'
              )
        }`}
        onClose={hideDialog}
        width={800}
      >
        {isLoadingAuditFinalSequence ? (
          <div className='mb-25'>
            <CoreLoading />
          </div>
        ) : (
          <form className='flex flex-col px-15 mt-15 mb-15'>
            <TableContainerCommon layout='Layout1'>
              <Table>
                <TableHeadCommon layout='Layout1'>
                  <TableRow>
                    <TableCellHeader>STT</TableCellHeader>
                    <TableCellHeader>{`${t(
                      'self_maintenance.self_maintenance_check.text.accessory'
                    )}`}</TableCellHeader>
                    {Array.from({ length: maxLColumns }, (_, index) => (
                      <TableCellHeader
                        sx={{
                          textAlign: 'center',
                        }}
                        key={`L${index + 1}`}
                      >{`L${index + 1}`}</TableCellHeader>
                    ))}
                  </TableRow>
                </TableHeadCommon>
                <TableBody>
                  {auditFinalSequenceFields.map(
                    (auditFinalSequenceField, index) => {
                      return (
                        <React.Fragment key={auditFinalSequenceField.key}>
                          <TableRow>
                            <TableCellHeaderBody
                              style={{ textAlign: 'left' }}
                              colSpan={15}
                            >
                              <Typography
                                style={{
                                  fontWeight: 700,
                                }}
                              >
                                {auditFinalSequenceField.group.name}
                              </Typography>
                            </TableCellHeaderBody>
                          </TableRow>
                          {auditFinalSequenceField.items.map((item, index2) => {
                            return (
                              <TableRow key={index2}>
                                <TableCellWithBorderRightCustom>
                                  {index2 + 1}
                                </TableCellWithBorderRightCustom>
                                <TableCellWithBorderRightCustom
                                  sx={{
                                    textAlign: 'left',
                                  }}
                                >
                                  {item.accessory.name}
                                </TableCellWithBorderRightCustom>
                                {item.sequenceList.map((sequence, index3) => {
                                  return (
                                    <TableCellWithBorderRightCustom
                                      key={sequence.id}
                                    >
                                      <div className='flex items-center'>
                                        <CoreCheckbox
                                          control={control}
                                          name={`auditFinalSequence.${index}.items.${index2}.sequenceList.${index3}.isConfirm`}
                                          label=''
                                          isViewProp={isViewProp ?? false}
                                          sx={{
                                            marginRight: 0,
                                          }}
                                          className={'ml-[40%]'}
                                        />
                                        {getValues(
                                          `auditFinalSequence.${index}.items.${index2}.incidentRecording`
                                        ) && (
                                          <Image
                                            src={require('@/assets/svg/error.svg')}
                                            alt=''
                                            onClick={() => {
                                              setIsShowDialogError(true)
                                              setSequenceId(
                                                getValues(
                                                  `auditFinalSequence.${index}.items.${index2}.incidentRecording.id`
                                                )
                                              )
                                            }}
                                          />
                                        )}
                                      </div>
                                    </TableCellWithBorderRightCustom>
                                  )
                                })}
                              </TableRow>
                            )
                          })}
                        </React.Fragment>
                      )
                    }
                  )}
                </TableBody>
              </Table>
            </TableContainerCommon>
            {isViewProp && (
              <div className='mt-10 flex flex-col gap-4'>
                <InputLabel>
                  {infoRecorderAndStatus?.name} kiểm tra và đánh giá
                </InputLabel>
                <Typography>
                  {convertStatusShift(infoRecorderAndStatus?.name ?? '')}
                </Typography>
              </div>
            )}

            {isShowDialogError && (
              <DialogDetailError
                incidentRecordingId={sequenceId}
                hideDialog={() => {
                  setIsShowDialogError(false)
                }}
              />
            )}
          </form>
        )}
      </CoreDialog>
    </FormProvider>
  )
}
