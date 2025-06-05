import { ColumnProps } from '@/components/organism/CoreTable'
import { useFormCustom } from '@/lib/form'
import { TRANSLATE } from '@/routes'
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
export type Form = {
  id?: number
  product: {
    id: number
    productId: number
    sku: string
    name: string
    itemQuantity: number
    imageUrls: string[]
  } | null
  standardMethodGroups: StandardMethodGroup[] | []
  productId?: number
  productName?: string
}
const defaultValues = {
  product: null,
  standardMethodGroups: [],
}
export default function useStandardFollowAction() {
  const { t } = useTranslation(TRANSLATE.MAINTENANCE)
  const methods = useFormCustom<Form>({ defaultValues })
  const { control, handleSubmit, reset } = methods
  const router = useRouter()
  const { id, actionType } = router.query
  const isView = actionType === 'VIEW'
  const isUpdate = !!id

  const { fields: groupStandardFields } = useFieldArray({
    control,
    name: 'standardMethodGroups',
    keyName: 'key',
  })

  const {
    data: detailStandardDeclare,
    isLoading: isLoadingDetailStandardDeclare,
  } = useGetDetailStandardDeclare({ id: Number(id) })

  const { data: groupStandardData, isLoading: isLoadingGroupStandardData } =
    useGetAllGroupStandard()

  const onSubmit = handleSubmit((data) => {
    console.log(data)
  })

  const handleConvertGroupStandard = (
    data: StandardGroup[]
  ): StandardMethodGroup[] => {
    const result = data.map((item, index) => {
      return {
        standardGroup: item,
        standardMaintenanceLines: [],
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
        standardMethodGroups: convertStandardMethodGroups,
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
              header: t('table.action'),
              fieldName: 'action',
            },
          ]
        : []),
    ]
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t]) as ColumnProps[]

  return [
    {
      methods,
      isView,
      isUpdate,
      columns,
      groupStandardFields,
      isLoadingDetailStandardDeclare,
      isLoadingGroupStandardData,
    },
    { t, onSubmit },
  ] as const
}
