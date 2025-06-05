import { useDate } from '@/components/hooks/date/useDate'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import EditIcon from '@/components/icons/EditIcon'
import { ColumnProps } from '@/components/organism/CoreTable'
import { DialogIncidentHistory } from '@/components/templates/Asset/MaintenancePlan/IncidentList/components/DialogIncidentHistory'
import { TRANSLATE } from '@/routes'
import {
  deleteDialogIncidentAuto,
  putDialogIncidentAuto,
} from '@/service/asset/maintenance/selfMaintenance/selfMaintenancePerform/action'
import { AutoMaintenanceConvert } from '@/service/asset/maintenance/selfMaintenance/selfMaintenancePerform/detail/type'
import { useQueryGetIncidentRecordingMaintenanceAuto } from '@/service/asset/maintenance/selfMaintenance/selfMaintenancePerform/dialog'
import { IncidentRecordingMaintenanceAuto } from '@/service/asset/maintenance/selfMaintenance/selfMaintenancePerform/dialog/type'

import { toastError, toastSuccess } from '@/toast'
import { Typography } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useMutation } from 'react-query'
type Props = {
  hideDialogListIncident: () => void
  productId: number
}
export default function useDialogListIncident(props: Props) {
  const { hideDialogListIncident, productId } = props
  const { t } = useTranslation(TRANSLATE.INCIDENT_LOG_LIST)
  const methods = useFormContext<AutoMaintenanceConvert>()
  const { control, getValues, setValue, setError, watch } = methods

  const { actionType, id } = useRouter().query
  const isView = actionType === 'VIEW'
  const isUpdate = !!id

  const { showDialog } = useDialog()
  const { convertToTime } = useDate()

  const [isShowDialogIncident, setIsShowDialogIncident] =
    useState<boolean>(false)
  const [type, setType] = useState<string>('')
  const [queryPage, setQueryPage] = useState<{
    page: number
    size: number
  }>({
    page: 0,
    size: 10,
  })
  const [dataLineIncident, setDataLineIncident] =
    useState<IncidentRecordingMaintenanceAuto>()
  const [indexLine, setIndexLine] = useState<number>(0)

  const { fields } = useFieldArray({
    control,
    name: `recordConditionType`,
    keyName: 'key',
  })

  const onChangePageSize = (val: any) => {
    const { page, size } = val
    const input = { ...queryPage, page, size }
    setQueryPage(input)
  }

  const { mutate } = useMutation(deleteDialogIncidentAuto, {
    onSuccess: (res) => {
      toastSuccess(t('common:message.success'))
      hideDialogIncident()
      refetchGetIncidentRecordingMaintenance &&
        refetchGetIncidentRecordingMaintenance()
    },
    onError: (error) => {
      toastError(error, setError)
    },
  })

  const { mutate: putDialogIncidentAutoPut } = useMutation(
    putDialogIncidentAuto,
    {
      onSuccess: () => {
        toastSuccess(t('common:message.success'))
        refetchGetIncidentRecordingMaintenance &&
          refetchGetIncidentRecordingMaintenance()
      },
      onError: (error) => {
        toastError(error, setError)
      },
    }
  )

  const columns = useMemo(() => {
    return [
      {
        header: 'Mã sự cố',
        fieldName: 'code',
      },
      {
        header: 'Tên sự cố',
        fieldName: 'name',
      },
      {
        header: 'Lý do',
        fieldName: 'reason',
      },
      {
        header: 'Mức độ nghiêm trọng',
        fieldName: 'severityLevels',
      },
      {
        header: 'Nguồn',
        fieldName: 'selfMaintenanceType',
      },
      {
        header: 'Vị trí sự cố',
        fieldName: 'incidentLocation.name',
      },
      {
        header: 'Người ghi nhận',
        fieldName: 'recorder.name',
      },
      {
        header: 'Thời gian ghi nhận',
        fieldName: 'recordingTime',
      },

      {
        header: 'Hành động',
        fieldName: 'actionIcon',
        styleCell: {
          style: {
            minWidth: '150px',
          },
        },
      },
    ] as ColumnProps[]
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t])

  const {
    data: dataGetIncidentRecordingMaintenance,
    isLoading: isLoadingGetIncidentRecordingMaintenance,
    refetch: refetchGetIncidentRecordingMaintenance,
  } = useQueryGetIncidentRecordingMaintenanceAuto({
    ...queryPage,
    isGetAll: false,
    assetId: productId,
    incidentLocationIds: [
      ...getValues(`maintenanceShifts.0.groupStandard`).flatMap((item) =>
        item.items.map((item2) => item2.accessory.id)
      ),
      0,
    ],
  })

  const hideDialogIncident = () => {
    setIsShowDialogIncident(false)
  }

  const changeSelfMaintenanceType = (selfMaintenanceType: string | null) => {
    if (selfMaintenanceType === 'OPERATE')
      return <Typography>Vận hành</Typography>
    if (selfMaintenanceType === 'RECOVERY')
      return <Typography>Thu hồi</Typography>
    if (selfMaintenanceType === 'INCIDENT_REPORT')
      return <Typography>Báo cáo</Typography>
    if (selfMaintenanceType === 'SELF_MAINTENANCE')
      return <Typography>Tự bảo dưỡng</Typography>
  }

  const handleChangeRecordConditionTypeSave = (id?: number) => {
    setValue(`recordConditionTypeSave`, [
      ...((getValues(`recordConditionTypeSave`) ?? []).filter(
        (item: number) => item !== id
      ) ?? []),
      Number(id),
    ])
  }

  const recordConditionTypeStorageFn = useCallback(
    (data: IncidentRecordingMaintenanceAuto) => {
      setValue(`recordConditionTypeReview`, [
        ...(getValues(`recordConditionTypeReview`)?.filter(
          (item) => item.code !== data?.code
        ) ?? []),
        data,
      ])
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [indexLine]
  )

  const tableData = fields.map((item, index) => {
    return {
      ...item,
      recordingTime: (
        <Typography>{convertToTime(item.recordingTime)}</Typography>
      ),
      severityLevels: (
        <div className='flex flex-col gap-4'>
          {item.severityLevels.map((item, index2) => {
            return (
              <div key={item.severityManagement.id}>
                Lần {index2 + 1}: {item.severityManagement.name}
              </div>
            )
          })}
        </div>
      ),
      selfMaintenanceType: (
        <div className='flex gap-4'>
          <Typography>
            {changeSelfMaintenanceType(item.selfMaintenanceType)}
          </Typography>
          <Image
            src={require('@/assets/svg/errorBlack.svg')}
            alt=''
            onClick={() => {
              showDialog(<DialogIncidentHistory id={item?.id} />)
            }}
          />
        </div>
      ),
      actionIcon:
        getValues(`recordConditionType.${index}.approveStatus`) ===
        'APPROVED' ? (
          <div
            onClick={() => {
              toastError('Sự cố này đã được phê duyệt')
            }}
            className='text-[#2B62AE]'
          >
            Đánh giá lại
          </div>
        ) : item.actionType === 'REVIEW_AGAIN' ||
          !getValues(`recordConditionTypeSave`)?.includes(item.id) ? (
          <div
            onClick={() => {
              setIsShowDialogIncident(true)
              setType('REVIEW_AGAIN')
              setDataLineIncident(item)
              setIndexLine(index)
            }}
            className='text-[#2B62AE]'
          >
            Đánh giá lại
          </div>
        ) : (
          <div className='flex items-center gap-8'>
            <div
              onClick={() => {
                setIsShowDialogIncident(true)
                setType(item.actionType)
                setDataLineIncident(item)
                setIndexLine(index)
              }}
            >
              <EditIcon />
            </div>
            <Image
              src={require('@/assets/svg/action/delete.svg')}
              alt='remove'
              width={16}
              height={16}
              onClick={() => {
                mutate({
                  id: item.id,
                })

                // if (
                //   item.actionType === 'EDIT_NEW' &&
                //   getValues(`recordConditionTypeSave`)?.includes(item.id)
                // ) {
                //   mutate({ id: item.id })
                // } else {
                //   const storage = watch(`recordConditionTypeReview`) ?? []
                //   const value = storage.find(
                //     (entry) => entry.code === item.code
                //   )

                //   if (value) {
                //     // putDialogIncidentAutoPut({
                //     //   ...value,
                //     //   id: item.id,
                //     //   selfMaintenanceType: 'SELF_MAINTENANCE',
                //     //   recordingStatus: 'REVIEW_AGAIN',
                //     //   actionType: 'REVIEW_AGAIN',
                //     //   severityManagement:
                //     //     value.severityLevels[value.severityLevels.length - 1]
                //     //       .severityManagement,
                //     //   asset: {
                //     //     id: productId,
                //     //     name: '',
                //     //     code: '',
                //     //   },
                //     //   numberOfReviewType: `Review_${
                //     //     item.selfMaintenanceType === 'SELF_MAINTENANCE'
                //     //       ? 1
                //     //       : item.severityLevels.length - 1
                //     //   }`,
                //     //   isFinalReview: true,
                //     //   approveStatus: 'PENDING',
                //     // })
                //     mutate({
                //       id: item.id,
                //     })
                //   }
                // }
              }}
            />
          </div>
        ),
    }
  })

  const onSubmit = () => {
    hideDialogListIncident()
  }

  useEffect(() => {
    if (dataGetIncidentRecordingMaintenance) {
      setValue(
        `recordConditionType`,
        dataGetIncidentRecordingMaintenance.data.content
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataGetIncidentRecordingMaintenance])

  return [
    {
      methods,
      columns,
      isView,
      isShowDialogIncident,
      type,
      tableData,
      isLoadingGetIncidentRecordingMaintenance,
      page: dataGetIncidentRecordingMaintenance
        ? {
            page: dataGetIncidentRecordingMaintenance.data.page,
            size: dataGetIncidentRecordingMaintenance.data.size,
            totalPages: dataGetIncidentRecordingMaintenance.data.totalPages,
          }
        : null,
      dataLineIncident,
      indexLine,
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
  ] as const
}
