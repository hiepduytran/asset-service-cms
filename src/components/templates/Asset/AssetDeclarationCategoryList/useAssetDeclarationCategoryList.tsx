import { ColumnProps } from '@/components/organism/CoreTable'
import { useFormCustom } from '@/lib/form'
import { TRANSLATE } from '@/routes'
import {
  useQueryAssetDeclarationCategoryList,
  useQueryAssetDeclarationCategoryListIdentifierCode,
} from '@/service/asset/assetDeclarationCategoryList/getList'
import { RequestBody } from '@/service/asset/assetDeclarationCategoryList/getList/type'
import _ from 'lodash'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useMemo, useState } from 'react'
import { getTypeData } from '@/components/molecules/TextColor'
import { typeOfInitialAllocation } from '@/enum'

const defaultValues = {
  search: '',
  categoryId: null,
  isConfig: null,
  page: 0,
  size: 20,
}

export const useAssetDeclarationCategoryList = () => {
  const { t } = useTranslation(TRANSLATE.ASSET_DECLARATION_CATEGORY_LIST)
  const router = useRouter()
  const { view } = router.query
  const viewType = view ?? 'ASSET_CODE'
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

  const {
    isLoading: isLoadingTable,
    data,
    refetch,
  } = useQueryAssetDeclarationCategoryList(queryPage, {
    enabled: viewType === 'ASSET_CODE',
  })

  const { isLoading: isLoadingTableIdentifierCode, data: dataIdentifierCode } =
    useQueryAssetDeclarationCategoryListIdentifierCode(queryPage, {
      enabled: viewType === 'IDENTIFIER_CODE',
    })

  const columns = useMemo(
    () =>
      [
        {
          header: t('table.identifierCode'),
          fieldName: 'code',
        },
        {
          header: t('table.assetCode'),
          fieldName: 'sku',
        },
        {
          header: t('table.assetName'),
          fieldName: 'name',
        },
        {
          header: t('table.assetCategory'),
          fieldName: 'category',
        },
        {
          header: t('table.uom'),
          fieldName: 'uom',
        },
        {
          header: t('table.importCode'),
          fieldName: 'importCode',
        },
        {
          header: t('table.producer'),
          fieldName: 'producer',
        },
        {
          header: t('common:status'),
          fieldName: 'status',
        },
        {
          header: t('table.cpObject'),
          fieldName: 'cpObject',
        },
        {
          header: t('table.organization'),
          fieldName: 'organization',
        },
        {
          header: t('table.part'),
          fieldName: 'part',
        },
        {
          header: t('table.staff'),
          fieldName: 'staff',
        },
      ] as ColumnProps[],
    [t]
  )
  const tableDataIdentifierCode = useMemo(() => {
    return (dataIdentifierCode?.data?.content ?? [])?.map((item) => ({
      ...item,
      sku: item?.product?.sku,
      name: item?.product?.name,
      category: item?.category?.name,
      uom: item?.uom?.name,
      importCode: item?.entity?.code,
      producer: item?.partner?.name,
      status: item?.isActive,
      cpObject: getTypeData(
        item?.allocationChooseType,
        typeOfInitialAllocation
      ),
      organization: item?.organization?.name ?? '--',
      part: item?.department?.name ?? '--',
      staff: item?.employee?.name ?? '--',
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t, dataIdentifierCode])

  return [
    {
      methodForm,
      isLoadingTable,
      dataTable: data?.data,
      columns,
      isLoadingTableIdentifierCode,
      tableDataIdentifierCode,
      dataIdentifierCode: dataIdentifierCode?.data,
      router,
      viewType,
    },
    { t, onReset, onSubmit, onChangePageSize, refetch },
  ] as const
}
