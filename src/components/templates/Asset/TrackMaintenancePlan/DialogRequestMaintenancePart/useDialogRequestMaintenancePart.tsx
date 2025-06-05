import { useDialog } from '@/components/hooks/dialog/useDialog'
import { ColumnProps } from '@/components/organism/CoreTable'
import { toastError, toastSuccess } from '@/toast'
import { useFormCustom } from '@/lib/form'
import { TRANSLATE } from '@/routes'
import { postRequestMaintenancePart } from '@/service/asset/trackMaintenancePartAllocation/action'
import { useQueryDetailPlanMaintenancePlan } from '@/service/asset/trackMaintencancePlan/list'
import { useTranslation } from 'next-i18next'
import { useEffect, useMemo } from 'react'
import { useMutation } from 'react-query'

type Props = {
  id: number
  refetchPlanMaintenance?: any
  status: string
}
export const useDialogRequestMaintenancePart = (props: Props) => {
  const { id, refetchPlanMaintenance } = props
  const { t } = useTranslation(TRANSLATE.TRACK_MAINTENANCE_PLAN)
  const { hideDialog } = useDialog()
  const methods = useFormCustom({})
  const { reset } = methods

  const {
    mutate: mutateRequestMaintenancePart,
    isLoading: isLoadingMutateRequestMaintenancePart,
  } = useMutation(postRequestMaintenancePart, {
    onSuccess: () => {
      toastSuccess(t('common:message.success'))
      hideDialog()
      refetchPlanMaintenance()
    },
    onError: (error) => {
      toastError(error)
    },
  })

  const onSubmit = () => {
    mutateRequestMaintenancePart({
      planMaintenanceId: id,
    })
  }

  const columns = useMemo(
    () =>
      [
        {
          header: t('table.name_accessory'),
          fieldName: 'product.name',
        },
        {
          header: t('table.demandQty'),
          fieldName: 'demandQty',
        },
      ] as ColumnProps[],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t]
  )

  const { data: dataPlanMaintenance, isLoading: isLoadingPlanMaintenance } =
    useQueryDetailPlanMaintenancePlan({
      planMaintenanceId: id,
    })

  useEffect(() => {
    if (dataPlanMaintenance) {
      reset(dataPlanMaintenance.data)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataPlanMaintenance])

  const tableData = (
    dataPlanMaintenance ? dataPlanMaintenance.data.stockPickingLines : []
  ).map((item) => {
    return { ...item }
  })

  return [
    {
      methods,
      columns,
      tableData,
      dataPlanMaintenance: dataPlanMaintenance
        ? dataPlanMaintenance.data
        : null,
      isLoadingPlanMaintenance,
      isLoadingMutateRequestMaintenancePart,
    },
    { t, onSubmit, hideDialog },
  ] as const
}
