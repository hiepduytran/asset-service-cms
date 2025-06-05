import CoreCheckbox from '@/components/atoms/CoreCheckbox'
import {
  TableContainerCommon,
  TableHeadCommon,
} from '@/components/organism/CoreTable'
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

import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import { CoreButton } from '@/components/atoms/CoreButton'
import { FORMAT_DATE_TIME_API, useDate } from '@/components/hooks/date/useDate'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import { getListAssetStatusManagement } from '@/service/asset/assetStatusManagement/list'
import MaintenanceAssessment from '../dialog/MaintenanceAssessment'
import DialogPauseMachine from '../dialog/PauseMachine'
import useTableCustom from './useTableCustom'
import DialogListIncident from '../dialog/DialogListIncident'
import { DialogIncidentHistory } from '../../../../SelfMaintenancePerform/action/components/DialogIncidentHistory'

export type Props = {
  refetchAuditMaintenances: any
  dataGetInfoUser?: {
    id: number
    name: string
  }
}

export const TableCellHeader = styled(TableCell)(() => ({
  borderRight: '1px solid #DFE0EB',
  textAlign: 'center',
  fontWeight: '700',
}))

export const TableCellHeaderBody = styled(TableCell)(() => ({
  borderRight: '1px solid #DFE0EB',
  textAlign: 'center',
  backgroundColor: '#F1F8FF',
}))

export const TableCellWithBorderRightCustom = styled(TableCell)(() => ({
  borderRight: '1px solid #DFE0EB',
  textAlign: 'center',
  borderBottom: '1px solid #DFE0EB',
  width: '100px',
}))

export const TableCellNoneBorder = styled(TableCell)(() => ({
  borderRight: 'none',
  textAlign: 'center',
  borderBottom: 'none',
  width: '100px',
}))

export const TableCellNoneBorderTextLeft = styled(TableCell)(() => ({
  borderRight: 'none',
  textAlign: 'left',
  borderBottom: 'none',
  width: '100px',
}))

export default function TableCustomSelfMaintenanceCheck(props: Props) {
  const { refetchAuditMaintenances, dataGetInfoUser } = props
  const [
    {
      methods,
      maintenanceShiftAuditsFields,
      isLoadingAutoMaintenanceApprove,
      isShowDialog,
      isShowDialogErrorAssessmentView,
      sequenceId,
      isRenderReview,
      isShowDialogPauseMachine,
      isShowDialogDetailError,
      incidentRecordingId,
      isViewPropMaintenanceAssessment,
      isUpdateMaintenanceAssessment,
      infoRecorderAndStatus,
      isApproveAll,
      maintenanceShiftId,
      roleId,
      ratingId,
      shutdownInformation,
      severityManagement,
      isShowDialogListIncident,
    },
    {
      t,
      handleApprove,
      setIsShowDialog,
      setIsShowDialogErrorAssessmentView,
      setSequenceId,
      handleChangeRenderReview,
      hideDialogPauseMachine,
      setIsShowDialogPauseMachine,
      setIsShowDialogDetailError,
      setIncidentRecordingId,
      setIsViewPropMaintenanceAssessment,
      setIsUpdateMaintenanceAssessment,
      setInfoRecorderAndStatus,
      setIsApproveAll,
      setMaintenanceShiftId,
      setRoleId,
      setRatingId,
      setShutdownInformation,
      setIsRenderReview,
      compareHourAndMinute,
      getDateNowUTC,
      compareTimes,
      setSeverityManagement,
      setIsShowDialogListIncident,
    },
  ] = useTableCustom(props)
  const { control, getValues, setValue, watch } = methods

  const { showDialog } = useDialog()

  const { getDateNow } = useDate()

  const maxKColumns = Math.max(
    ...maintenanceShiftAuditsFields.map((shift) => shift.shift.length)
  )

  const maxLColumns = Math.max(
    ...maintenanceShiftAuditsFields.flatMap((shift) =>
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
    <>
      <CoreButton
        theme='submit'
        sx={{
          marginBottom: '10px',
        }}
        onClick={() => {
          setIsShowDialogListIncident(true)
        }}
      >
        {t('Danh sách sự cố')}
      </CoreButton>
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
                  {maintenanceShiftAuditsFields[0].shift[index].name}
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
            {maintenanceShiftAuditsFields.map((shift, shiftIndex) => {
              return (
                <Fragment key={shift.key}>
                  {shift.groupStandard.map((standard, standardIndex) => {
                    return (
                      <Fragment key={'key' + standardIndex}>
                        <TableRow>
                          <TableCellHeaderBody
                            style={{ textAlign: 'left' }}
                            colSpan={maxLColumns * maxKColumns + 3}
                          >
                            <Typography style={{ fontWeight: 700 }}>
                              {standard.group.name}
                            </Typography>
                          </TableCellHeaderBody>
                        </TableRow>
                        {standard.items.map((line, lineIndex: number) => (
                          <TableRow key={'key' + lineIndex}>
                            <TableCellWithBorderRightCustom>
                              {lineIndex + 1}
                            </TableCellWithBorderRightCustom>
                            <TableCellWithBorderRightCustom>
                              {line.accessory.name || ''}
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
                                      >
                                        {item ? (
                                          <div className='flex items-center'>
                                            <CoreCheckbox
                                              control={control}
                                              name={`maintenanceShiftAudits.${shiftIndex}.groupStandard.${standardIndex}.items.${lineIndex}.sequenceList.${indexLine}.sequenceListItem.${index}.isConfirm`}
                                              label=''
                                              isViewProp={true}
                                              className={
                                                'ml-[20%] md:[25%] 2xl:ml-[35%]'
                                              }
                                              styles={{
                                                opacity: 0.4,
                                                marginRight: '0',
                                              }}
                                            />
                                            {line.sequenceList[indexLine]
                                              .incidentRecording && (
                                              <Image
                                                src={require('@/assets/svg/error.svg')}
                                                alt=''
                                                style={{
                                                  cursor: 'pointer',
                                                }}
                                                // onClick={() => {
                                                //   setIsShowDialogErrorAssessmentView(
                                                //     true
                                                //   )
                                                //   setIsShowDialogDetailError(
                                                //     true
                                                //   )
                                                //   setSequenceId(
                                                //     line.sequenceList[indexLine]
                                                //       .sequenceListItem[index]
                                                //       .id
                                                //   )
                                                //   setIncidentRecordingId(
                                                //     line.sequenceList[indexLine]
                                                //       .incidentRecording.id
                                                //   )
                                                // }}
                                                onClick={() => {
                                                  showDialog(
                                                    <DialogIncidentHistory
                                                      id={
                                                        line.sequenceList[
                                                          indexLine
                                                        ].incidentRecording.id
                                                      }
                                                    />
                                                  )
                                                }}
                                              />
                                            )}
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
                  })}
                </Fragment>
              )
            })}
          </TableBody>
          <TableCellNoneBorder></TableCellNoneBorder>
          <TableCellNoneBorder></TableCellNoneBorder>
          <TableCellNoneBorder></TableCellNoneBorder>

          {maintenanceShiftAuditsFields.map((shift) => {
            return shift.shift.map((item, index) => {
              const userOrShutDownExists = (
                shift?.confirmStatus[index] ?? []
              ).some((item) => {
                return (
                  item.employee.id === dataGetInfoUser?.id ||
                  !!item.shutdownInformationResponse
                )
              })

              const userAndNormalExists = (
                shift?.confirmStatus[index] ?? []
              ).some(
                (item) =>
                  item.employee.id === dataGetInfoUser?.id &&
                  item.severityManagement?.code !== 'TT0002'
              )
              const userExists = (shift?.confirmStatus[index] ?? []).some(
                (item) => item.employee.id === dataGetInfoUser?.id
              )
              const shutdownInfo = (shift?.confirmStatus[index] ?? []).find(
                (item) => item.shutdownInformationResponse
              )

              const isWithinDateRange =
                compareTimes(
                  shutdownInfo?.shutdownInformationResponse.startDate ?? '',
                  getDateNowUTC(getDateNow(FORMAT_DATE_TIME_API))
                ) &&
                compareTimes(
                  getDateNowUTC(getDateNow(FORMAT_DATE_TIME_API)),
                  shutdownInfo?.shutdownInformationResponse.endDate ?? ''
                )
              const isWithinDateLess = compareTimes(
                getDateNowUTC(getDateNow(FORMAT_DATE_TIME_API)),
                shutdownInfo?.shutdownInformationResponse.endDate ?? ''
              )
              if (shift.isShow[index]) {
                return (
                  <TableCellNoneBorder
                    key={'key' + index}
                    sx={{ margin: '0 100px' }}
                    colSpan={maxLColumns}
                  >
                    <div className='flex flex-col'>
                      <div className='flex flex-col gap-10 items-start'>
                        {shift.confirmStatus[index]?.length > 0 &&
                          shift?.confirmStatus[index]?.map((item, index2) => {
                            return (
                              <div
                                key={'key' + index2}
                                className='flex items-end mt-10 mb-5'
                              >
                                <Grid
                                  item
                                  sm={12}
                                  md={3}
                                  className='min-w-[220px]'
                                >
                                  <CoreAutoCompleteAPI
                                    name={`maintenanceShiftAudits.0.confirmStatus.${index}.${index2}.severityManagement`}
                                    control={control}
                                    label={`${item.employee?.name} kiểm tra và đánh giá`}
                                    placeholder={`${t(
                                      'self_maintenance.self_maintenance_check.placeholder.status'
                                    )}`}
                                    valuePath='id'
                                    labelPath='name'
                                    // options={[
                                    //   {
                                    //     label: 'Hoạt động ổn định',
                                    //     value: null,
                                    //   },
                                    //   {
                                    //     label: 'Hoạt động ổn định',
                                    //     value: 'NORMAL',
                                    //   },
                                    //   {
                                    //     label: 'Dừng máy',
                                    //     value: 'PAUSED',
                                    //   },
                                    // ]}
                                    fetchDataFn={getListAssetStatusManagement}
                                    rules={{
                                      required: t('common:validation.required'),
                                    }}
                                    params={{
                                      managementType: 'ASSET_STATUS_MANAGEMENT',
                                      isActive: true,
                                    }}
                                    // returnValueType='enum'
                                    onChangeValue={(val: any) => {
                                      setValue('severityManagement', val)
                                    }}
                                    isViewProp={true}
                                  />
                                </Grid>

                                {
                                  <Image
                                    src={require('@/assets/svg/error.svg')}
                                    alt=''
                                    style={{
                                      marginBottom: '4px',
                                    }}
                                    onClick={() => {
                                      if (
                                        getValues(
                                          `maintenanceShiftAudits.0.confirmStatus.${index}.${index2}.severityManagement`
                                        )?.code === 'TT0002' ||
                                        getValues(
                                          `maintenanceShiftAudits.0.confirmStatus.${index}.${index2}.shutdownInformationResponse`
                                        )
                                      ) {
                                        setIsShowDialogPauseMachine(true)
                                        setShutdownInformation(
                                          item.shutdownInformationResponse
                                        )
                                        setIsViewPropMaintenanceAssessment(true)
                                      } else {
                                        setIsShowDialog(true)
                                        setMaintenanceShiftId(
                                          shift.shift[index].id
                                        )
                                        setIsViewPropMaintenanceAssessment(
                                          item.employee?.id !==
                                            dataGetInfoUser?.id
                                            ? true
                                            : undefined
                                        )
                                        setIsUpdateMaintenanceAssessment(
                                          item.employee?.id ===
                                            dataGetInfoUser?.id
                                        )
                                        setInfoRecorderAndStatus({
                                          name: item.employee?.name,
                                          status: item.status,
                                        })
                                        setIsApproveAll(item.isApproveAll)
                                        setRoleId(item.roleId)
                                        setRatingId(item.ratingId)
                                      }
                                    }}
                                  />
                                }
                              </div>
                            )
                          })}

                        {userAndNormalExists ||
                          ((!userOrShutDownExists || !isWithinDateRange) && (
                            <Grid
                              item
                              sm={12}
                              md={3}
                              className='min-w-[250px]'
                              sx={{ margin: '20px 0 0 0' }}
                            >
                              <CoreAutoCompleteAPI
                                name={`severityManagement`}
                                control={control}
                                label={`${dataGetInfoUser?.name} kiểm tra và đánh giá`}
                                placeholder={`${t(
                                  'self_maintenance.self_maintenance_check.placeholder.status'
                                )}`}
                                valuePath='id'
                                labelPath='name'
                                fetchDataFn={getListAssetStatusManagement}
                                params={{
                                  managementType: 'ASSET_STATUS_MANAGEMENT',
                                  isActive: true,
                                }}
                                rules={{
                                  required: t('common:validation.required'),
                                }}
                                isViewProp={false}
                                onChangeValue={(value) => {
                                  if (value?.code === 'TT0002') {
                                    setIsShowDialogPauseMachine(true)
                                    setShutdownInformation(undefined)
                                    setIsViewPropMaintenanceAssessment(false)
                                    setSeverityManagement(value)
                                  }
                                }}
                              />
                            </Grid>
                          ))}
                      </div>
                      {userAndNormalExists ||
                        ((!userExists || !isWithinDateRange) && (
                          <div className='flex gap-10 mt-10 mb-10'>
                            <CoreButton
                              onClick={handleApprove}
                              loading={isLoadingAutoMaintenanceApprove}
                              sx={{ minWidth: 70 }}
                            >
                              {t(
                                'self_maintenance.self_maintenance_check.btn.approve'
                              )}
                            </CoreButton>
                            <CoreButton
                              onClick={() => {
                                setIsShowDialog(true)
                                setMaintenanceShiftId(shift.shift[index].id)
                                setIsApproveAll(undefined)
                                setIsViewPropMaintenanceAssessment(undefined)
                                setIsUpdateMaintenanceAssessment(undefined)
                                setRoleId(undefined)
                              }}
                              sx={{ minWidth: 85 }}
                            >
                              {t(
                                'self_maintenance.self_maintenance_check.btn.review'
                              )}
                            </CoreButton>
                          </div>
                        ))}
                    </div>
                  </TableCellNoneBorder>
                )
              } else {
                return (
                  <TableCellNoneBorder
                    key={'key' + index}
                    colSpan={maxLColumns}
                  >
                    {shift.confirmStatus[index]?.length > 0 ? (
                      <div className='flex flex-col gap-10'>
                        {shift?.confirmStatus[index]?.map((item, index2) => {
                          if (
                            !item.shutdownInformationResponse ||
                            isWithinDateRange ||
                            !isWithinDateLess
                          ) {
                            return (
                              <div
                                key={'key' + index2}
                                className='flex items-end mt-10 mb-5'
                              >
                                <Grid
                                  item
                                  sm={12}
                                  md={3}
                                  className='min-w-[220px]'
                                >
                                  <CoreAutoCompleteAPI
                                    name={`maintenanceShiftAudits.0.confirmStatus.${index}.${index2}.severityManagement`}
                                    control={control}
                                    label={`${item.employee?.name} kiểm tra và đánh giá`}
                                    placeholder={`${t(
                                      'self_maintenance.self_maintenance_check.placeholder.status'
                                    )}`}
                                    fetchDataFn={getListAssetStatusManagement}
                                    params={{
                                      managementType: 'ASSET_STATUS_MANAGEMENT',
                                      isActiev: true,
                                    }}
                                    rules={{
                                      required: t('common:validation.required'),
                                    }}
                                    // returnValueType='enum'
                                    onChangeValue={(val: any) => {
                                      setValue('severityManagement', val)
                                    }}
                                    isViewProp={true}
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
                                        `maintenanceShiftAudits.0.confirmStatus.${index}.${index2}.severityManagement`
                                      )?.code === 'TT0002' ||
                                      getValues(
                                        `maintenanceShiftAudits.0.confirmStatus.${index}.${index2}.shutdownInformationResponse`
                                      )
                                    ) {
                                      setIsShowDialogPauseMachine(true)
                                      setShutdownInformation(
                                        item.shutdownInformationResponse
                                      )
                                      setIsViewPropMaintenanceAssessment(true)
                                    } else {
                                      setIsShowDialog(true)
                                      setMaintenanceShiftId(
                                        shift.shift[index].id
                                      )
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
                          }
                        })}
                      </div>
                    ) : (
                      <Grid
                        item
                        sm={12}
                        md={3}
                        className='min-w-[220px]'
                      ></Grid>
                    )}
                  </TableCellNoneBorder>
                )
              }
            })
          })}
        </Table>
      </TableContainerCommon>
      {isShowDialog && (
        <MaintenanceAssessment
          refetchAuditMaintenances={refetchAuditMaintenances}
          productId={getValues('asset.id')}
          maintenanceShiftId={maintenanceShiftId}
          maintenanceScheduleId={getValues('id')}
          hideDialog={() => {
            setIsShowDialog(false)
          }}
          isRenderReview={isRenderReview}
          handleChangeRenderReview={handleChangeRenderReview}
          infoRecorderAndStatus={infoRecorderAndStatus}
          isViewProp={isViewPropMaintenanceAssessment}
          isUpdateProp={isUpdateMaintenanceAssessment}
          isApproveAll={isApproveAll}
          roleId={roleId}
          ratingId={ratingId}
        />
      )}

      {isShowDialogListIncident && (
        <DialogListIncident
          productId={getValues('asset.id')}
          maintenanceScheduleShiftId={getValues('currentShift.id')}
          maintenanceScheduleId={getValues('id')}
          hideDialogListIncident={() => {
            setIsShowDialogListIncident(false)
          }}
        />
      )}

      {isShowDialogPauseMachine && (
        <DialogPauseMachine
          hideDialogPauseMachine={hideDialogPauseMachine}
          asset={getValues('asset')}
          maintenanceScheduleShiftId={getValues('currentShift.id')}
          startHour={getValues('currentShift.startHour')}
          refetchAuditMaintenances={refetchAuditMaintenances}
          shutdownInformation={shutdownInformation}
          severityManagement={severityManagement}
          isViewProp={isViewPropMaintenanceAssessment}
        />
      )}
    </>
  )
}
