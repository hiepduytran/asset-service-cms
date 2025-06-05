import CoreAutoCompleteAPI from "@/components/atoms/CoreAutoCompleteAPI";
import { CoreDatePicker } from "@/components/atoms/CoreDatePicker";
import CoreInput from "@/components/atoms/CoreInput";
import { ColumnProps } from "@/components/organism/CoreTable";
import { TRANSLATE } from "@/routes";
import { getListPartner } from "@/service/resource/getPartner";
import { getListCountry } from "@/service/resource/countries";
import { useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { getListProducer } from "@/service/product/getListProducer";

export const useCustomTable = (props: any) => {
    const { t } = useTranslation(TRANSLATE.ASSET_DECLARATION_CATEGORY_LIST)
    const { productId, checkingType, index } = props
    const { control, watch } = useFormContext()

    const columns = useMemo(
        () => {
            const baseColumns = [
                {
                    header: t('table.serialAndIdentifierCode'),
                    fieldName: 'serialAndIdentifierCode',
                },
                {
                    header: t('table.origin'),
                    fieldName: 'origin',
                },
                {
                    header: t('table.manufacturer'),
                    fieldName: 'manufacturer',
                },
                {
                    header: t('table.supplier'),
                    fieldName: 'supplier',
                },
                {
                    header: t('table.dateOfPurchase'),
                    fieldName: 'dateOfPurchase',
                },
                {
                    header: t('table.dateOfUse'),
                    fieldName: 'dateOfUse',
                },
            ]
            if (checkingType === 'ALL') {
                baseColumns.splice(1, 0, {
                    header: t('table.lot'),
                    fieldName: 'lot',
                });
            }
            return baseColumns as ColumnProps[]
        },
        [checkingType, t]
    )

    const dataTable = watch('pickIns')[index].asset?.map((item1: any, index1: number) => {
        return ({
            serialAndIdentifierCode: (
                <CoreInput
                    control={control}
                    name={`pickIns.${index}.asset.${index1}.code`}
                    label=""
                    placeholder={t('placeholder.serialAndIdentifierCode')}
                    isViewProp
                />
            ),
            lot: (
                <CoreInput
                    control={control}
                    name=''
                    label=''
                    value={watch(`pickIns.${index}.asset.${index1}.lot`)?.code}
                    isViewProp
                />
            ),
            origin: (
                <CoreAutoCompleteAPI
                    control={control}
                    name={`pickIns.${index}.asset.${index1}.country`}
                    label=""
                    placeholder={t('placeholder.origin')}
                    fetchDataFn={getListCountry}
                />
            ),
            manufacturer: (
                <CoreAutoCompleteAPI
                    control={control}
                    name={`pickIns.${index}.asset.${index1}.partner`}
                    label=""
                    placeholder={t('placeholder.manufacturer')}
                    fetchDataFn={getListPartner}
                />
            ),
            supplier: (
                <CoreAutoCompleteAPI
                    control={control}
                    name={`pickIns.${index}.asset.${index1}.producer`}
                    label=""
                    placeholder={t('placeholder.supplier')}
                    fetchDataFn={getListProducer}
                    params={{
                        productId: productId
                    }}
                />
            ),
            dateOfPurchase: (
                <CoreDatePicker
                    control={control}
                    name={`pickIns.${index}.asset.${index1}.orderDate`}
                    label=""
                    placeholder='dd/mm/yyyy'
                />
            ),
            dateOfUse: (
                <CoreDatePicker
                    control={control}
                    name={`pickIns.${index}.asset.${index1}.startDate`}
                    label=""
                    placeholder='dd/mm/yyyy'
                    minDate={watch(`pickIns.${index}.asset.${index1}.orderDate`)}
                />
            ),
        })
    })


    return [
        { columns, dataTable },
        {},
    ] as const
}