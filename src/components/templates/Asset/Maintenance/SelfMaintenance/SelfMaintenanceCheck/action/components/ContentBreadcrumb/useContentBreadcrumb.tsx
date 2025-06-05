import {
  incidentList,
  planType,
} from '@/components/templates/Asset/MaintenancePlan/IncidentList/recoil'
import { MENU_URL, TRANSLATE } from '@/routes'
import { useGetAuditMaintenances } from '@/service/asset/maintenance/selfMaintenance/selfMaintenanceCheck/detail'
import { AuditMaintenanceConvert } from '@/service/asset/maintenance/selfMaintenance/selfMaintenanceCheck/detail/type'

import { useRouter } from 'next/router'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useSetRecoilState } from 'recoil'
export type Props = {
  id: number
}

export default function useContentBreadcrumb(props: Props) {
  const { t } = useTranslation(TRANSLATE.MAINTENANCE)
  const { id } = props
  const methods = useFormContext<AuditMaintenanceConvert>()
  const { handleSubmit, reset, getValues } = methods
  const router = useRouter()

  const {
    data: dataAuditMaintenances,
    isLoading: isLoadingAuditMaintenances,
    refetch: refetchAuditMaintenances,
  } = useGetAuditMaintenances({ maintenanceScheduleId: id })

  const onSubmit = handleSubmit((data) => {})

  const setIncidentList = useSetRecoilState(incidentList)
  const setPlanType = useSetRecoilState(planType)

  const handlePlan = () => {
    setIncidentList([
      {
        department: dataAuditMaintenances?.data?.department,
        asset: dataAuditMaintenances?.data?.asset,
        card: dataAuditMaintenances?.data?.maintenanceCard,
        currentShift: dataAuditMaintenances?.data?.currentShift,
        errorDangerDate: dataAuditMaintenances?.data?.errorDangerDate,
      },
    ])
    setPlanType('WEEKLY_INCIDENT')
    router.push({
      pathname: `${MENU_URL.WEEKLY_MAINTENANCE_PLAN}`,
    })
  }

  return [
    {
      methods,
      dataAuditMaintenances: dataAuditMaintenances
        ? dataAuditMaintenances.data
        : null,
      isLoadingAuditMaintenances,
    },
    { t, onSubmit, refetchAuditMaintenances, handlePlan },
  ] as const
}
