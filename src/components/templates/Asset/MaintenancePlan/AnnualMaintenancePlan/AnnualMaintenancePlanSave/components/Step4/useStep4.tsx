import CoreInput from '@/components/atoms/CoreInput'
import { ColumnProps } from '@/components/organism/CoreTable'
import { TRANSLATE } from '@/routes'
import { WeeklyMaintenancePlanSave } from '@/service/asset/maintenancePlan/weeklyMaintenancePlan/save/type'
import _ from 'lodash'
import { useTranslation } from 'next-i18next'
import { useEffect, useMemo, useState } from 'react'
import { useFormContext } from 'react-hook-form'

export const useStep4 = () => {
    const { t } = useTranslation(TRANSLATE.WEEKLY_MAINTENANCE_PLAN)
    const { control, watch, setValue } = useFormContext<WeeklyMaintenancePlanSave>()
    const [maintenanceAccessory, setMaintenanceAccessory] = useState<any[]>([])
    useEffect(() => {
        const accessories = (watch(`planConfig`) ?? []).flatMap((item: any) =>
            (item?.planConfigMaintenance ?? []).flatMap((item2: any) =>
                (item2?.planConfigLine ?? [])
            )
        );

        const filteredAccessories = accessories.reduce((acc: any, item: any) => {
            const productName = item?.product?.name;

            if (!acc[productName]) {
                acc[productName] = {
                    product: { ...item?.product },
                    quantity: item?.quantity,
                    type: item?.type,
                    uom: { ...item?.uom },
                    factoryQty: item?.factoryQty,
                    internalQty: item?.internalQty,
                };
            } else {
                acc[productName].quantity = Number(acc[productName].quantity) + Number(item.quantity);
            }

            return acc;
        }, {});

        setMaintenanceAccessory(Object.values(filteredAccessories));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [watch(`planConfig`)]);

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
        return maintenanceAccessory
            .filter(item => item.type === 'INTERNAL')
            .map((item, index) => {
                setValue(`planGeneral.consumable.${index}.product`, item.product);
                setValue(`planGeneral.consumable.${index}.uom`, item.uom);
                setValue(`planGeneral.consumable.${index}.requestQuantity`, item.quantity);
                setValue(`planGeneral.consumable.${index}.quantityFactoryInventory`, item.factoryQty);
                setValue(`planGeneral.consumable.${index}.quantityCompanyInventory`, item.internalQty);
                setValue(`planGeneral.consumable.${index}.quantityRequestAllocation`, (item.quantity - (item.factoryQty + item.internalQty)));
                return {
                    product: <CoreInput
                        control={control}
                        name={`planGeneral.consumable.${index}.product`}
                        isViewProp={true}
                        value={item.product.name}
                    />,
                    uom: <CoreInput
                        control={control}
                        name={`planGeneral.consumable.${index}.uom`}
                        isViewProp={true}
                        value={item.uom.name}
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
    }, [maintenanceAccessory]);

    const dataReplacementMaterial = useMemo(() => {
        return maintenanceAccessory
            .filter(item => item.type === 'ACCESSORY')
            .map((item, index) => {
                setValue(`planGeneral.replacementMaterial.${index}.product`, item.product);
                setValue(`planGeneral.replacementMaterial.${index}.uom`, item.uom);
                setValue(`planGeneral.replacementMaterial.${index}.requestQuantity`, item.quantity);
                setValue(`planGeneral.replacementMaterial.${index}.quantityFactoryInventory`, item.factoryQty);
                setValue(`planGeneral.replacementMaterial.${index}.quantityCompanyInventory`, item.internalQty);
                setValue(`planGeneral.replacementMaterial.${index}.quantityRequestAllocation`, (item.quantity - (item.factoryQty + item.internalQty)));
                return {
                    product: <CoreInput
                        control={control}
                        name={`planGeneral.replacementMaterial.${index}.product`}
                        isViewProp={true}
                        value={item.product.name}
                    />,
                    uom: <CoreInput
                        control={control}
                        name={`planGeneral.replacementMaterial.${index}.uom`}
                        isViewProp={true}
                        value={item.uom.name}
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
    }, [maintenanceAccessory]);

    return [
        {
            columns,
            dataConsumable,
            dataReplacementMaterial
        },
        { t },
    ] as const
}
