import { useDate } from '@/components/hooks/date/useDate'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import EditIcon from '@/components/icons/EditIcon'
import { ColumnProps } from '@/components/organism/CoreTable'
import { TRANSLATE } from '@/routes'
import { IncidentDetail } from '@/service/asset/IncidentLogList/detail/type'
import { deleteDialogIncident } from '@/service/asset/IncidentLogList/dialog'
import { IncidentRecordingMaintenance } from '@/service/asset/IncidentLogList/dialog/type'
import {
  getIncidentRecordingMaintenance,
  useQueryGetIncidentRecordingMaintenance,
} from '@/service/asset/IncidentLogList/list'
import { toastError, toastSuccess } from '@/toast'
import { Typography } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useMutation } from 'react-query'
import { DialogIncidentHistory } from '../../../MaintenancePlan/IncidentList/components/DialogIncidentHistory'
type Props = {
  hideDialogListIncident: () => void
  productId: number
  indexLine: number
}
export default function useDialogListIncident(props: Props) {
  const { indexLine, hideDialogListIncident } = props
  const { t } = useTranslation(TRANSLATE.INCIDENT_LOG_LIST)
  const methods = useFormContext<IncidentDetail>()
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
    size: 5,
  })
  const [dataRow, setDataRow] = useState<IncidentRecordingMaintenance>()
  const [index2Line, setIndex2Line] = useState<number>(0)

  const [dataIncidentListAll, setDataIncidentListAll] =
    useState<IncidentRecordingMaintenance[]>()

  const { fields } = useFieldArray({
    control,
    name: `asset.${indexLine}.recordConditionType`,
    keyName: 'key',
  })

  const onChangePageSize = (val: any) => {
    const { page, size } = val
    const input = { ...queryPage, page, size }
    setQueryPage(input)
  }

  const { mutate } = useMutation(deleteDialogIncident, {
    onSuccess: (res) => {
      toastSuccess(t('common:message.success'))
      hideDialogIncident()
      refetchGetIncidentRecordingMaintenance &&
        refetchGetIncidentRecordingMaintenance()
      handleChangeRecordConditionTypeSave()
    },
    onError: (error) => {
      toastError(error, setError)
    },
  })

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

      ...(isView
        ? []
        : [
            {
              header: 'Hành động',
              fieldName: 'actionIcon',
              styleCell: {
                style: {
                  minWidth: '150px',
                },
              },
            },
          ]),
    ] as ColumnProps[]
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t])

  const {
    data: dataGetIncidentRecordingMaintenance,
    isLoading: isLoadingGetIncidentRecordingMaintenance,
    refetch: refetchGetIncidentRecordingMaintenance,
  } = useQueryGetIncidentRecordingMaintenance({
    ...queryPage,
    isGetAll: false,
    assetId: getValues(`asset.${indexLine}.assetIdentity.id`) ?? 0,
  })

  const hideDialogIncident = () => {
    setIsShowDialogIncident(false)
  }

  const changeSelfMaintenanceType = (selfMaintenanceType: string) => {
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
    setValue(`asset.${indexLine}.recordConditionTypeSave`, [
      ...((
        getValues(`asset.${indexLine}.recordConditionTypeSave`) ?? []
      ).filter((item: number) => item !== id) ?? []),
      Number(id),
    ])
  }

  const recordConditionTypeStorageFn = useCallback(
    (data: IncidentRecordingMaintenance) => {
      setValue(`asset.${indexLine}.recordConditionTypeStorage`, [
        ...(getValues(`asset.${indexLine}.recordConditionTypeStorage`)?.filter(
          (item) => item.code !== data?.code
        ) ?? []),
        data,
      ])
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [indexLine, index2Line]
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
        getValues(
          `asset.${indexLine}.recordConditionType.${index}.approveStatus`
        ) === 'APPROVED' ? (
          <div
            onClick={() => {
              toastError('Sự cố này đã được phê duyệt')
            }}
            className='text-[#2B62AE]'
          >
            Đánh giá lại
          </div>
        ) : item.actionType === 'REVIEW_AGAIN' ||
          !getValues(`asset.${indexLine}.recordConditionTypeSave`)?.includes(
            item.id
          ) ? (
          <div
            onClick={() => {
              setIsShowDialogIncident(true)
              setType('REVIEW_AGAIN')
              setDataRow(item)
              setIndex2Line(index)
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
                setDataRow(item)
                setIndex2Line(index)
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
        `asset.${indexLine}.recordConditionType`,
        dataGetIncidentRecordingMaintenance.data.content
      )
      setValue(
        `asset.${indexLine}.incidentRecodingIds`,
        dataGetIncidentRecordingMaintenance.data.content.map((item) => item.id)
      )
      const fetDataIncidentListAll = async () => {
        const result = await getIncidentRecordingMaintenance({
          isGetAll: true,
          assetId: getValues(`asset.${indexLine}.assetIdentity.id`) ?? 0,
        })

        // setDataIncidentListAll(result.data.content)
        setValue(
          `asset.${indexLine}.recordConditionTypeAll`,
          result.data.content
        )
      }
      fetDataIncidentListAll()
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
        : // dataGetIncidentRecordingMaintenanceIsUpdate
          // ? {
          //     page: dataGetIncidentRecordingMaintenanceIsUpdate.data.page,
          //     size: dataGetIncidentRecordingMaintenanceIsUpdate.data.size,
          //     totalPages:
          //       dataGetIncidentRecordingMaintenanceIsUpdate.data.totalPages,
          //   }
          // :
          null,
      dataRow,
      index2Line,
      isLoadingGetIncidentRecordingMaintenanceIsUpdate: false,
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
      // refetchIncidentRecordingMaintenanceIsUpdate,
      onSubmit,
    },
  ] as const
}
