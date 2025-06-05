import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import CoreCheckbox from '@/components/atoms/CoreCheckbox'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import {
  TableContainerCommon,
  TableHeadCommon,
} from '@/components/organism/CoreTable'
import { DialogIncidentHistory } from '@/components/templates/Asset/MaintenancePlan/IncidentList/components/DialogIncidentHistory'
import {
  Grid,
  styled,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material'
import Image from 'next/image'
import { Fragment } from 'react'
import DialogPauseMachine from '../../../../SelfMaintenanceCheck/action/components/dialog/PauseMachine'
import { TableCellNoneBorder } from '../../../../SelfMaintenanceCheck/action/components/TableCustom'
import DialogDetailError from '../../../../SelfMaintenancePerform/action/components/DialogDetailError'
import MaintenanceAssessment from '../dialog/MaintenanceAssessment'
import styles from './style.module.css'
import useTableCustomSelfMaintenanceHistory from './useTableCustomSelfMaintenanceHistory'

const TableCellHeader = styled(TableCell)(() => ({
  borderRight: '1px solid #DFE0EB',
  textAlign: 'center',
  fontWeight: '700',
}))

const TableCellHeaderBody = styled(TableCell)(() => ({
  borderRight: '1px solid #DFE0EB',
  textAlign: 'center',
  backgroundColor: '#F1F8FF',
}))

const TableCellWithBorderRightCustom = styled(TableCell)(() => ({
  borderRight: '1px solid #DFE0EB',
  textAlign: 'center',
  borderBottom: '1px solid #DFE0EB',
  width: '100px',
}))

export default function TableCustomSelfMaintenanceHistory() {
  const [
    {
      methods,
      maintenanceShiftsFields,
      isShowDialogDetailError,
      incidentRecordingId,
      isShowTooltip,
      isShowDialog,
      isShowDialogPauseMachine,
      isViewPropMaintenanceAssessment,
      isApproveAll,
      infoRecorderAndStatus,
      maintenanceShiftId,
      roleId,
      shutdownInformation,
      hoveredCell,
    },
    {
      t,
      setIsShowDialogDetailError,
      setIncidentRecordingId,
      setIsShowTooltip,
      setIsShowDialog,
      setIsShowDialogPauseMachine,
      setIsViewPropMaintenanceAssessment,
      setIsApproveAll,
      setMaintenanceShiftId,
      setRoleId,
      setShutdownInformation,
      hideDialogPauseMachine,
      setInfoRecorderAndStatus,
      handleMouseEnter,
      handleMouseLeave,
    },
  ] = useTableCustomSelfMaintenanceHistory()
  const { control, getValues } = methods

  const { showDialog } = useDialog()

  const maxKColumns = Math.max(
    ...maintenanceShiftsFields.map((shift) => shift.shift.length)
  )

  const maxLColumns = Math.max(
    ...maintenanceShiftsFields.flatMap((shift) =>
      shift?.groupStandard.flatMap((seq) =>
        seq.items.flatMap((line) => {
          return line.sequenceList.flatMap(
            (item) => item.sequenceListItem.length
          )
        })
      )
    )
  )

  return (
    <>
      <TableContainerCommon layout='Layout1'>
        <Table>
          <TableHeadCommon layout='Layout1'>
            <TableRow>
              <TableCellHeader rowSpan={2}>STT</TableCellHeader>
              <TableCellHeader rowSpan={2}>{`${t(
                'self_maintenance.self_maintenance_check.text.accessory'
              )}`}</TableCellHeader>
              <TableCellHeader rowSpan={2}>{`${t(
                'self_maintenance.self_maintenance_check.text.staff'
              )}`}</TableCellHeader>
              {Array.from({ length: maxKColumns }, (_, index) => (
                <TableCellHeader key={`K${index + 1}`} colSpan={maxLColumns}>
                  {maintenanceShiftsFields[0].shift[index].name}
                </TableCellHeader>
              ))}
            </TableRow>
            <TableRow>
              {Array.from({ length: maxKColumns }).map(() =>
                Array.from({ length: maxLColumns }, (_, index) => (
                  <TableCellHeader key={`L${index + 1}`}>{`L${
                    index + 1
                  }`}</TableCellHeader>
                ))
              )}
            </TableRow>
          </TableHeadCommon>
          <TableBody>
            {maintenanceShiftsFields.map((shift, shiftIndex) => {
              return (
                <Fragment key={shiftIndex}>
                  {shift?.groupStandard?.map(
                    (standard, standardIndex: number) => {
                      return (
                        <Fragment key={standardIndex}>
                          <TableRow>
                            <TableCellHeaderBody
                              style={{ textAlign: 'left' }}
                              colSpan={maxLColumns * maxKColumns + 3}
                            >
                              <Typography style={{ fontWeight: 700 }}>
                                {standard?.group?.name}
                              </Typography>
                            </TableCellHeaderBody>
                          </TableRow>
                          {standard?.items?.map((line, lineIndex: number) => (
                            <TableRow key={lineIndex}>
                              <TableCellWithBorderRightCustom>
                                {lineIndex + 1}
                              </TableCellWithBorderRightCustom>
                              <TableCellWithBorderRightCustom
                                sx={{
                                  width: '200px',
                                }}
                              >
                                <div className='flex items-center justify-center'>
                                  <div className='text-left mr-5 min-w-[120px]'>
                                    {line.accessory.name || ''}
                                  </div>
                                  <div className='relative'>
                                    <Image
                                      src={require('@/assets/svg/errorBlack.svg')}
                                      alt=''
                                      onClick={() => {
                                        setIsShowTooltip({
                                          [line.accessory.id +
                                          `${standard.group.id}`]:
                                            !isShowTooltip[
                                              line.accessory.id +
                                                `${standard.group.id}`
                                            ],
                                        })
                                      }}
                                    />
                                    {isShowTooltip[
                                      line.accessory.id + `${standard.group.id}`
                                    ] && (
                                      <div
                                        className={`${styles.tooltip_content_accessory}`}
                                      >
                                        {line?.result}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </TableCellWithBorderRightCustom>
                              <TableCellWithBorderRightCustom>
                                {line.role.name || null}
                              </TableCellWithBorderRightCustom>
                              {Array.from({ length: maxKColumns }).map(
                                (_, indexLine) => {
                                  if (line.sequenceList[indexLine]) {
                                    return Array.from({
                                      length: maxLColumns,
                                    }).map((_, index) => {
                                      const item =
                                        line.sequenceList[indexLine]
                                          .sequenceListItem[index] || null
                                      return (
                                        <TableCellWithBorderRightCustom
                                          key={'key' + index}
                                          onMouseEnter={() =>
                                            setTimeout(() => {
                                              handleMouseEnter(item.id)
                                            }, 100)
                                          }
                                          onMouseLeave={handleMouseLeave}
                                        >
                                          {item ? (
                                            <div className='relative flex items-center relative'>
                                              <CoreCheckbox
                                                control={control}
                                                name={`maintenanceShifts.${shiftIndex}.groupStandard.${standardIndex}.items.${lineIndex}.sequenceList.${indexLine}.sequenceListItem.${index}.isConfirm`}
                                                label=''
                                                isViewProp={true}
                                                className={
                                                  'ml-[10%] 2xl:ml-[35%]'
                                                }
                                                styles={{
                                                  opacity: `${
                                                    shift.isShow[indexLine]
                                                      ? 1
                                                      : 0.4
                                                  }`,
                                                  marginRight: 0,
                                                }}
                                                onMouseEnter={(e) => {
                                                  e.stopPropagation()
                                                  handleMouseEnter(NaN)
                                                }}
                                                onMouseLeave={() => {
                                                  handleMouseEnter(item.id)
                                                }}
                                              />
                                              <div className='flex items-center'>
                                                {line.sequenceList[indexLine]
                                                  .incidentRecording && (
                                                  <Image
                                                    src={require('@/assets/svg/error.svg')}
                                                    alt=''
                                                    // onClick={() => {
                                                    //   setIsShowDialogDetailError(
                                                    //     true
                                                    //   )
                                                    //   setIncidentRecordingId(
                                                    //     line.sequenceList[
                                                    //       indexLine
                                                    //     ].incidentRecording.id
                                                    //   )
                                                    // }}
                                                    onClick={() => {
                                                      showDialog(
                                                        <DialogIncidentHistory
                                                          id={
                                                            line.sequenceList[
                                                              indexLine
                                                            ].incidentRecording
                                                              .id
                                                          }
                                                        />
                                                      )
                                                    }}
                                                    onMouseEnter={(e) => {
                                                      e.stopPropagation()
                                                      handleMouseEnter(NaN)
                                                    }}
                                                    onMouseLeave={() => {
                                                      handleMouseEnter(item.id)
                                                    }}
                                                  />
                                                )}
                                                {hoveredCell === item.id && (
                                                  <div
                                                    className={`${styles.tooltip_content}`}
                                                  >
                                                    {item.userUpdate
                                                      ? `${
                                                          item.userUpdate
                                                            ?.lastName +
                                                          item.userUpdate
                                                            ?.firstName
                                                        }`
                                                      : 'Lỗi hiển thị tên'}
                                                  </div>
                                                )}
                                              </div>
                                            </div>
                                          ) : null}
                                        </TableCellWithBorderRightCustom>
                                      )
                                    })
                                  } else {
                                    return Array.from({
                                      length: maxLColumns,
                                    }).map((_, indexLineNull) => {
                                      return (
                                        <TableCellWithBorderRightCustom
                                          key={indexLineNull}
                                        />
                                      )
                                    })
                                  }
                                }
                              )}
                            </TableRow>
                          ))}
                        </Fragment>
                      )
                    }
                  )}
                </Fragment>
              )
            })}
          </TableBody>

          <TableCellNoneBorder></TableCellNoneBorder>
          <TableCellNoneBorder></TableCellNoneBorder>
          <TableCellNoneBorder></TableCellNoneBorder>

          {maintenanceShiftsFields.map((shift) => {
            return shift.shift.map((item, index) => {
              return (
                <TableCellNoneBorder key={'key' + index} colSpan={maxLColumns}>
                  {shift.confirmStatus?.length > 0 ? (
                    <div className='flex flex-col gap-10'>
                      {shift?.confirmStatus[index]?.map((item, index2) => {
                        return (
                          <div
                            key={'key' + index2}
                            className='flex items-center mt-10 mb-5 w-[220px]'
                          >
                            <Grid item sm={12} md={3}>
                              <CoreAutocomplete
                                name={`maintenanceShifts.0.confirmStatus.${index}.${index2}.status`}
                                control={control}
                                label={`${item.employee?.name} kiểm tra và đánh giá`}
                                placeholder={`${t(
                                  'self_maintenance.self_maintenance_check.placeholder.status'
                                )}`}
                                valuePath='value'
                                labelPath='label'
                                options={[
                                  {
                                    label: 'Hoạt động ổn định',
                                    value: null,
                                  },
                                  {
                                    label: 'Hoạt động ổn định',
                                    value: 'NORMAL',
                                  },
                                  {
                                    label: 'Dừng máy',
                                    value: 'PAUSED',
                                  },
                                ]}
                                rules={{
                                  required: t('common:validation.required'),
                                }}
                                returnValueType='enum'
                                isViewProp={true}
                                sx={{
                                  width: '220px',
                                }}
                              />
                            </Grid>

                            <Image
                              src={require('@/assets/svg/error.svg')}
                              alt=''
                              style={{
                                marginBottom: '4px',
                              }}
                              onClick={() => {
                                if (
                                  getValues(
                                    `maintenanceShifts.0.confirmStatus.${index}.${index2}.status`
                                  ) === 'PAUSED'
                                ) {
                                  setIsShowDialogPauseMachine(true)
                                  setShutdownInformation(
                                    item.shutdownInformationResponse
                                  )
                                  setIsViewPropMaintenanceAssessment(true)
                                } else {
                                  setIsShowDialog(true)
                                  setMaintenanceShiftId(shift.shift[index].id)
                                  setIsViewPropMaintenanceAssessment(true)
                                  setInfoRecorderAndStatus({
                                    name: item.employee?.name,
                                    status: item.status,
                                  })
                                  setIsApproveAll(item.isApproveAll)
                                  setRoleId(item.roleId)
                                }
                              }}
                            />
                          </div>
                        )
                      })}
                    </div>
                  ) : (
                    <Grid item sm={12} md={3} className='min-w-[220px]'></Grid>
                  )}
                </TableCellNoneBorder>
              )
            })
          })}
        </Table>
      </TableContainerCommon>
      {isShowDialogDetailError && (
        <DialogDetailError
          hideDialog={() => {
            setIsShowDialogDetailError(false)
          }}
          incidentRecordingId={incidentRecordingId}
        />
      )}

      {isShowDialog && (
        <MaintenanceAssessment
          maintenanceShiftId={maintenanceShiftId}
          maintenanceScheduleId={getValues('id')}
          hideDialog={() => {
            setIsShowDialog(false)
          }}
          infoRecorderAndStatus={infoRecorderAndStatus}
          isViewProp={isViewPropMaintenanceAssessment}
          isApproveAll={isApproveAll}
          roleId={roleId}
        />
      )}

      {isShowDialogPauseMachine && (
        <DialogPauseMachine
          hideDialogPauseMachine={hideDialogPauseMachine}
          asset={getValues('asset')}
          maintenanceScheduleShiftId={getValues('currentShift.id')}
          startHour={getValues('currentShift.startHour')}
          shutdownInformation={shutdownInformation}
          isViewProp={true}
        />
      )}
    </>
  )
}
