import { useFormCustom } from '@/lib/form'
import { TRANSLATE } from '@/routes'
import { useTranslation } from 'next-i18next'
import { useMutation } from 'react-query'
import { toastError, toastSuccess } from '@/toast'
import { useEffect } from 'react'
import { useFieldArray } from 'react-hook-form'
import { PolicyRoleSave } from '@/service/asset/policyRole/type'
import {
  postPolicyRole,
  putPolicyRole,
  useQueryPolicyRole,
} from '@/service/asset/policyRole'
import { getCmsToken } from '@/config/token'

const defaultValues = {
  policy: null,
  policyRoleMap: [
    {
      role: null,
      staff: [],
    },
  ],
}

export const usePolicyRole = () => {
  const { t } = useTranslation(TRANSLATE.POLICY_ROLE)
  const methodForm = useFormCustom<PolicyRoleSave>({
    defaultValues,
  })
  const { fields, append, remove } = useFieldArray({
    control: methodForm.control,
    name: 'policyRoleMap',
  })
  const tokenAccess: any = getCmsToken()
  const { data, isLoading, refetch } = useQueryPolicyRole({})
  useEffect(() => {
    if (data?.data) {
      methodForm.reset(data?.data)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.data])

  const { mutate, isLoading: isLoadingSubmit } = useMutation(
    data?.data ? putPolicyRole : postPolicyRole,
    {
      onSuccess: (res) => {
        toastSuccess(t('common:message.success'))
        if (res?.data) {
          refetch()
        }
      },
      onError: (error) => {
        toastError(error)
      },
    }
  )

  const onSubmit = methodForm.handleSubmit(async (data) => {
    mutate(data)
  })
  const onCancel = () => {
    methodForm.reset()
  }

  const exceptValuesRole = methodForm.watch('policyRoleMap').map((item) => {
    return {
      id: item.role?.id,
      name: item.role?.name,
    }
  })

  return [
    {
      methodForm,
      isLoading,
      isLoadingSubmit,
      fields,
      tokenAccess,
      exceptValuesRole,
    },
    { t, onSubmit, onCancel, append, remove },
  ] as const
}
