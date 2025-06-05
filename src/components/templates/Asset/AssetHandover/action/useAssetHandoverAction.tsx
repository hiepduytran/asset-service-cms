import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import CoreInput from '@/components/atoms/CoreInput'
import { SelectBoxCustom } from '@/components/atoms/SelectBoxCustom'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import { ColumnProps } from '@/components/organism/CoreTable'
import { findFirstError } from '@/enum'
import { useFormCustom } from '@/lib/form'
import { useAppSelector } from '@/redux/hook'
import { TRANSLATE } from '@/routes'
import { getListCodesRecovery } from '@/service/asset/allocation/save/getListAsset'
import { useQueryGetTransferAssetDetail } from '@/service/asset/assetHandover/detail'
import { TransferAssetDetail } from '@/service/asset/assetHandover/detail/type'
import {
  getAllDepartment,
  getAllOrg,
} from '@/service/asset/requestAllocation/getList'
import { getEmployeeListByDepartmentId } from '@/service/resource/getEmployeeListByDepartmentId'
import { IconButton } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import { useFieldArray } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

const defaultValues = {
  code: '',
  transferDate: '',
  allocationChooseType: 'ORGANIZATION',
  reasonRecall: null,
  feature: null,
  reference: null,
  note: '',
  status: '',
  asset: [
    {
      assetIdentity: null,
      product: null,
      recordConditionType: null,
      handlingPlanType: null,
      allocationChooseType: null,
      organization: null,
      department: null,
      employee: null,
    },
  ],
}
export default function useAssetHandoverAction() {
  const { t } = useTranslation(TRANSLATE.ASSET_HANDOVER)
  const methods = useFormCustom<TransferAssetDetail>({ defaultValues })
  const router = useRouter()
  const { id, actionType } = router.query
  const isView = actionType === 'VIEW'
  const isUpdate = !!id
  const {
    reset,
    setValue,
    watch,
    trigger,
    formState: { errors },
    setFocus,
    getValues,
  } = methods
  const { control, handleSubmit } = methods
  const { showDialog } = useDialog()
  const {
    fields: fieldsTransferAssetDetail,
    append: appendTransferAssetDetail,
    remove: removeTransferAssetDetail,
  } = useFieldArray({
    control,
    name: 'asset',
    keyName: 'key',
  })
  const org = useAppSelector((state) => state.orgData)
  const [dataFeatureList, setDataFeatureList] = useState<any>([])
  const [isShowDialogHandover, setIsShowDialogHandover] = useState<{
    isShow: boolean
    type?: string
  }>({
    isShow: false,
  })

  const [isLoadingFeatureList, setIsLoadingFeatureList] = useState(false)
  const {
    data: dataGetTransferAssetDetail,
    isLoading: isLoadingGetTransferAssetDetail,
  } = useQueryGetTransferAssetDetail(
    {
      id: Number(id),
    },
    {
      enabled: isUpdate,
    }
  )

  const onSubmit = handleSubmit(() => {
    setIsShowDialogHandover({
      isShow: true,
      type: 'SUBMIT',
    })
  })

  const columns = useMemo(() => {
    return [
      {
        header: t('table.identifierCode'),
        fieldName: 'assetIdentity',
      },
      {
        header: t('table.assetCode'),
        fieldName: 'code',
      },
      {
        header: t('table.assetName'),
        fieldName: 'name',
      },
      {
        header: t('table.recordCondition'),
        fieldName: 'recordConditionType',
      },
      {
        header: t('table.handlingPlan'),
        fieldName: 'handlingPlanType',
        styleCell: {
          style: {
            minWidth: 220,
          },
        },
      },
      {
        header: t('table.allocationChooseType'),
        fieldName: 'allocationChooseType',
      },
      {
        header: t('table.organization'),
        fieldName: 'organization',
      },
      {
        header: t('table.department'),
        fieldName: 'department',
        styleCell: {
          style: {
            minWidth: 260,
          },
        },
      },
      {
        header: t('table.employee'),
        fieldName: 'employee',
        styleCell: {
          style: {
            minWidth: 250,
          },
        },
      },
      ...(isView
        ? []
        : [
          {
            header: '',
            fieldName: 'deleteRow',
            styleCell: {
              style: {
                minWidth: '80px',
              },
            },
          },
        ]),
    ] as ColumnProps[]
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t])

  const isInvalidAllocation = () => {
    const allocationType = watch('allocationChooseType')
    if (allocationType === 'ORGANIZATION') return false
    if (allocationType === 'DEPARTMENT') return !watch('department')
    return !watch('employee')
  }

  const tableData = fieldsTransferAssetDetail.map((item, index) => {
    return {
      ...item,
      assetIdentity: (
        <SelectBoxCustom
          control={control}
          name={`asset.${index}.assetIdentity`}
          label=''
          placeholder={`${t('placeholder.assetIdentity')}`}
          fetchDataFn={getListCodesRecovery}
          columns={[
            {
              header: t('table.identifierCode'),
              fieldName: 'code',
            },
            {
              header: t('table.assetCode'),
              fieldName: 'asset.code',
            },
            {
              header: t('table.assetName'),
              fieldName: 'asset.name',
            },
          ]}
          labelPath='code'
          valuePath='id'
          onChangeValue={(value) => {
            if (value) {
              setValue(`asset.${index}.product`, {
                id: value.asset.id,
                code: value.asset.code,
                name: value.asset.name,
              })
              setValue(`asset.${index}.assetIdentity`, {
                id: value.id,
                code: value.code,
              })
            } else {
              setValue(`asset.${index}.assetIdentity`, null)
              setValue(`asset.${index}.product`, null)
            }
          }}
          params={{
            allocationChooseType: getValues('allocationChooseType'),
            orgId: getValues('organization.id'),
            departmentId: getValues('department.id'),
            employeeId: getValues('employee.id'),
            removeIds: fieldsTransferAssetDetail.map(
              (item, i) => watch(`asset.${i}.assetIdentity`)?.id
            ),
          }}
          disabled={isInvalidAllocation()}
          trigger={trigger}
        />
      ),
      code: (
        <CoreInput
          name={`asset.${index}.product.code`}
          control={control}
          placeholder={''}
          isViewProp
        />
      ),
      name: (
        <CoreInput
          name={`asset.${index}.product.name`}
          control={control}
          placeholder={''}
          isViewProp
        />
      ),
      recordConditionType: (
        <CoreAutocomplete
          name={`asset.${index}.recordConditionType`}
          control={control}
          placeholder={'Chọn ghi nhận trạng thái'}
          options={[
            {
              label: t('label.normal'),
              value: 'NORMAL',
            },
            {
              label: t('label.broken'),
              value: 'BROKEN',
            },
          ]}
          returnValueType='enum'
          required
          rules={{
            required: t('common:validation.required'),
          }}
        />
      ),
      handlingPlanType: (
        <CoreAutocomplete
          name={`asset.${index}.handlingPlanType`}
          control={control}
          placeholder={`${t('placeholder.handlingPlanType')}`}
          options={[
            {
              label: t('label.eligible'),
              value: 'QUALIFIED',
            },
            {
              label: t('label.notEligible'),
              value: 'UNQUALIFIED',
            },
          ]}
          required
          rules={{
            required: t('common:validation.required'),
          }}
        />
      ),
      allocationChooseType: (
        <CoreAutocomplete
          name={`asset.${index}.allocationChooseType`}
          control={control}
          placeholder={`${t('placeholder.allocationChooseType')}`}
          options={[
            {
              value: 'ORGANIZATION',
              label: t('table.organization'),
            },
            {
              value: 'DEPARTMENT',
              label: t('table.department'),
            },
            {
              value: 'EMPLOYEE',
              label: t('table.employee'),
            },
          ]}
          returnValueType='enum'
          onChangeValue={(val) => {
            if (val) {
              setValue(`asset.${index}.organization`, org)
            } else {
              setValue(`asset.${index}.organization`, null)
            }
          }}
          required
          rules={{
            required: t('common:validation.required'),
          }}
        />
      ),
      organization: watch(`asset.${index}.allocationChooseType`) ===
        'ORGANIZATION' && (
          <CoreAutoCompleteAPI
            placeholder={t('placeholder.organization')}
            name={`asset.${index}.organization`}
            control={control}
            label=''
            fetchDataFn={getAllOrg}
            isViewProp={true}
            onChangeValue={(value) => {
              if (value) {
                setValue(`asset.${index}.organization`, {
                  id: value.id,
                  name: value.name,
                })
              } else {
                setValue(`asset.${index}.organization`, null)
              }
            }}
            required
            rules={{
              required: t('common:validation.required'),
            }}
          />
        ),
      department: (watch(`asset.${index}.allocationChooseType`) ===
        'DEPARTMENT' ||
        watch(`asset.${index}.allocationChooseType`) === 'EMPLOYEE') && (
          <CoreAutoCompleteAPI
            name={`asset.${index}.department`}
            control={control}
            label=''
            fetchDataFn={getAllDepartment}
            placeholder={t('placeholder.department')}
            onChangeValue={(value) => {
              if (value) {
                setValue(`asset.${index}.department`, {
                  id: value.id,
                  name: value.name,
                  code: value.code,
                })
                setValue(`asset.${index}.employee`, null)
              } else {
                setValue(`asset.${index}.employee`, null)
              }
            }}
            required
            rules={{
              required: t('common:validation.required'),
            }}
          />
        ),
      employee: watch(`asset.${index}.allocationChooseType`) === 'EMPLOYEE' && (
        <CoreAutoCompleteAPI
          name={`asset.${index}.employee`}
          control={control}
          fetchDataFn={getEmployeeListByDepartmentId}
          label=''
          params={{
            departmentIds: [watch(`asset.${index}.department`)?.id],
          }}
          placeholder={t('placeholder.employee')}
          disabled={!watch(`asset.${index}.department`)}
          onChangeValue={(value) => {
            if (value) {
              setValue(`asset.${index}.employee`, {
                id: value.id,
                name: value.name,
                code: value.code,
              })
            } else {
              setValue(`asset.${index}.employee`, null)
            }
          }}
          required
          rules={{
            required: t('common:validation.required'),
          }}
        />
      ),
      deleteRow: !isView ? (
        <IconButton
          onClick={() => {
            removeTransferAssetDetail(index)
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

  const onRecoverForm = async () => {
    await trigger()
    if (errors && Object.keys(errors).length > 0) {
      const firstErrorKey = findFirstError(errors)
      if (firstErrorKey) {
        setFocus(firstErrorKey)
      }
      return
    }
    setIsShowDialogHandover({
      isShow: true,
      type: 'RECOVER_FORM',
    })
  }

  const hideDialog = () => {
    setIsShowDialogHandover({
      isShow: false,
    })
  }

  useEffect(() => {
    if (dataGetTransferAssetDetail) {
      reset(dataGetTransferAssetDetail.data)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataGetTransferAssetDetail])

  useEffect(() => {
    if (org) {
      setValue(`organization`, org)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    if (org) {
      fieldsTransferAssetDetail.forEach((item, index) => {
        setValue(`asset.${index}.organization`, org)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return [
    {
      id,
      methods,
      isView,
      isUpdate,
      router,
      tableData,
      columns,
      isLoadingGetTransferAssetDetail,
      dataFeatureList,
      isLoadingFeatureList,
      isShowDialogHandover,
      defaultValues,
    },
    {
      t,
      appendTransferAssetDetail,
      onSubmit,
      setDataFeatureList,
      setIsLoadingFeatureList,
      setIsShowDialogHandover,
      hideDialog,
      onRecoverForm,
      showDialog,
    },
  ] as const
}
