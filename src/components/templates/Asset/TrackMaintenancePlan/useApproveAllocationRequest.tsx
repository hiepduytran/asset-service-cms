import { CoreButton } from '@/components/atoms/CoreButton'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import { ColumnProps } from '@/components/organism/CoreTable'
import {
  convertAllocationStatusDialog,
  convertPlanType,
  textColor,
} from '@/enum'
import { useFormCustom } from '@/lib/form'
import { TRANSLATE } from '@/routes'
import { RequestBody } from '@/service/asset/approveAllocationRequest/getList/type'
import { useQueryListPlanMaintenance } from '@/service/asset/trackMaintencancePlan/list'
import _ from 'lodash'
import { useTranslation } from 'next-i18next'
import { useMemo, useState } from 'react'
import { DialogRequestMaintenancePart } from './DialogRequestMaintenancePart'

const defaultValues = {
  search: '',
  page: 0,
  size: 10,
  status: null,
}

export const useApproveAllocationRequestList = () => {
  const { t } = useTranslation(TRANSLATE.TRACK_MAINTENANCE_PLAN)
  const methods = useFormCustom<RequestBody['GET']>({
    defaultValues,
  })

  const { reset, handleSubmit } = methods

  const { showDialog } = useDialog()

  const [queryPage, setQueryPage] = useState<any>(
    _.omitBy(defaultValues, _.isNil)
  )
  const onChangePageSize = (val: any) => {
    const { page, size } = val
    const input = { ...queryPage, page, size }

    setQueryPage(input)
  }

  const onReset = () => {
    reset(defaultValues)
    const input = _.omitBy(defaultValues, (v) => _.isNil(v))
    setQueryPage(input)
  }

  const onSubmit = handleSubmit(async (input) => {
    setQueryPage(input)
  })

  const columns = useMemo(() => {
    return [
      {
        header: t('table.code'),
        fieldName: 'code',
      },
      {
        header: t('table.name'),
        fieldName: 'name',
      },
      {
        header: t('table.planType'),
        fieldName: 'planType',
      },
      {
        header: t('table.scheduledMaintenanceDate'),
        fieldName: 'scheduledMaintenanceDate',
      },
      {
        header: t('table.status'),
        fieldName: 'status',
      },
      {
        header: '',
        fieldName: 'action',
        styleCell: {
          style: {
            minWidth: '250px',
          },
        },
      },
    ]
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t]) as ColumnProps[]

  const {
    isLoading: isLoadingTable,
    data: dataPlanMaintenance,
    refetch: refetchPlanMaintenance,
  } = useQueryListPlanMaintenance({
    ...queryPage,
  })

  const tableData = (dataPlanMaintenance?.data?.content ?? []).map((item) => {
    return {
      ...item,
      planType: convertPlanType(item.planType),
      status: textColor(item.status),
      action:
        item.allocationStatus === 'NOT_ALLOCATION' ||
        item.allocationStatus === null ? (
          <CoreButton
            theme='submit'
            onClick={() =>
              showDialog(
                <DialogRequestMaintenancePart
                  refetchPlanMaintenance={refetchPlanMaintenance}
                  id={item.id}
                  status={item.allocationStatus}
                />
              )
            }
          >
            {`${t('text.request_lower')}`}
          </CoreButton>
        ) : (
          <CoreButton
            theme='submit'
            onClick={() =>
              showDialog(
                <DialogRequestMaintenancePart
                  status={item.allocationStatus}
                  id={item.id}
                />
              )
            }
          >
            {convertAllocationStatusDialog(item.allocationStatus)}
          </CoreButton>
        ),
    }
  })

  const optionStatus = [
    { label: `${t('text.ALL')}`, value: null },
    { label: `${t('text.FINISH')}`, value: 'FINISH' },
    { label: `${t('text.PENDING')}`, value: 'PENDING' },
  ]

  return [
    {
      methods,
      columns,
      isLoadingTable,
      tableData,
      optionStatus,
      page: dataPlanMaintenance
        ? {
            page: dataPlanMaintenance?.data?.page,
            size: dataPlanMaintenance?.data?.size,
            totalPages: dataPlanMaintenance?.data?.totalPages,
          }
        : null,
    },
    { t, onSubmit, onReset, onChangePageSize, refetchPlanMaintenance },
  ] as const
}
