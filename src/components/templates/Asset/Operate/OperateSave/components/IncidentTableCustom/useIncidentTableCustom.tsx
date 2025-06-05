import { BLUE } from '@/helper/colors'
import { TRANSLATE } from '@/routes'
import { Box, IconButton, Typography } from '@mui/material'
import _ from 'lodash'
import { useTranslation } from 'next-i18next'
import { useEffect, useMemo, useState } from 'react'
import { DialogIncident } from '../DialogIncident'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import Image from 'next/image'
import NotePencil from '@/assets/svg/NotePencil.svg'
import { useFormCustom } from '@/lib/form'
import { useQueryIncidentList, useQueryIncidentListByIdIncidentReport, useQueryIncidentListByIdOperate } from '@/service/asset/operate/save/incident/getList'
import { useMutation } from 'react-query'
import { toastError, toastSuccess } from '@/toast'
import { deleteIncident } from '@/service/asset/operate/save/incident/delete'
import { putIncident } from '@/service/asset/operate/save/incident/save'
import { useRouter } from 'next/router'
import { convertIncidentSource } from '@/enum'
import { DialogIncidentHistory } from '@/components/templates/Asset/MaintenancePlan/IncidentList/components/DialogIncidentHistory'
import { useDate } from '@/components/hooks/date/useDate'

export const useIncidentTableCustom = (props: any) => {
  const { t } = useTranslation(TRANSLATE.OPERATE)
  const router = useRouter()
  const { actionType } = router.query
  const id = Number(router.query?.id)
  const isView = actionType === 'VIEW'
  const { serviceType, productId, assetId, setValueParent, updatedItemsIncident, setUpdatedItemsIncident, updatedItemsIncidentAddNew, setUpdatedItemsIncidentAddNew, prevData, setPrevData } = props
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
  const { data, isLoading, refetch } = useQueryIncidentList({
    ...queryPage,
    assetId
  }, {
    enabled: !!assetId && !isView,
  });
  const { data: dataAll, isLoading: isLoadingAll, refetch: refetchAll } = useQueryIncidentList(
    {
      isGetAll: true,
      assetId
    }, {
    enabled: !!assetId && !isView,
  });
  const {
    data: dataById,
    isLoading: isLoadingById,
  } = serviceType === 'OPERATE'
      // eslint-disable-next-line react-hooks/rules-of-hooks
      ? useQueryIncidentListByIdOperate(
        {
          ...queryPage,
          id
        },
        { enabled: isView }
      )
      // eslint-disable-next-line react-hooks/rules-of-hooks
      : useQueryIncidentListByIdIncidentReport(
        {
          ...queryPage,
          id
        },
        { enabled: isView }
      );

  useEffect(() => {
    if (isView) {
      reset({
        incident: dataById?.data?.content,
      });
    } else {
      const incidentIds = dataAll?.data?.content?.map((item: any) => item?.id) ?? [];
      reset({
        incident: data?.data?.content?.map((item: any) => {
          return {
            ...item,
            severityManagement: item?.severityLevels?.[item?.severityLevels?.length - 1]?.severityManagement,
            reason: '',
          }
        }),
      });
      setValueParent('incidentRecodingIds', !!assetId ? incidentIds : []);
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
          header: t('table.incidentCode'),
          fieldName: 'code',
        },
        {
          header: t('table.incidentName'),
          fieldName: 'name',
        },
        {
          header: t('table.reason'),
          fieldName: 'reason',
        },
        {
          header: t('table.severityLevel'),
          fieldName: 'severityLevels',
        },
        {
          header: t('table.source'),
          fieldName: 'selfMaintenanceType',
        },
        {
          header: t('table.incidentLocation'),
          fieldName: 'incidentLocation',
        },
        {
          header: t('table.recorder'),
          fieldName: 'recorder',
        },
        {
          header: t('table.recordingTime'),
          fieldName: 'recordingTime',
        },
      ];

      if (!isView) {
        baseColumns.push({
          header: t('common:action'),
          fieldName: 'actionType',
        });
      }

      return baseColumns;
    },
    [t, isView]
  );

  const { mutate } = useMutation(putIncident, {
    onSuccess: (res, variables) => {
      if (res?.data) {
        if (variables?.currentActionType === 'REVIEW_EDIT') {
          refetch();
        } else {
          mutateDelete({ id: variables?.currentId })
        }
        setUpdatedItemsIncident((prev: any) =>
          prev.filter((id: number) => id !== variables?.currentId)
        );
      }
    },
    onError: (error) => {
      toastError(error);
    },
  });
  const { mutate: mutateDelete } = useMutation(deleteIncident, {
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
        severityLevels: (
          <Box className='flex items-center gap-5'>
            <Typography>
              {
                item?.severityLevels?.map((level: any, levelIndex: number) => (
                  <Typography key={levelIndex} sx={{ whiteSpace: 'pre-wrap', lineHeight: 1.5 }}>
                    {`Lần ${levelIndex + 1}: ${level?.severityManagement?.name}`}
                  </Typography>
                ))
              }
            </Typography>
            <IconButton
              onClick={() => {
                showDialog(<DialogIncidentHistory id={item?.id} />)
              }}
            >
              <Image
                src={require('@/assets/svg/info.svg')}
                alt='info'
                width={20}
                height={20}
              />
            </IconButton>
          </Box>
        ),
        selfMaintenanceType: convertIncidentSource(item?.selfMaintenanceType),
        incidentLocation: item?.incidentLocation?.name,
        recorder: item?.recorder?.name,
        recordingTime: convertToTime(item?.recordingTime),
        actionType: (
          updatedItemsIncident.includes(item?.id) ? (
            <Box className='flex gap-10'>
              <IconButton
                onClick={() => {
                  setPrevData((prev: any) => [...prev, item]);
                  showDialog(
                    <DialogIncident
                      serviceType={serviceType}
                      data={item}
                      type='REVIEW_EDIT'
                      index={index}
                      methodForm={methodForm}
                      productId={productId}
                      assetId={assetId}
                      refetch={refetch}
                      refetchAll={refetchAll}
                      numberOfReviewType={item?.severityLevels?.length}
                      setUpdatedItemsIncident={setUpdatedItemsIncident}
                      setUpdatedItemsIncidentAddNew={setUpdatedItemsIncidentAddNew}
                    />
                  )
                }
                }
              >
                <Image alt='update' src={NotePencil} height={18} width={18} />
              </IconButton>
              <IconButton
                onClick={() => {
                  const matchingData = prevData
                    ?.filter((dataItem: any) => dataItem?.code === item?.code)
                    ?.at(-1);
                  const payload = {
                    ...matchingData,
                    actionType: 'REVIEW_AGAIN',
                    recordingStatus: 'REVIEW_EDIT',
                    currentId: item?.id,
                    currentActionType: item?.actionType,
                    severityManagement: matchingData?.severityLevels?.[matchingData?.severityLevels?.length - 1]?.severityManagement,
                    asset: {
                      id: assetId
                    }
                  };

                  mutate(payload);
                }}
              >
                <Image
                  alt="delete"
                  src={require('@/assets/svg/action/delete.svg')}
                  width={18}
                  height={18}
                />
              </IconButton>
            </Box >
          ) : updatedItemsIncidentAddNew.includes(item?.id) ? (
            <Box className='flex gap-10'>
              <IconButton
                onClick={() => {
                  showDialog(
                    <DialogIncident
                      serviceType={serviceType}
                      data={item}
                      type='EDIT_NEW'
                      index={index}
                      methodForm={methodForm}
                      productId={productId}
                      assetId={assetId}
                      refetch={refetch}
                      refetchAll={refetchAll}
                      numberOfReviewType={item?.severityLevels?.length}
                      setUpdatedItemsIncident={setUpdatedItemsIncident}
                      setUpdatedItemsIncidentAddNew={setUpdatedItemsIncidentAddNew}
                    />
                  )
                }
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
                    id: item?.id
                  })
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
          ) :
            (
              <Typography
                sx={{
                  color: BLUE,
                  cursor: 'pointer',
                }}
                onClick={() => {
                  setPrevData((prev: any) => [...prev, item]);
                  item?.approveStatus === 'APPROVED' ?
                    toastError('Sự cố này đã được phê duyệt')
                    :
                    (
                      showDialog(
                        <DialogIncident
                          serviceType={serviceType}
                          type='REVIEW_AGAIN'
                          index={index}
                          methodForm={methodForm}
                          productId={productId}
                          assetId={assetId}
                          refetch={refetch}
                          refetchAll={refetchAll}
                          numberOfReviewType={item?.severityLevels?.length}
                          setUpdatedItemsIncident={setUpdatedItemsIncident}
                          setUpdatedItemsIncidentAddNew={setUpdatedItemsIncidentAddNew}
                        />
                      )
                    )
                }
                }
              >
                {t('action.reassess')}
              </Typography>
            )
        ),
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
      dataAll: dataAll?.data?.content
    },
    { t, onChangePageSize, refetch, refetchAll, setUpdatedItemsIncident, setUpdatedItemsIncidentAddNew },
  ] as const
}
