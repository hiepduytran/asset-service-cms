import { useDialog } from '@/components/hooks/dialog/useDialog'
import { MENU_URL, TRANSLATE } from '@/routes'
import { deleteJobDeclaration } from '@/service/asset/jobDeclaration/action'
import { toastError, toastSuccess } from '@/toast'
import { useRouter } from 'next/router'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useMutation } from 'react-query'

const useDialogJobDeclaration = () => {
  const { t } = useTranslation(TRANSLATE.JOB_DECLARATION)

  const { hideDialog } = useDialog()
  const router = useRouter()
  const { id } = router.query

  const { mutate, isLoading } = useMutation(deleteJobDeclaration, {
    onSuccess: () => {
      toastSuccess(t('common:message.success'))
      router.push({
        pathname: `${MENU_URL.JOB_DECLARATION}`,
      })
      hideDialog()
    },
    onError: (error) => {
      toastError(error)
    },
  })

  const onSubmit = () => {
    mutate({ id: Number(id) })
  }
  return [{ isLoading }, { t, hideDialog, onSubmit }] as const
}

export default useDialogJobDeclaration
