import { useDialog } from '@/components/hooks/dialog/useDialog'
import { ColumnProps } from '@/components/organism/CoreTable'
import { useFormCustom } from '@/lib/form'
import { MENU_URL, TRANSLATE } from '@/routes'
import {
  postJobDeclaration,
  putJobDeclaration,
  useQueryGetJobDeclaration,
} from '@/service/asset/jobDeclaration/action'
import { JobDeclarationDetail } from '@/service/asset/jobDeclaration/action/type'
import { toastError, toastSuccess } from '@/toast'
import { useRouter } from 'next/router'
import { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useMutation } from 'react-query'

const defaultValues = {
  product: null,
  typeDeclaration: '',
  note: '',
  maintenanceWorkOverview: {
    maintenanceWorkDetails: [
      {
        content: '',
        standardTime: null,
      },
    ],
  },
  maintenanceWorkRepair: {
    maintenanceWorkDetails: [
      {
        content: '',
        standardTime: null,
      },
    ],
  },

  detailsWorkOverview: [
    {
      product: null,
      repairWorkDetails: [],
    },
  ],

  detailsWorkRepair: [
    {
      product: null,
      repairWorkDetails: [],
    },
  ],
}

export default function useJobDeclarationAction() {
  const { t } = useTranslation(TRANSLATE.JOB_DECLARATION)
  const methods = useFormCustom<JobDeclarationDetail>({ defaultValues })
  const router = useRouter()
  const { id, actionType } = router.query
  const isView = actionType === 'VIEW'
  const isUpdate = !!id
  const { handleSubmit, setError, reset } = methods

  const { showDialog } = useDialog()

  const columnsMachineDetail = useMemo(() => {
    return [
      {
        header: 'Chi tiết máy *',
        fieldName: 'task',
      },
      {
        header: 'Công việc cần làm *',
        fieldName: 'time',
      },
    ] as ColumnProps[]
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t])

  const { mutate: mutateJobDeclaration, isLoading: isLoadingJobDeclaration } =
    useMutation(isUpdate ? putJobDeclaration : postJobDeclaration, {
      onSuccess: (res) => {
        toastSuccess(t('common:message.success'))
        router.push({
          pathname: `${MENU_URL.JOB_DECLARATION}/[id]`,
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

  const onSubmit = handleSubmit((data) => {
    mutateJobDeclaration(data)
  })

  const { data: dataGetJobDeclaration, isLoading: isLoadingGetJobDeclaration } =
    useQueryGetJobDeclaration(
      {
        id: Number(id),
      },
      { enabled: isUpdate }
    )

  useEffect(() => {
    if (dataGetJobDeclaration) {
      reset({
        ...dataGetJobDeclaration.data,
        product: {
          ...dataGetJobDeclaration.data.product,
          // sku: dataGetJobDeclaration.data.product?.code,
        },
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataGetJobDeclaration])

  return [
    {
      defaultValues,
      methods,
      id,
      isUpdate,
      isView,
      columnsMachineDetail,
      isLoadingJobDeclaration,
      isLoadingGetJobDeclaration,
    },
    { t, onSubmit, showDialog },
  ] as const
}
