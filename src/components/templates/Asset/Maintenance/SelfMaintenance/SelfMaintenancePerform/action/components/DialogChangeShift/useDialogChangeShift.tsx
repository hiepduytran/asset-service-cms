import { AutoMaintenanceConvert } from '@/service/asset/maintenance/selfMaintenance/selfMaintenancePerform/detail/type'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

const useDialogChangeShift = ({
  hideDialogChangeShift,
}: {
  hideDialogChangeShift: any
}) => {
  const { t } = useTranslation()
  const methods = useFormContext<AutoMaintenanceConvert>()
  const { getValues, watch, setValue } = methods

  const maintenanceShiftNames = (getValues('maintenanceShifts') ?? []).flatMap(
    (item) => item.shift.map((shift) => `maintenanceShift_${shift.id}`)
  )

  const onChangeShift = () => {
    const selectedShiftIds = maintenanceShiftNames
      .map((shiftName: any, index) => {
        const isShiftSelected = getValues(shiftName)
        return isShiftSelected
          ? getValues(`maintenanceShifts.0.shift.${index}.id`)
          : NaN
      })
      .filter(Boolean)

    setValue('maintenanceShiftId', selectedShiftIds)

    hideDialogChangeShift()
  }

  // useEffect(() => {
  //   setValue(`maintenanceShift_${getValues('currentShift.id')}`, true)
  // }, [])

  return [{ methods }, { t, onChangeShift }] as const
}

export default useDialogChangeShift
