import { ColumnProps } from '@/components/organism/CoreTable'
import { toastError } from '@/toast'
import { useFormCustom } from '@/lib/form'
import { TRANSLATE } from '@/routes'
import { useTranslation } from 'next-i18next'
import { useMemo, useState } from 'react'
import { RequestBody } from '@/service/asset/allocation/getList/type'
import { getIncidentDetail } from '@/service/asset/incidentList/getDetail'
import { convertIncidentSource } from '@/enum'
import { IncidentDetail } from '@/service/asset/incidentList/getDetail/type'
import { Box, IconButton, Typography } from '@mui/material'
import { RED } from '@/helper/colors'
import Image from 'next/image'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import { DialogIncidentHistory } from '../../DialogIncidentHistory'

const defaultValues = {
  search: '',
  page: 0,
  size: 20,
}

export const useTableRow = ({
  assetId,
}: {
  assetId: number
}) => {
  const { t } = useTranslation(TRANSLATE.WEEKLY_MAINTENANCE_PLAN)
  const methodForm = useFormCustom<RequestBody['GET']>({
    defaultValues,
  })
  const [incidentDetail, setIncidentDetail] = useState<
    IncidentDetail[]
  >([])
  const [open, setOpen] = useState(false)
  const { showDialog } = useDialog()
  const columnsChild = useMemo(
    () =>
      [
        {
          header: t('table.incidentCode'),
          fieldName: 'incidentCode',
        },
        {
          header: t('table.incidentName'),
          fieldName: 'incidentName',
        },
        {
          header: t('table.severityLevel'),
          fieldName: 'severityLevel',
        },
        {
          header: t('table.description'),
          fieldName: 'description',
        },
        {
          header: t('table.incidentLocation'),
          fieldName: 'incidentLocation',
        },
        {
          header: t('table.source'),
          fieldName: 'source',
        },
        {
          header: t('table.processingStatus'),
          fieldName: 'processingStatus',
        },
        {
          header: t('table.postProcessingStatus'),
          fieldName: 'postProcessingStatus',
        },
      ] as ColumnProps[],
    [t]
  )
  const [isLoadingChild, setIsLoadingChild] = useState(false)
  const getDataChild = async (assetId: number) => {
    try {
      setIsLoadingChild(true)
      await getIncidentDetail({ id: assetId }).then(
        (res) => {
          setIncidentDetail(res?.data)
          setIsLoadingChild(false)
        }
      )
    } catch (error) {
      toastError(error)
    }
  }

  const handleOpen = () => {
    if (!open) {
      getDataChild(assetId)
    }
    setOpen(!open)
  }

  const tableDataChild = useMemo(() => {
    return incidentDetail?.map((item: any) => ({
      ...item,
      incidentCode: item?.code,
      incidentName: item?.name,
      severityLevel: <Box className='flex items-center gap-5'>
        <Typography>
          {item?.severityManagement?.name}
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
      </Box>,
      description: item?.reason,
      incidentLocation: item?.incidentLocation?.name,
      source: convertIncidentSource(item?.selfMaintenanceType),
      processingStatus: (<Typography color={RED}>Chưa xử lý</Typography>),
      postProcessingStatus: <Typography color={RED}>Chưa xử lý</Typography>
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [incidentDetail])

  return [
    {
      methodForm,
      columnsChild,
      open,
      tableDataChild,
      isLoadingChild,
    },
    { t, handleOpen },
  ] as const
}
