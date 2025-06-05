import { useDialog } from '@/components/hooks/dialog/useDialog'
import { useFormCustom } from '@/lib/form'
import { MENU_URL, TRANSLATE } from '@/routes'
import {
  postAssetStatusManagement,
  putAssetStatusManagement,
  useQueryGetAssetStatusManagement,
} from '@/service/asset/assetStatusManagement/action'
import { AssetStatusManagementDetail } from '@/service/asset/assetStatusManagement/action/type'
import { toastError, toastSuccess } from '@/toast'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useMutation } from 'react-query'

const defaultValues = {
  code: '',
  name: '',
  note: '',
  isActive: true,
}

export default function useAssetStatusManagementAction() {
  const { t } = useTranslation(TRANSLATE.ASSET_STATUS_MANAGEMENT)
  const router = useRouter()
  const { id, actionType } = router.query
  const isView = actionType === 'VIEW'
  const isUpdate = !!id
  const methods = useFormCustom<AssetStatusManagementDetail>({ defaultValues })
  const { handleSubmit, reset, setValue } = methods
  const { showDialog } = useDialog()

  const { mutate, isLoading } = useMutation(
    isUpdate ? putAssetStatusManagement : postAssetStatusManagement,
    {
      onSuccess: (res) => {
        toastSuccess(t('common:message.success'))
        router.push({
          pathname: `${MENU_URL.ASSET_STATUS_MANAGEMENT}/[id]`,
          query: {
            id: res.data.id,
            actionType: 'VIEW',
          },
        })
      },
      onError: (error) => {
        toastError(error)
      },
    }
  )

  const {
    data: dataGetAssetStatusManagement,
    isLoading: isLoadingGetAssetStatusManagement,
  } = useQueryGetAssetStatusManagement(
    {
      id: Number(id),
    },
    { enabled: isUpdate }
  )

  const onSubmit = handleSubmit((data) => {
    mutate({ ...data, managementType: 'ASSET_STATUS_MANAGEMENT' })
  })

  const onCancel = () => {
    router.push(MENU_URL.ASSET_STATUS_MANAGEMENT)
  }

  useEffect(() => {
    if (isUpdate && dataGetAssetStatusManagement) {
      // setValue('id', dataGetAssetStatusManagement.data.id)
      // setValue('code', dataGetAssetStatusManagement.data.code)
      // setValue('name', dataGetAssetStatusManagement.data.name)
      // setValue('note', dataGetAssetStatusManagement.data.note)
      // setValue('isDefault', dataGetAssetStatusManagement.data.isDefault)
      // setValue('isActive', dataGetAssetStatusManagement.data.isActive)
      // setValue('isUsed', dataGetAssetStatusManagement.data.isUsed)
      reset(dataGetAssetStatusManagement.data)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataGetAssetStatusManagement])

  return [
    {
      methods,
      isView,
      isUpdate,
      router,
      id,
      isLoading,
      isLoadingGetAssetStatusManagement,
    },
    { t, onSubmit, showDialog, onCancel },
  ] as const
}
