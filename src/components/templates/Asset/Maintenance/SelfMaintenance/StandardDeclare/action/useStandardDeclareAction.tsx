import { ColumnProps } from '@/components/organism/CoreTable'
import { toastError, toastSuccess } from '@/toast'
import { useFormCustom } from '@/lib/form'
import { MENU_URL, TRANSLATE } from '@/routes'
import {
  createStandardDeclare,
  draftStandardDeclare,
  updateStandardDeclare,
} from '@/service/asset/maintenance/selfMaintenance/standardDeclare/action'
import { useGetDetailStandardDeclare } from '@/service/asset/maintenance/selfMaintenance/standardDeclare/detail'
import { useGetAllGroupStandard } from '@/service/asset/maintenance/selfMaintenance/standardDeclare/list'

import {
  StandardGroup,
  StandardMethodGroup,
} from '@/service/asset/maintenance/selfMaintenance/standardDeclare/list/type'
import { useRouter } from 'next/router'
import { useEffect, useMemo } from 'react'
import { useFieldArray } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useMutation } from 'react-query'

type Form = {
  product: {
    id: number
    productId: number
    sku: string
    name: string
    itemQuantity: number
    imageUrls: string[]
  } | null
  standardMethodGroups: StandardMethodGroup[] | []
  productId: number
  productName: string
  state: string
}

const defaultValues = {
  product: null,
  standardMethodGroups: [],
}
export default function useStandardDeclareAction() {
  const { t } = useTranslation(TRANSLATE.MAINTENANCE)
  const methods = useFormCustom<Form>({ defaultValues })
  const { control, handleSubmit, setError, getValues, setValue, reset, watch } =
    methods
  const router = useRouter()
  const { id, actionType } = router.query
  const isView = actionType === 'VIEW'
  const isUpdate = !!id

  const { fields: standardMethodGroups } = useFieldArray({
    control,
    name: 'standardMethodGroups',
    keyName: 'key',
  })

  const {
    data: detailStandardDeclare,
    isLoading: isLoadingDetailStandardDeclare,
    refetch,
  } = useGetDetailStandardDeclare({ id: Number(id) }, { enabled: isUpdate })

  const { data: groupStandardData, isLoading: isLoadingGroupStandardData } =
    useGetAllGroupStandard({ enabled: !isUpdate })

  const columns = useMemo(() => {
    return [
      {
        header: t('table.product'),
        fieldName: 'accessory',
      },
      {
        header: t('table.standardMethods'),
        fieldName: 'standardMethod',
      },
      {
        header: t('table.result'),
        fieldName: 'result',
      },
      ...(!isView
        ? [
            {
              header: '',
              fieldName: 'action',
            },
          ]
        : []),
    ]
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t]) as ColumnProps[]

  const { mutate: mutate, isLoading: loadingSubmit } = useMutation(
    isUpdate ? updateStandardDeclare : createStandardDeclare,
    {
      onSuccess: (data) => {
        toastSuccess(t('common:message.success'))
        router.push({
          pathname: `${MENU_URL.MAINTENANCE.SELF_MAINTENANCE.STANDARD_DECLARE}/[id]`,
          query: { id: data.data.id, actionType: 'VIEW' },
        })
        refetch()
      },
      onError: (error) => {
        toastError(error, setError)
      },
    }
  )

  const { mutate: mutateDraft, isLoading: loadingDraft } = useMutation(
    draftStandardDeclare,
    {
      onSuccess: (data) => {
        toastSuccess(t('common:message.success'))
        router.push({
          pathname: `${MENU_URL.MAINTENANCE.SELF_MAINTENANCE.STANDARD_DECLARE}/[id]`,
          query: { id: data.data.id, actionType: 'VIEW' },
        })
      },
      onError: (error) => {
        toastError(error, setError)
      },
    }
  )

  const onSubmit = handleSubmit((data) => {
    // const convertStandardMethodGroups = data.standardMethodGroups.filter(
    //   (item) =>
    //     item.standardMaintenanceLines.some((line) => line.product !== null)
    // )
    // data.standardMethodGroups = convertStandardMethodGroups

    const { product } = data
    if (product) {
      mutate({
        ...data,
        state: 'PENDING',
        product,
      })
    }
  })
  const onDraft = () => {
    const { product, standardMethodGroups } = getValues()

    // const convertStandardMethodGroups = standardMethodGroups.filter((item) =>
    //   item.standardMaintenanceLines.some((line) => line.product !== null)
    // )
    if (product) {
      mutateDraft({
        state: 'DRAFT',
        product: { ...product, id: product?.productId },
        standardMethodGroups,
      })
    }
  }

  const onCancel = () => {
    router.push({
      pathname: `${MENU_URL.MAINTENANCE.SELF_MAINTENANCE.STANDARD_DECLARE}`,
    })
  }

  const handleConvertGroupStandard = (
    data: StandardGroup[]
  ): StandardMethodGroup[] => {
    const result = data.map((item, index) => {
      return {
        standardGroup: item,
        standardMaintenanceLines: [
          {
            id: null,
            product: null,
            standardMethods: null,
            result: null,
          },
        ],
      }
    })
    return result
  }

  useEffect(() => {
    if (detailStandardDeclare?.data) {
      const convertStandardMethodGroups =
        detailStandardDeclare.data.standardMethodGroups?.filter((item) =>
          item.standardMaintenanceLines.some((line) => line.product !== null)
        )

      reset({
        ...detailStandardDeclare.data,
        productName: detailStandardDeclare.data.product.name,
        product: {
          ...detailStandardDeclare.data.product,
          productId: detailStandardDeclare.data.product.productId,
        },
        standardMethodGroups: isView
          ? convertStandardMethodGroups
          : detailStandardDeclare.data.standardMethodGroups,
      })
    } else if (groupStandardData) {
      reset({
        ...defaultValues,
        standardMethodGroups: handleConvertGroupStandard(
          groupStandardData.data
        ),
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t, detailStandardDeclare, groupStandardData])

  return [
    {
      id,
      methods,
      router,
      isView,
      isUpdate,
      columns,
      standardMethodGroups,
      loadingSubmit,
      loadingDraft,
      isLoadingDetailStandardDeclare,
      isLoadingGroupStandardData,
    },
    {
      t,
      onSubmit,
      onCancel,
      onDraft,
      handleConvertGroupStandard,
    },
  ] as const
}
