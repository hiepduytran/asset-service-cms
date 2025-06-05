import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import CoreInput from '@/components/atoms/CoreInput'
import { ColumnProps } from '@/components/organism/CoreTable'
import { TRANSLATE } from '@/routes'
import { getAssetListByProductId } from '@/service/asset/allocation/save/getListAsset'
import { getDepartmentList } from '@/service/resource/getDepartmentList'
import _ from 'lodash'
import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { WeeklyMaintenancePlanSave } from '@/service/asset/maintenancePlan/weeklyMaintenancePlan/save/type'

export const useStep1 = () => {
    const { t } = useTranslation(TRANSLATE.WEEKLY_MAINTENANCE_PLAN)
    const { control, watch } = useFormContext<WeeklyMaintenancePlanSave>()

    const { fields: fieldsStep1, append: appendStep1, remove: removeStep1 } = useFieldArray({
        control,
        name: 'planLine',
        keyName: 'keyStep1'
    })
    const columnsStep1 = useMemo(
        () =>
            [
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
            ] as ColumnProps[],
        [t]
    )

    const dataTableStep1 = fieldsStep1.map((item: any, index: number) => {
        return {
            key: item.keyStep1,
            department: <CoreAutoCompleteAPI
                control={control}
                label=''
                name={`planLine.${index}.department`}
                placeholder={t('placeholder.selectDepartment')}
                fetchDataFn={getDepartmentList}
                isViewProp
            />,
            dic: <CoreAutoCompleteAPI
                control={control}
                label=''
                name={`planLine.${index}.asset`}
                placeholder={t('placeholder.selectDIC')}
                fetchDataFn={getAssetListByProductId}
                params={{ productId: watch(`planLine.${index}.sku`)?.productId }}
                labelPath='code'
                valuePath='id'
                isViewProp
            />,
            assetName: <CoreInput
                control={control}
                name={`planLine.${index}.assetName`}
                isViewProp
            />,
        }
    })

    return [
        {
            columnsStep1,
            dataTableStep1
        },
        { t, appendStep1 },
    ] as const
}
