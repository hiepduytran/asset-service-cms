import { TRANSLATE } from '@/routes'
import { Box, IconButton } from '@mui/material'
import _ from 'lodash'
import { useTranslation } from 'next-i18next'
import { useEffect, useMemo, useState } from 'react'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import Image from 'next/image'
import NotePencil from '@/assets/svg/NotePencil.svg'
import { DialogMachineStop } from '../DialogMachineStop'
import { useFormCustom } from '@/lib/form'
import { useQueryMachineStopList, useQueryMachineStopListById } from '@/service/asset/operate/save/machineStop/getList'
import { deleteMachineStop } from '@/service/asset/operate/save/machineStop/delete'
import { useMutation } from 'react-query'
import { toastError, toastSuccess } from '@/toast'
import { useDate } from '@/components/hooks/date/useDate'
import { useRouter } from 'next/router'
import { convertIncidentSource } from '@/enum'

export const useMachineStopTableCustom = (props: any) => {
  const { t } = useTranslation(TRANSLATE.OPERATE)
  const router = useRouter()
  const { actionType } = router.query
  const id = Number(router.query?.id)
  const isView = actionType === 'VIEW'
  const { assetId, shift, setValueParent, updatedItemsMS, setUpdatedItemsMS } = props
  const { showDialog } = useDialog()
  const { convertToTime } = useDate()
  const methodForm = useFormCustom<any>()
  const { reset } = methodForm

  const [queryPage, setQueryPage] = useState<any>(
    _.omitBy({
      page: 0,
      size: 5,
      isGetAll: false,
    }, _.isNil)
  )
  const { data, isLoading, refetch } = useQueryMachineStopList({
    ...queryPage,
    assetId
  }, { enabled: !!assetId && !isView })
  const { data: dataAll, isLoading: isLoadingAll, refetch: refetchAll } = useQueryMachineStopList({
    isGetAll: true,
    assetId
  }, { enabled: !!assetId && !isView })
  const { data: dataById, isLoading: isLoadingById } = useQueryMachineStopListById({
    ...queryPage,
    id: id,
  }, {
    enabled: isView,
  });

  useEffect(() => {
    if (isView) {
      reset({
        machineStop: dataById?.data?.content,
      });
    } else {
      const machineStopIds = dataAll?.data?.content?.map((item: any) => item?.id) ?? [];
      reset({
        machineStop: data?.data?.content ?? [
          {
            incidentRecoding: []
          },
        ],
      });
      setValueParent('shutdownInformationIds', !!assetId ? machineStopIds : []);
    }
  }, [assetId, data, dataAll, dataById, isView, reset, setValueParent]);

  const onChangePageSize = (val: any) => {
    const { page, size } = val
    const input = { ...queryPage, page, size }
    setQueryPage(input)
  }

  const columns = useMemo(
    () => {
      const baseColumns = [
        {
          header: t('table.machineStopLogCode'),
          fieldName: 'code',
        },
        {
          header: t('table.machineStopReason'),
          fieldName: 'reason',
        },
        {
          header: t('table.source'),
          fieldName: 'selfMaintenanceType',
        },
        {
          header: t('table.startDate'),
          fieldName: 'startDate',
        },
        {
          header: t('table.endDate'),
          fieldName: 'endDate',
        },
        {
          header: t('table.shift'),
          fieldName: 'shift',
        },
      ];

      if (!isView) {
        baseColumns.push({
          header: '',
          fieldName: 'action',
        });
      }

      return baseColumns;
    },
    [t, isView]
  );

  const { mutate: mutateDelete } = useMutation(deleteMachineStop, {
    onSuccess: () => {
      toastSuccess(t('common:message.success'))
      refetch()
      refetchAll()
    },
    onError: (error) => {
      toastError(error)
    },
  })

  const tableData = useMemo(() => {
    if (!assetId) {
      return [];
    } else {
      return ((isView ? dataById : data)?.data?.content ?? []).map((item: any, index: number) => ({
        ...item,
        selfMaintenanceType: convertIncidentSource(item?.selfMaintenanceType),
        startDate: convertToTime(item?.startDate),
        endDate: convertToTime(item?.endDate),
        shift: item?.shift?.name,
        action: updatedItemsMS.includes(item?.id) ? (
          <Box className='flex gap-10'>
            <IconButton
              onClick={() =>
                showDialog(
                  <DialogMachineStop
                    type='UPDATE'
                    index={index}
                    methodForm={methodForm}
                    refetch={refetch}
                    refetchAll={refetchAll}
                    assetId={assetId}
                    shift={shift}
                    setUpdatedItemsMS={setUpdatedItemsMS}
                  />
                )
              }
            >
              <Image
                alt='update'
                src={NotePencil}
                height={18}
                width={18}
              />
            </IconButton>
            <IconButton
              onClick={() => {
                mutateDelete({
                  id: item?.id,
                });
              }}
            >
              <Image
                alt='delete'
                src={require('@/assets/svg/action/delete.svg')}
                width={18}
                height={18}
              />
            </IconButton>
          </Box>
        ) : null,
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assetId, data, dataById]);

  return [
    {
      isView,
      methodForm,
      columns,
      tableData,
      data: isView ? dataById?.data : data?.data,
      isLoading: isView ? isLoadingById : isLoading,
      isLoadingAll,
    },
    { t, onChangePageSize, refetch, refetchAll },
  ] as const
}
