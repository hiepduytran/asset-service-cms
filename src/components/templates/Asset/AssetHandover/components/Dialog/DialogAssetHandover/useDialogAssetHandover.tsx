import { toastError, toastSuccess } from '@/toast'
import { useFormCustom } from '@/lib/form'
import { MENU_URL, TRANSLATE } from '@/routes'
import { postAssetHandover } from '@/service/asset/assetHandover/action'
import { TransferAssetDetail } from '@/service/asset/assetHandover/detail/type'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { useMutation } from 'react-query'

type Props = {
  hideDialog: () => void
  type?: string
  data: TransferAssetDetail
}
export default function useDialogAssetHandover(props: Props) {
  const { hideDialog, type, data } = props
  const { t } = useTranslation(TRANSLATE.ASSET_HANDOVER)
  const methods = useFormCustom<TransferAssetDetail>()
  const router = useRouter()
  const id = Number(router.query?.id)
  const { actionType } = router.query
  const isView = actionType === 'VIEW'
  const isUpdate = !!id
  const { handleSubmit } = methods

  const { mutate: mutateAssetHandover, isLoading: isLoadingAssetHandover } =
    useMutation(postAssetHandover, {
      onSuccess: (res) => {
        toastSuccess(t('common:message.success'))
        router.push({
          pathname: `${MENU_URL.ASSET_HANDOVER}/[id]`,
          query: {
            id: res.data.id,
            actionType: 'VIEW',
          },
        })
        // if (type === 'SUBMIT') {
        //   router.push({
        //     pathname: `${MENU_URL.ASSET_HANDOVER}/[id]`,
        //     query: {
        //       id: res.data.id,
        //       actionType: 'VIEW',
        //     },
        //   })
        // } else if (type === 'RECOVER_FORM') {
        //   router.push({
        //     pathname: `${MENU_URL.ASSET_HANDOVER}/[incident-log]`,
        //     query: {
        //       ['incident-log']: 'incident-log',
        //       id: res.data.id,
        //     },
        //   })
        // }
      },
      onError: (error) => {
        toastError(error)
      },
    })

  const onSubmit = handleSubmit(async (input) => {
    mutateAssetHandover({
      ...data,
      uploadSignature: (data.uploadSignature?.map((item) => item.url) ??
        [])[0],
    })
    hideDialog()
  })
  return [
    { methods, isLoadingAssetHandover },
    { t, onSubmit },
  ] as const
}
