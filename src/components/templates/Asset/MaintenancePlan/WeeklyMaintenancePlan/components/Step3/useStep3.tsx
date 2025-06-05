import { getCmsToken } from '@/config/token'
import { toastError } from '@/toast'
import { TRANSLATE } from '@/routes'
import { getEmployeeByUserId } from '@/service/resource/getEmployeeByUserId'
import { getFrequencyByAssetId } from '@/service/asset/maintenancePlan/weeklyMaintenancePlan/save/getFrequencyByAssetId'
import { getLastMaintenanceDateByAccess } from '@/service/asset/maintenancePlan/weeklyMaintenancePlan/save/getLastMaintenanceDateByAccess'
import { WeeklyMaintenancePlanSave } from '@/service/asset/maintenancePlan/weeklyMaintenancePlan/save/type'
import { useTranslation } from 'next-i18next'
import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'

export const useStep3 = () => {
  const { t } = useTranslation(TRANSLATE.WEEKLY_MAINTENANCE_PLAN)
  const { control, watch, setValue } =
    useFormContext<WeeklyMaintenancePlanSave>()

  useEffect(() => {
    ; (watch(`planLine`) ?? []).forEach((item: any, index: number) => {
      setValue(`planDescribe.${index}.asset`, item?.asset)
      setValue(`planDescribe.${index}.department`, item?.department)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const tokenAccess = getCmsToken()

  const getResponsiblePerson = async (id: number) => {
    try {
      const res = await getEmployeeByUserId({ userId: tokenAccess?.userId })
      watch('planDescribe').forEach((item: any, index: number) => {
        setValue(`planDescribe.${index}.responsiblePerson`, res?.data)
      })
    } catch (error) {
      toastError(error)
    }
  }
  useEffect(() => {
    if (tokenAccess?.userId) {
      getResponsiblePerson(tokenAccess?.userId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenAccess?.userId])
  const getFrequency = async (id: number, index: number) => {
    try {
      const res = await getFrequencyByAssetId({ assetId: id })
      setValue(
        `planDescribe.${index}.frequencyRecommendation`,
        res?.data?.frequency
      )
      setValue(
        `planDescribe.${index}.frequencyReality`,
        res?.data?.actualFrequency
      )
      // setValue(`planDescribe.${index}.frequencyType`, res?.data?.frequencyType)
    } catch (error) {
      toastError(error)
    }
  }
  useEffect(() => {
    ; (watch(`planLine`) ?? []).forEach((item: any, index: number) => {
      if (item?.asset && item?.asset?.id) {
        getFrequency(item?.asset?.id, index)
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getLastMaintenanceDate = async (
    assetId: number,
    accessoryId: number,
    index: number,
    maintenanceIndex: number
  ) => {
    try {
      const res = await getLastMaintenanceDateByAccess({
        assetId: assetId,
        accessoryId: accessoryId,
      })
      setValue(
        `planDescribe.${index}.planDescribeMaintenance.${maintenanceIndex}.lastMaintenanceDate`,
        res?.data?.lastMaintenanceDate
      )
    } catch (error) {
      toastError(error)
    }
  }

  useEffect(() => {
    ; (watch(`planLine`) ?? []).forEach((item: any, index: number) => {
      if (item?.asset && item?.asset?.id) {
        getFrequency(item?.asset?.id, index)
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    ; (watch(`planConfig`) ?? []).forEach((item: any, index: number) => {
      if (item?.asset && item?.asset?.id) {
        item?.planConfigMaintenance.forEach(
          (maintenanceItem: any, maintenanceIndex: number) => {
            const accessoryId =
              maintenanceItem?.maintenanceAccessory?.accessoryId
            getLastMaintenanceDate(
              item?.asset?.id,
              accessoryId,
              index,
              maintenanceIndex
            )
            setValue(
              `planDescribe.${index}.planDescribeMaintenance.${maintenanceIndex}.product`,
              watch(
                `planConfig.${index}.planConfigMaintenance.${maintenanceIndex}.maintenanceAccessory`
              )
            )
            setValue(
              `planDescribe.${index}.planDescribeMaintenance.${maintenanceIndex}.productName`,
              watch(
                `planConfig.${index}.planConfigMaintenance.${maintenanceIndex}.maintenanceAccessory.name`
              )
            )
          }
        )
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return [{}, { t }] as const
}
