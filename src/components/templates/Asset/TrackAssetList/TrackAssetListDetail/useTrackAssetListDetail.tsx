import { useDate } from '@/components/hooks/date/useDate'
import { ColumnProps } from '@/components/organism/CoreTable'
import { useFormCustom } from '@/lib/form'
import { TRANSLATE } from '@/routes'
import { RequestBody } from '@/service/asset/trackAssetList/getList/getTrackAssetListDetail/type'
import _ from 'lodash'
import { useTranslation } from 'next-i18next'
import { useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import { useQueryTrackAssetListDetail } from '@/service/asset/trackAssetList/getList/getTrackAssetListDetail'
import { getTypeData } from '@/components/molecules/TextColor'
import { AllocatedAssetListCheckingType, IssuanceSource } from '@/enum'
import { CoreImage } from '@/components/atoms/CoreImage'

const defaultValues = {
  search: '',
  allocationId: null,
  allocationChooseType: null,
  date: '',
  status: null,
  page: 0,
  size: 20,
}

export const useTrackAssetListDetail = (props: {
  allocationChooseType: string
}) => {
  const { t } = useTranslation(TRANSLATE.TRACK_ASSET_LIST)
  const { allocationChooseType } = props
  const router = useRouter()
  const id = Number(router.query?.id)
  const code = router.query?.code
  const { convertToDate } = useDate()
  const methodForm = useFormCustom<RequestBody['GET']>({
    defaultValues,
  })
  const { reset, handleSubmit } = methodForm
  const [queryPage, setQueryPage] = useState<RequestBody['GET']>(
    _.omitBy(defaultValues, _.isNil)
  )
  const onChangePageSize = (val: RequestBody['GET']) => {
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

  const { isLoading: isLoadingTable, data } = useQueryTrackAssetListDetail(
    {
      ...queryPage,
      allocationId: id,
    },
    {
      enabled: !!id,
    }
  )

  const columns = useMemo(() => {
    const baseColumns = [
      {
        header: t('table.assetImage'),
        fieldName: 'assetImage',
        styleCell: {
          style: {
            minWidth: '100px',
          },
        },
      },
      {
        header: t('table.identifierCode'),
        fieldName: 'identifierCode',
      },
      {
        header: t('table.source'),
        fieldName: 'source',
      },
      {
        header: t('table.allocateDate'),
        fieldName: 'allocateDate',
      },
      {
        header: t('table.allocateCode'),
        fieldName: 'allocateCode',
      },
      // {
      //   header: t('table.responsibleStaff'),
      //   fieldName: 'responsibleStaff',
      // },
      {
        header: t('table.status'),
        fieldName: 'status',
      },
    ]
    if (allocationChooseType === 'DEPARTMENT') {
      baseColumns.splice(5, 0, {
        header: t('table.responsibleStaff'),
        fieldName: 'responsibleStaff',
      })
    }
    return baseColumns as ColumnProps[]
  }, [allocationChooseType, t])
  const tableData = useMemo(() => {
    return (data?.data?.content ?? [])?.map((item) => ({
      ...item,
      assetImage: (
        <CoreImage
          src={item?.images ? item?.images[0] ?? '' : ''}
          alt=''
          width={40}
          height={40}
        />
      ),
      identifierCode: item?.dic,
      source: getTypeData(item?.assetAllocationType, IssuanceSource),
      allocateDate: convertToDate(item?.requestDate),
      allocateCode: item?.code,
      status: getTypeData(item?.checkingType, AllocatedAssetListCheckingType),
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t, data])

  return [
    {
      methodForm,
      isLoadingTable,
      columns,
      tableData,
      data: data?.data,
      code,
    },
    { t, onReset, onSubmit, onChangePageSize },
  ] as const
}
