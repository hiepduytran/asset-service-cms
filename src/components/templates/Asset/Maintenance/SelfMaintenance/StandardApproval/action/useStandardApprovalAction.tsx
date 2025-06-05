import { toastError, toastSuccess } from '@/toast'
import { useFormCustom } from '@/lib/form'
import { MENU_URL, TRANSLATE } from '@/routes'
import {
  changeStatusApprove,
  useQueryGetStandardApproveDetail,
} from '@/service/asset/maintenance/selfMaintenance/standardApproval/action'
import { StandardApproval } from '@/service/asset/maintenance/selfMaintenance/standardApproval/action/type'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useFieldArray } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useMutation } from 'react-query'

const defaultValues = {}
export default function useStandardApprovalAction() {
  const { t } = useTranslation(TRANSLATE.STANDARD_APPROVAL)
  const methods = useFormCustom<StandardApproval>({ defaultValues })
  const { control, handleSubmit, reset, setValue, setError } = methods
  const router = useRouter()
  const { actionType } = router.query
  const id = Number(router.query?.id)
  const isView = actionType === 'VIEW'
  const isUpdate = !!id
  const [step, setStep] = useState<number>(0)

  const { fields: standardMethodGroupFields } = useFieldArray({
    control,
    name: 'standardMethodGroups',
    keyName: 'key',
  })

  const onSubmit = handleSubmit((data) => {
    console.log(data)
  })

  const { data: dataDetail, isLoading } = useQueryGetStandardApproveDetail(
    {
      id: id,
    },
    { enabled: !!id }
  )

  const handleChangeStatus = (status: string) => {
    if (!!id && !!dataDetail) {
      mutate({
        id: id,
        status: status,
      })
    }
  }

  const { mutate, isLoading: isLoadingApprove } = useMutation(
    changeStatusApprove,
    {
      onSuccess: (res) => {
        toastSuccess(t('common:message.success'))
        router.push({
          pathname: `${MENU_URL.MAINTENANCE.SELF_MAINTENANCE.STANDARD_APPROVAL}`,
        })
      },
      onError: (error) => {
        toastError(error, setError)
      },
    }
  )

  useEffect(() => {
    if (!!id && !!dataDetail) {
      const data = dataDetail.data

      const convertStandardMethodGroups = data.standardMethodGroups?.filter(
        (item) =>
          item.standardMaintenanceLines.some((line) => line.product !== null)
      )
      reset({
        ...data,
        productName: data?.product?.name,
        standardMethodGroups: convertStandardMethodGroups,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, dataDetail])

  return [
    {
      methods,
      router,
      isView,
      isUpdate,
      step,
      dataDetail: dataDetail?.data,
      isLoading,
      isLoadingApprove,
      id,
      standardMethodGroupFields,
    },
    { t, onSubmit, handleChangeStatus },
  ] as const
}
