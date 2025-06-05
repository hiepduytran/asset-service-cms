import { MENU_URL, TRANSLATE } from '@/routes'
import { draftStandardMaintenanceCard } from '@/service/asset/maintenance/selfMaintenance/SelfMaintenanceForm/action'
import { DetailMaintenancesCard } from '@/service/asset/maintenance/selfMaintenance/SelfMaintenanceForm/list/type'
import { toastError, toastSuccess } from '@/toast'
import { useRouter } from 'next/router'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useMutation } from 'react-query'

export default function useStep2() {
  const { t } = useTranslation(TRANSLATE.MAINTENANCE)
  const methods = useFormContext<DetailMaintenancesCard>()
  const router = useRouter()
  const { id, actionType } = router.query
  const isView = actionType === 'VIEW'
  const isUpdate = !!id
  const { getValues, control, setError } = methods

  const { fields: fieldsMaintenanceCardLines } = useFieldArray({
    control,
    name: 'maintenanceCardLines',
    keyName: 'key',
  })

  const { mutate, isLoading: loadingDraft } = useMutation(
    draftStandardMaintenanceCard,
    {
      onSuccess: (data) => {
        toastSuccess(t('common:message.success'))
        router.push({
          pathname: `${MENU_URL.MAINTENANCE.SELF_MAINTENANCE.SELF_MAINTENANCE_FORM}/[id]`,
          query: { id: data.data.id, actionType: 'VIEW' },
        })
      },
      onError: (error) => {
        toastError(error, setError)
      },
    }
  )

  const onDraft = () => {
    const {
      isMon,
      isTue,
      isWed,
      isThu,
      isFri,
      isSat,
      isSun,
      standardMethodGroups,
      applicableDayOfWeeks,
      maintenanceCardLines,
      ...rest
    } = getValues()
    const standardApplicableLine = (standardMethodGroups ?? [])
      .filter((standard) => {
        return standard?.check
      })
      .map((item) => item.standardGroup)

    mutate({
      ...rest,
      standardApplicableLine: standardApplicableLine,
      maintenanceCardLines: maintenanceCardLines
        ? maintenanceCardLines.map((maintenanceCardLine, _) => {
            return {
              ...maintenanceCardLine,
              standardMaintenanceLines:
                maintenanceCardLine.standardMaintenanceLines.map((item, _) => {
                  return {
                    ...item,
                    frequency: Number(item.frequency),
                    frequencyType: 'TIMES',
                  }
                }),
            }
          })
        : [],
      applicableDayOfWeeks: [
        ...(isMon ? ['MON'] : []),
        ...(isTue ? ['TUE'] : []),
        ...(isWed ? ['WED'] : []),
        ...(isThu ? ['THU'] : []),
        ...(isFri ? ['FRI'] : []),
        ...(isSat ? ['SAT'] : []),
        ...(isSun ? ['SUN'] : []),
      ],
      state: 'DRAFT',
    })
  }

  const onCancel = () => {
    router.push(MENU_URL.MAINTENANCE.SELF_MAINTENANCE.SELF_MAINTENANCE_FORM)
  }

  return [
    { methods, fieldsMaintenanceCardLines, isView, isUpdate, loadingDraft },
    { t, onCancel, onDraft },
  ] as const
}
