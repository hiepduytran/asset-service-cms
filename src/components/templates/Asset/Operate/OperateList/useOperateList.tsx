import { useDate } from '@/components/hooks/date/useDate'
import { ColumnProps } from '@/components/organism/CoreTable'
import { GREEN, RED } from '@/helper/colors'
import { useFormCustom } from '@/lib/form'
import { TRANSLATE } from '@/routes'
import { RequestBody } from '@/service/asset/operate/getList/type'
import { useQueryOperateList } from '@/service/asset/operate/getList'
import { getOperateParameter } from '@/service/asset/operate/getList/getListOperateParam'
import { toastError } from '@/toast'
import { Typography } from '@mui/material'
import _ from 'lodash'
import { useTranslation } from 'next-i18next'
import React, { useMemo, useState } from 'react'
import { getTypeData } from '@/components/molecules/TextColor'
import { ParameterType } from '@/enum'

const defaultValues = {
  search: '',
  asset: {
    id: null,
    name: 'Tất cả',
  },
  stage: {
    id: null,
    name: 'Tất cả',
  },
  shift: {
    id: null,
    name: 'Tất cả',
  },
  productionRequest: {
    id: null,
    code: 'Tất cả',
  },
  evaluateAsset: null,
  page: 0,
  size: 20,
}

export const useOperateList = () => {
  const { t } = useTranslation(TRANSLATE.OPERATE)
  const methodForm = useFormCustom<RequestBody['GET']>({
    defaultValues,
  })
  const { reset, handleSubmit } = methodForm
  const { convertToDate, convertToTime } = useDate()

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
    setQueryPage({
      ...input,
      assetId: input?.asset?.id,
      stageId: input?.stage?.id,
      shiftId: input?.shift?.id,
      productionRequestId: input?.productionRequest?.id,
    })
  })

  const {
    isLoading: isLoadingTable,
    data,
    refetch,
  } = useQueryOperateList(queryPage)

  const columns = useMemo(
    () =>
      [
        {
          header: t('code'),
          fieldName: 'code',
        },
        {
          header: t('date'),
          fieldName: 'updatedAt',
        },
        {
          header: t('creator'),
          fieldName: 'creator',
        },
        {
          header: t('identity'),
          fieldName: 'identity',
        },
        {
          header: t('asset'),
          fieldName: 'asset',
        },
        {
          header: t('stage'),
          fieldName: 'stage',
        },
        {
          header: t('shift'),
          fieldName: 'shift',
        },
        {
          header: t('productionRequest'),
          fieldName: 'productionRequest',
        },
        {
          header: t('parameter'),
          fieldName: 'parameter',
        },
        {
          header: t('evaluateAsset'),
          fieldName: 'evaluateAsset',
        },
      ] as ColumnProps[],
    [t]
  )

  const colorText = (text: string) => {
    if (text === 'NORMAL') {
      return <Typography color={GREEN}>{`${t('NORMAL')}`}</Typography>
    } else if (text === 'ABNORMAL') {
      return <Typography color={RED}>{`${t('ABNORMAL')}`}</Typography>
    } else {
      return null
    }
  }

  const tableData = useMemo(() => {
    return (data?.data?.content ?? [])?.map((item) => ({
      ...item,
      code: item?.code,
      updatedAt: convertToDate(item?.updateDate),
      creator: item?.user?.name,
      identity: item?.asset?.code,
      asset: item?.asset?.name,
      stage: item?.stage?.name,
      shift: item?.shift?.name,
      productionRequest: item?.productionRequest?.name,
      evaluateAsset: colorText(item?.status),
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t, data])

  const columnsChild = useMemo(
    () =>
      [
        {
          header: t('attributeCategory'),
          fieldName: 'attributeCategory',
        },
        {
          header: t('operate_save.table.name'),
          fieldName: 'attribute',
        },
        {
          header: t('operate_save.table.value'),
          fieldName: 'attributeValue',
        },
        {
          header: t('operate_save.table.level'),
          fieldName: 'standardLevel',
        },
        {
          header: t('operate_save.table.recordedValue'),
          fieldName: 'value',
        },
        {
          header: t('operate_save.table.warning'),
          fieldName: 'content',
        },
        {
          header: t('operate_save.table.propose'),
          fieldName: 'actionRegulation',
        },
        {
          header: t('operate_save.table.executionTime'),
          fieldName: 'expectedRealization',
        },
      ] as ColumnProps[],
    [t]
  )

  const [dataChild, setDataChild] = useState<any>([])
  const [isLoadingChild, setIsLoadingChild] = useState<{
    [id: number]: boolean
  }>({})
  const handleFetchDataChild = async (id: number) => {
    try {
      setIsLoadingChild({ [id]: true })
      await getOperateParameter({ operateId: id }).then((res) => {
        setDataChild(res?.data?.content)
        setIsLoadingChild({ [id]: false })
      })
    } catch (error) {
      toastError(error)
    }
  }
  const tableDataChild = useMemo(() => {
    return dataChild?.flatMap((item: any) =>
      item?.attributes?.map((item1: any) => ({
        ...item,
        attributeCategory: item.attributeCategory.name,
        attribute: item1?.attribute.name,
        attributeValue: (
          <div className='flex items-center'>
            {item1?.attributeValue?.map((value: any, index: number) => (
              <React.Fragment key={'key' + index}>
                <div
                  style={{
                    border: '1px solid',
                    borderRadius: '100%',
                    padding: 5,
                    width: '5px',
                    color: item1?.color,
                    backgroundColor: item1?.color,
                  }}
                ></div>
                &nbsp;
                <Typography color={item1?.color}>{value?.name}</Typography>
                &nbsp; &nbsp;
              </React.Fragment>
            ))}
          </div>
        ),
        standardLevel: `${item1?.minimum} - ${item1?.maximum}`,
        value: item1?.value,
        content:
          item1?.content === '' ? (
            t('operate_save.text.no_warning')
          ) : (
            <Typography color={item1?.color}>{item1?.content}</Typography>
          ),
        actionRegulation: getTypeData(item1?.actionRegulation, ParameterType),
        expectedRealization: convertToTime(item1?.expectedRealization),
      }))
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t, dataChild])

  return [
    {
      methodForm,
      isLoadingTable,
      columns,
      tableData,
      data: data?.data,
      columnsChild,
      dataChild: tableDataChild,
      isLoadingChild,
    },
    { t, onSubmit, onReset, onChangePageSize, refetch, handleFetchDataChild },
  ] as const
}
