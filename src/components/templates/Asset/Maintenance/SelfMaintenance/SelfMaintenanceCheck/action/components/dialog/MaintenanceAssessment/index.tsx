import { CoreButton } from '@/components/atoms/CoreButton'
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
import {
  TableCellHeader,
  TableCellHeaderBody,
  TableCellWithBorderRightCustom,
} from '../../TableCustom'
import DialogDetailError from '../DialogDetailError'
import DialogListIncident from '../DialogListIncident'
import useMaintenanceAssessment from './useMaintenanceAssessment'
type Props = {
  refetchAuditMaintenances?: any
  productId: number
  maintenanceShiftId: number
  maintenanceScheduleId: number
  hideDialog: () => void
  isRenderReview?: boolean
  handleChangeRenderReview?: () => void
  infoRecorderAndStatus?: {
    name: string
    status: string
  }
  isViewProp?: boolean
  isUpdateProp?: boolean
  isApproveAll?: boolean
  roleId?: number
  ratingId: number
}
export default function MaintenanceAssessment(props: Props) {
  const {
    refetchAuditMaintenances,
    productId,
    maintenanceShiftId,
    maintenanceScheduleId,
    hideDialog,
    infoRecorderAndStatus,
    isRenderReview,
    isViewProp,
    isUpdateProp,
    isApproveAll,
    roleId,
    ratingId,
  } = props
  const [
    {
      methods,
      auditFinalSequenceFields,
      isLoadingAuditFinalSequence,
      isShowDialogError,
      sequenceId,
      isShowDialogListIncident,
      isLoadingAutoMaintenanceApprove,
      isLoadingDeleteSequenceAuto,
    },
    {
      t,
      handleSave,
      setIsShowDialogError,
      setSequenceId,
      setIsShowDialogListIncident,
      convertStatusShift,
      onCancel,
      onEdit,
      onDelete,
      refetchAuditFinalSequence,
    },
  ] = useMaintenanceAssessment(props)
  const { control, getValues, setValue, watch } = methods

  const maxLColumns = Math.max(
    ...getValues('maintenanceShiftAudits').flatMap((shift) =>
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
          <>
            <form className='flex flex-col px-15 mt-15 mb-15'>
              <TableContainerCommon layout='Layout1'>
                <Table>
                  <TableHeadCommon layout='Layout1'>
                    <TableRow>
                      <TableCellHeader>STT</TableCellHeader>
                      <TableCellHeader
                        sx={{
                          textAlign: 'left',
                        }}
                      >{`${t(
                        'self_maintenance.self_maintenance_check.text.accessory'
                      )}`}</TableCellHeader>
                      {Array.from({ length: maxLColumns }, (_, index) => (
                        <TableCellHeader key={`L${index + 1}`}>{`L${
                          index + 1
                        }`}</TableCellHeader>
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
                            {auditFinalSequenceField.items.map(
                              (item, index2) => {
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
                                    {item.sequenceList.map(
                                      (sequence, index3) => {
                                        return (
                                          <TableCellWithBorderRightCustom
                                            key={sequence.id}
                                          >
                                            <div className='flex items-center'>
                                              <CoreCheckbox
                                                control={control}
                                                name={`auditFinalSequence.${index}.items.${index2}.sequenceList.${index3}.isConfirm`}
                                                label=''
                                                sx={{
                                                  marginRight: 0,
                                                }}
                                                className={'ml-[40%]'}
                                                isViewProp={isViewProp ?? false}
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
                                      }
                                    )}
                                  </TableRow>
                                )
                              }
                            )}
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

              {/* {isShowDialogListIncident && (
                <DialogListIncident
                  productId={productId}
                  maintenanceScheduleShiftId={maintenanceShiftId}
                  maintenanceScheduleId={maintenanceScheduleId}
                  hideDialogListIncident={() => {
                    setIsShowDialogListIncident(false)
                    refetchAuditFinalSequence()
                  }}
                />
              )} */}
            </form>

            {isViewProp ? null : isUpdateProp ? (
              <div className='flex justify-center gap-10 py-10 mb-10'>
                <CoreButton
                  theme='reject'
                  onClick={onDelete}
                  loading={isLoadingDeleteSequenceAuto}
                >
                  {t('common:btn.delete')}
                </CoreButton>

                <CoreButton
                  theme='submit'
                  onClick={onEdit}
                  loading={isLoadingAutoMaintenanceApprove}
                >
                  {t('common:btn.edit')}
                </CoreButton>
              </div>
            ) : (
              <div className='flex justify-center gap-10 py-10 mb-10'>
                <CoreButton theme='cancel' onClick={onCancel}>
                  {t('common:btn.cancel')}
                </CoreButton>

                <CoreButton theme='submit' onClick={handleSave}>
                  {t('Xác nhận')}
                </CoreButton>
              </div>
            )}
          </>
        )}
      </CoreDialog>
    </FormProvider>
  )
}
