import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import CoreInput from '@/components/atoms/CoreInput'
import { ColumnProps } from '@/components/organism/CoreTable'
import { useFormCustom } from '@/lib/form'
import { useAppSelector } from '@/redux/hook'
import { MENU_URL, TRANSLATE } from '@/routes'
import { getListCodesRecovery } from '@/service/asset/allocation/save/getListAsset'
import {
  postIncidentLog,
  putIncidentLog,
} from '@/service/asset/IncidentLogList/action'
import { useQueryGetIncidentLogDetail } from '@/service/asset/IncidentLogList/detail'
import { IncidentDetail } from '@/service/asset/IncidentLogList/detail/type'
import {
  getIncidentRecordingMaintenance,
  getIncidentRecordingMaintenanceIsUpdate,
} from '@/service/asset/IncidentLogList/list'
import { toastError, toastSuccess } from '@/toast'
import { IconButton, Typography } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import { useFieldArray } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useMutation } from 'react-query'
import { SelectBoxCustom } from '../../../../atoms/SelectBoxCustom'
const defaultValues = {
  code: '',
  recordDate: '',
  recorder: null,
  allocationChooseType: 'ORGANIZATION',
  reasonRecall: null,
  feature: null,
  reference: null,
  note: '',
  asset: [
    {
      assetIdentity: null,
      product: null,
      recordConditionType: [],
      recordConditionTypeSave: [],
      handlingPlanType: '',
    },
  ],
}
export default function useIncidentLogListAction() {
  const { t } = useTranslation(TRANSLATE.INCIDENT_LOG_LIST)
  const router = useRouter()
  const { id, actionType } = router.query
  const methods = useFormCustom<IncidentDetail>({ defaultValues })
  const isView = actionType === 'VIEW'
  const isUpdate = !!id

  const [dataFeatureList, setDataFeatureList] = useState<any>([])

  const {
    control,
    reset,
    setValue,
    handleSubmit,
    setError,
    trigger,
    watch,
    getValues,
  } = methods
  const org = useAppSelector((state) => state.orgData)

  const [lineIncidentProductId, setLineIncidentProductId] =
    useState<number>(NaN)

  const [isShowDialogListIncident, setIsShowDialogListIncident] =
    useState<boolean>(false)

  const [indexLine, setIndexLine] = useState(0)
  const [isClickDialogListIncident, setIsClickDialogListIncident] =
    useState(false)

  const {
    data: dataGetIncidentLogDetail,
    isLoading: isLoadingGetIncidentLogDetail,
  } = useQueryGetIncidentLogDetail(
    {
      id: Number(id),
    },
    {
      enabled: isUpdate,
    }
  )

  const {
    fields: fieldsIncidentLogAsset,
    append: appendIncidentLogAsset,
    remove: removeIncidentLogAsset,
  } = useFieldArray({
    control,
    keyName: 'key',
    name: 'asset',
  })

  useEffect(() => {
    if (dataGetIncidentLogDetail) {
      reset(dataGetIncidentLogDetail.data)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataGetIncidentLogDetail])

  useEffect(() => {
    if (org) {
      setValue('org', org)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const { mutate: mutateIncidentLog, isLoading: isLoadingSubmitIncidentLog } =
    useMutation(isUpdate ? putIncidentLog : postIncidentLog, {
      onSuccess: (res) => {
        toastSuccess(t('common:message.success'))
        router.push({
          pathname: `${MENU_URL.INCIDENT_LOG_LIST}/[id]`,
          query: {
            id: res.data.id,
            actionType: 'VIEW',
          },
        })
      },
      onError: (error) => {
        toastError(error, setError)
      },
    })

  const onSubmit = handleSubmit(async (data) => {
    mutateIncidentLog({
      ...data,
      asset: data.asset.map((item) => {
        return {
          ...item,
          incidentRecodingIds: isClickDialogListIncident
            ? item.recordConditionTypeAll?.map((item2) => item2.id)
            : item.incidentRecodingIds,
        }
      }),
    })
  })

  const hideDialogListIncident = () => {
    setIsShowDialogListIncident(false)
  }

  const columns = useMemo(
    () =>
      [
        {
          header: t('table.assetIdentity'),
          fieldName: 'identity',
          styleCell: {
            style: {
              width: '250px',
            },
          },
        },
        {
          header: t('table.assetCode'),
          fieldName: 'assetCode',
        },
        {
          header: t('table.assetName'),
          fieldName: 'assetName',
        },
        {
          header: t('table.recordConditionType'),
          fieldName: 'recordConditionType',
        },
        {
          header: t('table.handlingPlanType'),
          fieldName: 'handlingPlanType',
        },
        {
          header: '',
          fieldName: 'delete',
          styleCell: {
            style: {
              minWidth: '60px',
              textAlign: 'center',
            },
          },
        },
      ] as ColumnProps[],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t]
  )

  const tableData = fieldsIncidentLogAsset.map((item, index: number) => {
    return {
      identity: (
        <SelectBoxCustom
          key={item.key}
          control={control}
          name={`asset.${index}.assetIdentity`}
          label=''
          placeholder={`${t('placeholder.identifierCode')}`}
          columns={[
            {
              header: 'Mã định danh',
              fieldName: 'code',
            },
            {
              header: 'Mã tài sản',
              fieldName: 'asset.code',
            },
            {
              header: 'Tên tài sản',
              fieldName: 'asset.name',
            },
          ]}
          fetchDataFn={getListCodesRecovery}
          labelPath='code'
          valuePath='id'
          isViewProp={isView}
          onChangeValue={(value) => {
            if (value) {
              setValue(`asset.${index}.product`, value?.asset)
              setValue(`asset.${index}.productId`, value?.productId)
            } else {
              setValue(`asset.${index}.product`, null)
              setValue(`asset.${index}.assetIdentity`, null)
              setValue(`asset.${index}.product.code`, '')
              setValue(`asset.${index}.product.name`, '')
              setValue(`asset.${index}.recordConditionType`, [])
              setValue(`asset.${index}.handlingPlanType`, '')
              setValue(`asset.${index}.productId`, undefined)
            }
          }}
          trigger={trigger}
        />
      ),
      assetCode: (
        <CoreInput
          key={item.key}
          name={`asset.${index}.product.code`}
          control={control}
          isViewProp
        />
      ),
      assetName: (
        <CoreInput
          key={item.key}
          name={`asset.${index}.product.name`}
          control={control}
          isViewProp
        />
      ),
      recordConditionType: isView ? (
        <div
          className='flex items-center gap-4 ml-4'
          onClick={() => {
            setIsShowDialogListIncident(true)
            setIndexLine(index)
          }}
        >
          <Typography color={'#1D4FA2'}>Xem chi tiết</Typography>
          <Image src={require('@/assets/svg/errorBlack.svg')} alt='' />
        </div>
      ) : (
        <div
          onClick={() => {
            if (!!getValues(`asset.${index}.assetIdentity`)) {
              setIsShowDialogListIncident(true)
              setLineIncidentProductId(
                getValues(`asset.${index}.productId`) ??
                  getValues(`asset.${index}.product.id`)
              )
              setIndexLine(index)
              setIsClickDialogListIncident(true)
            }
          }}
        >
          <Typography color={'#1D4FA2'}>
            {!!watch(`asset.${index}.assetIdentity`)
              ? 'Ghi nhận tình trạng'
              : ''}
          </Typography>
        </div>
      ),
      handlingPlanType: (
        <CoreAutocomplete
          key={item.key}
          control={control}
          name={`asset.${index}.handlingPlanType`}
          placeholder={`${t('placeholder.handlingPlanType')}`}
          options={[
            { label: 'Được thu hồi', value: 'QUALIFIED' },
            { label: 'Lập biên bản', value: 'UNQUALIFIED' },
          ]}
          isViewProp={isView}
          rules={{ required: t('common:validation.required') }}
          required
          returnValueType='enum'
        />
      ),
      delete: !isView ? (
        <IconButton
          onClick={() => {
            removeIncidentLogAsset(index)
          }}
        >
          <Image
            src={require('@/assets/svg/action/delete.svg')}
            alt='delete'
            width={16}
            height={16}
          />
        </IconButton>
      ) : (
        <></>
      ),
    }
  })

  return [
    {
      id,
      methods,
      isView,
      isUpdate,
      columns,
      tableData,
      router,
      isLoadingGetIncidentLogDetail,
      isLoadingSubmitIncidentLog,
      isLoadingFeatureList: false,
      dataFeatureList,
      isShowDialogListIncident,
      lineIncidentProductId,
      indexLine,
    },
    {
      t,
      onSubmit,
      appendIncidentLogAsset,
      setDataFeatureList,
      hideDialogListIncident,
    },
  ] as const
}
