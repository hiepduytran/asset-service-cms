import CoreInput from '@/components/atoms/CoreInput'
import { ColumnProps } from '@/components/organism/CoreTable'
import { TRANSLATE } from '@/routes'
import { WeeklyMaintenancePlanSave } from '@/service/asset/maintenancePlan/weeklyMaintenancePlan/save/type'
import _ from 'lodash'
import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'
import { useFormContext } from 'react-hook-form'

export const useStep4 = () => {
    const { t } = useTranslation(TRANSLATE.WEEKLY_MAINTENANCE_PLAN)
    const { control, watch } = useFormContext<WeeklyMaintenancePlanSave>()

    const columns = useMemo(
        () =>
            [
                {
                    header: t('table.productMaintenance'),
                    fieldName: 'product',
                },
                {
                    header: t('table.uom'),
                    fieldName: 'uom',
                },
                {
                    header: t('table.requestQuantity'),
                    fieldName: 'requestQuantity',
                },
                {
                    header: t('table.quantityFactoryInventory'),
                    fieldName: 'quantityFactoryInventory',
                },
                {
                    header: t('table.quantityCompanyInventory'),
                    fieldName: 'quantityCompanyInventory',
                },
                {
                    header: t('table.quantityRequestAllocation'),
                    fieldName: 'quantityRequestAllocation',
                },
            ] as ColumnProps[],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [t]
    )
    const dataConsumable = useMemo(() => {
        return watch('planGeneral.consumable')
            .map((item, index) => {
                return {
                    product: <CoreInput
                        control={control}
                        name={`planGeneral.consumable.${index}.product`}
                        isViewProp={true}
                        value={watch(`planGeneral.consumable.${index}.product.name`)}
                    />,
                    uom: <CoreInput
                        control={control}
                        name={`planGeneral.consumable.${index}.uom`}
                        isViewProp={true}
                        value={watch(`planGeneral.consumable.${index}.uom.name`)}
                    />,
                    requestQuantity: <CoreInput
                        control={control}
                        name={`planGeneral.consumable.${index}.requestQuantity`}
                        isViewProp={true}
                    />,
                    quantityFactoryInventory: <CoreInput
                        control={control}
                        name={`planGeneral.consumable.${index}.quantityFactoryInventory`}
                        isViewProp={true}
                    />,
                    quantityCompanyInventory: <CoreInput
                        control={control}
                        name={`planGeneral.consumable.${index}.quantityCompanyInventory`}
                        isViewProp={true}
                    />,
                    quantityRequestAllocation: <CoreInput
                        control={control}
                        name={`planGeneral.consumable.${index}.quantityRequestAllocation`}
                        isViewProp={true}
                    />,
                }
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [watch('planGeneral.consumable')]);

    const dataReplacementMaterial = useMemo(() => {
        return watch('planGeneral.replacementMaterial')
            .map((item, index) => {
                return {
                    product: <CoreInput
                        control={control}
                        name={`planGeneral.replacementMaterial.${index}.product`}
                        isViewProp={true}
                        value={watch(`planGeneral.replacementMaterial.${index}.product.name`)}
                    />,
                    uom: <CoreInput
                        control={control}
                        name={`planGeneral.replacementMaterial.${index}.uom`}
                        isViewProp={true}
                        value={watch(`planGeneral.replacementMaterial.${index}.uom.name`)}

                    />,
                    requestQuantity: <CoreInput
                        control={control}
                        name={`planGeneral.replacementMaterial.${index}.requestQuantity`}
                        isViewProp={true}
                    />,
                    quantityFactoryInventory: <CoreInput
                        control={control}
                        name={`planGeneral.replacementMaterial.${index}.quantityFactoryInventory`}
                        isViewProp={true}
                    />,
                    quantityCompanyInventory: <CoreInput
                        control={control}
                        name={`planGeneral.replacementMaterial.${index}.quantityCompanyInventory`}
                        isViewProp={true}
                    />,
                    quantityRequestAllocation: <CoreInput
                        control={control}
                        name={`planGeneral.replacementMaterial.${index}.quantityRequestAllocation`}
                        isViewProp={true}
                    />,
                }
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [watch('planGeneral.replacementMaterial')]);

    return [
        {
            columns,
            dataConsumable,
            dataReplacementMaterial
        },
        { t },
    ] as const
}
