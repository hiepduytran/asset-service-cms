import { CoreButton } from '@/components/atoms/CoreButton'
import CoreCheckbox from '@/components/atoms/CoreCheckbox'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import {
  TableContainerCommon,
  TableHeadCommon,
} from '@/components/organism/CoreTable'
import {
  styled,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material'
import Image from 'next/image'
import { Fragment } from 'react'
import { TableCellNoneBorder } from '../../../../SelfMaintenanceCheck/action/components/TableCustom'
import DialogListIncident from '../DialogListIncident'
import styles from './style.module.css'
import useTableSelfMaintenancePerform from './useTableSelfMaintenancePerform'
import { DialogIncidentHistory } from '../DialogIncidentHistory'

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

export default function CoreTableSelfMaintenancePerform({
  refetchAutoMaintenances,
}: {
  refetchAutoMaintenances: any
}) {
  const [
    {
      methods,
      isShowDialogListIncident,
      maintenanceShiftsFields,
      isLoadingAutoMaintenanceApprove,
      isShowDialogDetailError,
      incidentRecordingId,
      isShowTooltip,
      hoveredCell,
    },
    {
      t,
      setIsShowDialogListIncident,
      setMaintenanceScheduleShiftId,
      onSubmit,
      setIsShowDialogDetailError,
      setIncidentRecordingId,
      setIsShowTooltip,
      handleMouseEnter,
      handleMouseLeave,
    },
  ] = useTableSelfMaintenancePerform({
    refetchAutoMaintenances,
  })
  const { control, getValues, watch, setValue } = methods

  const { showDialog } = useDialog()

  const maxKColumns = Math.max(
    ...(getValues('maintenanceShifts') ?? []).map((shift) => shift.shift.length)
  )

  const maxLColumns = Math.max(
    ...(getValues('maintenanceShifts') ?? []).flatMap((shift) =>
      shift?.groupStandard.flatMap((seq) =>
        seq.items.flatMap((line) => {
          return line.sequenceList.flatMap(
            (item) => item?.sequenceListItem?.length
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
                'self_maintenance.self_maintenance_perform.text.accessory'
              )}`}</TableCellHeader>
              <TableCellHeader rowSpan={2}>{`${t(
                'self_maintenance.self_maintenance_perform.text.staff'
              )}`}</TableCellHeader>
              {Array.from({ length: maxKColumns }, (_, index) => (
                <TableCellHeader key={`K${index + 1}`} colSpan={maxLColumns}>
                  {getValues('maintenanceShifts')[0].shift[index].name}
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
            {(getValues('maintenanceShifts') ?? []).map((shift, shiftIndex) => {
              return (
                <Fragment key={'key' + shiftIndex}>
                  {shift.groupStandard.map(
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
                          {standard.items.map((line, lineIndex: number) => (
                            <TableRow key={'key' + lineIndex}>
                              <TableCellWithBorderRightCustom
                                sx={{
                                  width: '60px',
                                }}
                              >
                                {lineIndex + 1}
                              </TableCellWithBorderRightCustom>
                              <TableCellWithBorderRightCustom
                                sx={{
                                  width: '200px',
                                }}
                              >
                                <div className='flex relative items-center justify-between'>
                                  <div className='text-left mr-5'>
                                    {line.accessory.name || ''}
                                  </div>
                                  <div className='relative flex items-center'>
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
                                          sx={{
                                            position: 'relative',
                                          }}
                                          key={'key' + index}
                                          onMouseEnter={() =>
                                            handleMouseEnter(item.id)
                                          }
                                          onMouseLeave={handleMouseLeave}
                                        >
                                          {item ? (
                                            <div className='relative flex items-center'>
                                              <CoreCheckbox
                                                control={control}
                                                name={`maintenanceShifts.${shiftIndex}.groupStandard.${standardIndex}.items.${lineIndex}.sequenceList.${indexLine}.sequenceListItem.${index}.isConfirm`}
                                                label=''
                                                isViewProp={
                                                  !shift.isShow[indexLine]
                                                }
                                                className={
                                                  'ml-[20%] md:ml-[25%] 2xl:ml-[40%]'
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
                                                onChangeValue={() => {
                                                  const sequenceListItem =
                                                    watch(
                                                      `maintenanceShifts.${shiftIndex}.groupStandard.${standardIndex}.items.${lineIndex}.sequenceList.${indexLine}.sequenceListItem.${index}`
                                                    )

                                                  setValue(`sequences`, [
                                                    ...watch(
                                                      `sequences`
                                                    ).filter(
                                                      (item) =>
                                                        item.shiftSequenceId !==
                                                        sequenceListItem.id
                                                    ),
                                                    {
                                                      shiftSequenceId:
                                                        sequenceListItem.id,
                                                      errorType:
                                                        sequenceListItem.errorType,
                                                      isHasError:
                                                        sequenceListItem.isHasError,
                                                      reasonError:
                                                        sequenceListItem.reasonError,
                                                      isConfirm:
                                                        sequenceListItem.isConfirm,
                                                    },
                                                  ])
                                                }}
                                              />
                                              <div className='h-[16px] flex items-center'>
                                                {line.sequenceList[indexLine]
                                                  .incidentRecording && (
                                                  <Image
                                                    src={require('@/assets/svg/error.svg')}
                                                    alt=''
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
                                                    style={{
                                                      cursor: 'pointer',
                                                    }}
                                                  />
                                                )}
                                                {hoveredCell === item.id &&
                                                  !shift.isShow[indexLine] && (
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
                                          key={'key' + indexLineNull}
                                        ></TableCellWithBorderRightCustom>
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
            return shift.isShow.map(
              (isShowItem: boolean, isShowIndex: number) => {
                if (
                  isShowItem &&
                  !shift.isShow.some(
                    (_, idx) => idx > isShowIndex && shift.isShow[idx]
                  )
                ) {
                  return (
                    <TableCellNoneBorder
                      key={'key' + isShowIndex}
                      sx={{ margin: '0 100px' }}
                      colSpan={maxLColumns}
                    >
                      {!getValues('maintenanceShifts.0.shift').find(
                        (item, indexShift) =>
                          item.id === getValues('currentShift.id') &&
                          isShowIndex === indexShift
                      ) && (
                        <CoreButton
                          theme='cancel'
                          sx={{ marginRight: '10px', marginTop: '10px' }}
                          onClick={() => {
                            setValue('maintenanceShiftId', [])
                          }}
                        >
                          {t('common:btn.destroy')}
                        </CoreButton>
                      )}
                      <CoreButton
                        sx={{
                          marginRight: '10px',
                          marginTop: '10px',
                          minWidth: '70px',
                        }}
                        onClick={onSubmit}
                        loading={isLoadingAutoMaintenanceApprove}
                      >
                        Ghi nhận
                      </CoreButton>
                      {!!getValues('maintenanceShifts.0.shift').find(
                        (item, indexShift) =>
                          item.id === getValues('currentShift.id') &&
                          isShowIndex === indexShift
                      ) && (
                        <CoreButton
                          sx={{ marginTop: '10px', minWidth: '100px' }}
                          onClick={() => {
                            setIsShowDialogListIncident(true)
                            setMaintenanceScheduleShiftId(getValues('id'))
                          }}
                        >
                          Khai báo sự cố
                        </CoreButton>
                      )}
                    </TableCellNoneBorder>
                  )
                } else {
                  return (
                    <TableCellNoneBorder
                      key={'key' + isShowIndex}
                      sx={{ margin: '0 100px' }}
                      colSpan={maxLColumns}
                    />
                  )
                }
              }
            )
          })}
        </Table>
      </TableContainerCommon>
      {isShowDialogListIncident && (
        <DialogListIncident
          hideDialogListIncident={() => {
            refetchAutoMaintenances()
            setIsShowDialogListIncident(false)
          }}
          productId={getValues('asset.id')}
          maintenanceScheduleShiftId={getValues('currentShift.id')}
          maintenanceScheduleId={getValues('id')}
        />
      )}
      {/* {isShowDialogDetailError && (
        <DialogIncidentHistory
          hideDialog={() => {
            setIsShowDialogDetailError(false)
          }}
          id={incidentRecordingId}
        />
      )} */}
    </>
  )
}
