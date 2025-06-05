import { useFormCustom } from '@/lib/form'
import { MENU_URL, TRANSLATE } from '@/routes'
import _ from 'lodash'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useSetRecoilState } from 'recoil'
import { incidentList, planType } from './recoil'
import { useQueryIncidentList } from '@/service/asset/incidentList/getList'
import { RequestBody } from '@/service/asset/incidentList/getList/type'

const defaultValues = {
  search: '',
  asset: {
    id: null,
    name: 'Tất cả',
  },
  department: {
    id: null,
    name: 'Tất cả',
  },
  isActive: null,
  isPlaned: null,
  page: 0,
  size: 20,
}

export const useIncidentList = () => {
  const { t } = useTranslation(TRANSLATE.WEEKLY_MAINTENANCE_PLAN)
  const router = useRouter()
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
    setQueryPage({
      ...input,
      assetId: input?.asset?.id,
      departmentId: input?.department?.id,
    })
  })

  const {
    isLoading: isLoadingTable,
    data,
    refetch,
  } = useQueryIncidentList(queryPage)

  const [selectedRows, setSelectedRows] = useState<any[]>([])

  const setIncidentList = useSetRecoilState(incidentList)
  const setPlanType = useSetRecoilState(planType)

  const handlePlan = () => {
    setIncidentList(selectedRows)
    setPlanType('WEEK')
    router.push({
      pathname: `${MENU_URL.WEEKLY_MAINTENANCE_PLAN}`,
    })
  }

  return [
    {
      methodForm,
      isLoadingTable,
      tableData: data?.data?.content,
      page: data?.data?.page,
      size: data?.data?.size,
      totalPages: data?.data?.totalPages,
      selectedRows,
      setSelectedRows,
    },
    { t, onReset, onSubmit, onChangePageSize, refetch, handlePlan },
  ] as const
}
