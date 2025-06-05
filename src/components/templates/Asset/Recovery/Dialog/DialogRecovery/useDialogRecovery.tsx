import { toastError, toastSuccess } from '@/toast'
import { useFormCustom } from '@/lib/form'
import { MENU_URL, TRANSLATE } from '@/routes'
import { AssetRecoveryDetail } from '@/service/asset/recovery/detail/type'
import {
  postAssetRecovery,
  putAssetRecovery,
} from '@/service/asset/recovery/save'
import { AssetRecoverySave } from '@/service/asset/recovery/save/type'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { useMutation } from 'react-query'

type Props = {
  hideDialog: () => void
  type?: string
  data: AssetRecoveryDetail
}
export default function useDialogRecovery(props: Props) {
  const { hideDialog, type, data } = props
  const { t } = useTranslation(TRANSLATE.RECOVERY)
  const methods = useFormCustom<AssetRecoverySave>()
  const router = useRouter()
  const id = Number(router.query?.id)
  const isUpdate = !!id
  const { handleSubmit } = methods

  const { mutate, isLoading: isLoadingSubmit } = useMutation(
    isUpdate ? putAssetRecovery : postAssetRecovery,
    {
      onSuccess: (res) => {
        toastSuccess(t('common:message.success'))
        router.push({
          pathname: `${MENU_URL.RECOVERY}/[id]`,
          query: {
            id: res.data.id,
            actionType: 'VIEW',
          },
        })
        // if (type === 'SUBMIT') {
        //   router.push({
        //     pathname: `${MENU_URL.RECOVERY}/[id]`,
        //     query: {
        //       id: res.data.id,
        //       actionType: 'VIEW',
        //     },
        //   })
        // } else if (type === 'RECOVER_FORM') {
        //   router.push({
        //     pathname: `${MENU_URL.RECOVERY}/[incident-log]`,
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
    }
  )

  const onSubmit = handleSubmit(() => {
    mutate(data)
    hideDialog()
  })
  return [
    { methods, isLoadingSubmit },
    { t, onSubmit },
  ] as const
}
