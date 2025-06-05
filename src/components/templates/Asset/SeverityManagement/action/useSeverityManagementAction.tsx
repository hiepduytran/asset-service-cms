import { useDialog } from '@/components/hooks/dialog/useDialog'
import { useFormCustom } from '@/lib/form'
import { MENU_URL, TRANSLATE } from '@/routes'
import {
  postSeverityManagement,
  putSeverityManagement,
  useQueryGetSeverityManagement,
} from '@/service/asset/severityManagement/action'
import { SeverityManagementDetail } from '@/service/asset/severityManagement/action/type'
import { toastError, toastSuccess } from '@/toast'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useMutation } from 'react-query'
const defaultValues = {
  code: '',
  name: '',
  level: NaN,
  note: '',
  isActive: true,
}
export default function useSeverityManagementAction() {
  const { t } = useTranslation(TRANSLATE.SEVERITY_MANAGEMENT)
  const router = useRouter()
  const { id, actionType } = router.query
  const isView = actionType === 'VIEW'
  const isUpdate = !!id
  const methods = useFormCustom<SeverityManagementDetail>({ defaultValues })
  const { handleSubmit, reset } = methods
  const { showDialog } = useDialog()

  const { mutate, isLoading } = useMutation(
    isUpdate ? putSeverityManagement : postSeverityManagement,
    {
      onSuccess: (res) => {
        toastSuccess(t('common:message.success'))
        router.push({
          pathname: `${MENU_URL.SEVERITY_MANAGEMENT}/[id]`,
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
    data: dataGetSeverityManagement,
    isLoading: isLoadingGetSeverityManagement,
  } = useQueryGetSeverityManagement(
    {
      id: Number(id),
    },
    { enabled: isUpdate }
  )

  const onSubmit = handleSubmit((data) => {
    mutate({ ...data, managementType: 'SEVERITY_MANAGEMENT' })
  })

  const onCancel = () => {
    router.push(MENU_URL.SEVERITY_MANAGEMENT)
  }

  useEffect(() => {
    if (isUpdate && dataGetSeverityManagement) {
      // setValue('id', dataGetSeverityManagement.data.id)
      // setValue('code', dataGetSeverityManagement.data.code)
      // setValue('name', dataGetSeverityManagement.data.name)
      // setValue('level', dataGetSeverityManagement.data.level)
      // setValue('note', dataGetSeverityManagement.data.note)
      // setValue('isDefault', dataGetSeverityManagement.data.isDefault)
      // setValue('isActive', dataGetSeverityManagement.data.isActive)
      // setValue('isUsed', dataGetSeverityManagement.data.isUsed)
      reset(dataGetSeverityManagement.data)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataGetSeverityManagement])

  return [
    {
      methods,
      isView,
      isUpdate,
      router,
      id,
      isLoading,
      isLoadingGetSeverityManagement,
    },
    { t, onSubmit, showDialog, onCancel },
  ] as const
}
