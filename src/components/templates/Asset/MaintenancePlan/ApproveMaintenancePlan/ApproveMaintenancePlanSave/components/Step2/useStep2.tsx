import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import CoreInput from '@/components/atoms/CoreInput'
import { ColumnProps } from '@/components/organism/CoreTable'
import { TRANSLATE } from '@/routes'
import { getAssetListByProductId, getListCodeAsset } from '@/service/asset/allocation/save/getListAsset'
import { getDepartmentList } from '@/service/resource/getDepartmentList'
import _ from 'lodash'
import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { WeeklyMaintenancePlanSave } from '@/service/asset/maintenancePlan/weeklyMaintenancePlan/save/type'

export const useStep2 = () => {
    const { t } = useTranslation(TRANSLATE.WEEKLY_MAINTENANCE_PLAN)
    const { control, watch, setValue } = useFormContext<WeeklyMaintenancePlanSave>()
    const { fields: fieldsStep1 } = useFieldArray({
        control,
        name: 'planLine',
        keyName: 'keyStep1'
    })
    const columnsStep1 = useMemo(
        () => {
            const baseColumns = [
                {
                    header: t('table.department'),
                    fieldName: 'department',
                },
                {
                    header: 'DIC',
                    fieldName: 'dic',
                },
                {
                    header: t('table.assetName'),
                    fieldName: 'assetName',
                },
                {
                    header: '',
                    fieldName: 'deleteProduct',
                },
            ];

            if (watch('plantType') === 'YEAR') {
                baseColumns.splice(1, 0, {
                    header: 'SKU',
                    fieldName: 'sku',
                });
                baseColumns.splice(4, 0, {
                    header: t('table.note'),
                    fieldName: 'note',
                });
            }

            if (watch('plantType') === 'EMERGENCY_TROUBLESHOOTING') {
                baseColumns.splice(1, 0, {
                    header: 'SKU',
                    fieldName: 'sku',
                });
            }


            return baseColumns as ColumnProps[];
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [t, watch('plantType')]
    );

    const dataTableStep1 = fieldsStep1.map((item: any, index: number) => {
        return {
            key: item.keyStep1,
            department: <CoreAutoCompleteAPI
                control={control}
                label=''
                name={`planLine.${index}.department`}
                placeholder=''
                fetchDataFn={getDepartmentList}
                isViewProp
            />,
            sku: <CoreAutoCompleteAPI
                control={control}
                label=''
                name={`planLine.${index}.sku`}
                placeholder=''
                fetchDataFn={getListCodeAsset}
                isViewProp
                valuePath='asset.id'
                labelPath='asset.name'
                labelPathDisplay={['asset.code', 'asset.name']}
            />,
            dic: <CoreAutoCompleteAPI
                control={control}
                label=''
                name={`planLine.${index}.asset`}
                placeholder=''
                fetchDataFn={getAssetListByProductId}
                params={{ productId: watch(`planLine.${index}.sku`)?.productId }}
                labelPath='code'
                valuePath='id'
                onChangeValue={(value) => {
                    setValue(`planLine.${index}.assetName`, value?.name)
                }}
                isViewProp
            />,
            assetName: <CoreInput
                control={control}
                name={`planLine.${index}.assetName`}
                isViewProp
            />,
            note: <CoreInput
                control={control}
                name={`planLine.${index}.note`}
                isViewProp
            />,
            deleteProduct: <></>
        }
    })

    return [
        {
            columnsStep1,
            dataTableStep1
        },
        {},
    ] as const
}
