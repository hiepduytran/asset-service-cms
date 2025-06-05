import { CoreDatePicker } from '@/components/atoms/CoreDatePicker'
import CoreInput from '@/components/atoms/CoreInput'
import { FORMAT_DATE_API } from '@/components/hooks/date/useDate'
import { ColumnProps } from '@/components/organism/CoreTable'
import { TRANSLATE } from '@/routes'
import { WeeklyMaintenancePlanSave } from '@/service/asset/maintenancePlan/weeklyMaintenancePlan/save/type'
import _ from 'lodash'
import moment from 'moment'
import { useTranslation } from 'next-i18next'
import { useEffect, useMemo, useState } from 'react'
import { useFormContext } from 'react-hook-form'


export const useTableStep3 = (props: {
    index: number
}) => {
    const { t } = useTranslation(TRANSLATE.WEEKLY_MAINTENANCE_PLAN)
    const { index } = props
    const { control, watch, setValue } = useFormContext<WeeklyMaintenancePlanSave>()

    const [startDates, setStartDates] = useState<{ [key: number]: string }>({})
    const [endDates, setEndDates] = useState<{ [key: number]: string }>({})
    const earliestDate = useMemo(() => {
        const dates = Object.values(startDates)
        if (dates.length === 0) return null
        return dates.reduce((minDate, currentDate) => {
            const currentMoment = moment(currentDate, FORMAT_DATE_API, true)
            const minMoment = moment(minDate, FORMAT_DATE_API, true)
            return currentMoment.isBefore(minMoment) ? currentDate : minDate
        }, dates[0])
    }, [startDates])
    const latestEndDate = useMemo(() => {
        const dates = Object.values(endDates)
        if (dates.length === 0) return null
        return dates.reduce((maxDate, currentDate) => {
            const currentMoment = moment(currentDate, FORMAT_DATE_API, true)
            const maxMoment = moment(maxDate, FORMAT_DATE_API, true)
            return currentMoment.isAfter(maxMoment) ? currentDate : maxDate
        }, dates[0])
    }, [endDates])
    useEffect(() => {
        if (earliestDate) {
            setValue(`planDescribe.${index}.startDate`, earliestDate)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [earliestDate])
    useEffect(() => {
        if (latestEndDate) {
            setValue(`planDescribe.${index}.endDate`, latestEndDate)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [latestEndDate])
    const handleStartDateChange = (index: number, newDate: string) => {
        setStartDates((prevDates) => ({
            ...prevDates,
            [index]: newDate
        }))
    }
    const handleEndDateChange = (index: number, newDate: string) => {
        setEndDates((prevDates) => ({
            ...prevDates,
            [index]: newDate
        }))
    }
    const columnsTableStep3 = useMemo(
        () =>
            [
                {
                    header: t('table.sparePart'),
                    fieldName: 'accessory',
                },
                {
                    header: t('table.lastMaintenanceDate'),
                    fieldName: 'lastMaintenanceDate',
                },
                {
                    header: (
                        <>
                            {t('table.jobContent')}
                            <span className='text-[#FF4956]'> *</span>
                        </>
                    ),
                    fieldName: 'content',
                },
                {
                    header: (
                        <>
                            {t('table.implementer')}
                            <span className='text-[#FF4956]'> *</span>
                        </>
                    ),
                    fieldName: 'implementer',
                },
                {
                    header: (
                        <>
                            {t('table.supportPerson')}
                            <span className='text-[#FF4956]'> *</span>
                        </>
                    ),
                    fieldName: 'supportPerson',
                },
                {
                    header: t('table.numberResources'),
                    fieldName: 'numberResources',
                },
                {
                    header: (
                        <>
                            {t('table.startDate')}
                            <span className='text-[#FF4956]'> *</span>
                        </>
                    ),
                    fieldName: 'startDate',
                },
                {
                    header: (
                        <>
                            {t('table.endDate')}
                            <span className='text-[#FF4956]'> *</span>
                        </>
                    ),
                    fieldName: 'endDate',
                },
                {
                    header: t('table.quantityDate'),
                    fieldName: 'quantityDate',
                },
                {
                    header: t('table.totalPersonnel'),
                    fieldName: 'totalPersonnel',
                },
                {
                    header: t('table.note'),
                    fieldName: 'note',
                },
            ] as ColumnProps[],
        [t]
    )

    const dataTableStep3 = (watch(`planConfig.${index}.planConfigMaintenance`) ?? []).map((item: any, index2: number) => {
        return {
            accessory: <CoreInput
                control={control}
                name={`planDescribe.${index}.planDescribeMaintenance.${index2}.productName`}
                isViewProp
            />,
            lastMaintenanceDate: <CoreDatePicker
                control={control}
                name={`planDescribe.${index}.planDescribeMaintenance.${index2}.lastMaintenanceDate`}
                isViewProp
            />,
            content: <CoreInput
                control={control}
                name={`planDescribe.${index}.planDescribeMaintenance.${index2}.content`}
                placeholder={t('placeholder.content')}
                required
                rules={{ required: t('common:validation.required') }}
                inputProps={{
                    maxLength: 1000,
                }}
            />,
            implementer: <CoreInput
                control={control}
                name={`planDescribe.${index}.planDescribeMaintenance.${index2}.implementer`}
                placeholder={t('placeholder.implementer')}
                required
                rules={{ required: t('common:validation.required') }}
                inputProps={{
                    maxLength: 50,
                }}
            />,
            supportPerson: <CoreInput
                control={control}
                name={`planDescribe.${index}.planDescribeMaintenance.${index2}.supportPerson`}
                placeholder={t('placeholder.supportPerson')}
                required
                rules={{ required: t('common:validation.required') }}
                inputProps={{
                    maxLength: 50,
                }}
            />,
            numberResources: <CoreInput
                control={control}
                name={`planDescribe.${index}.planDescribeMaintenance.${index2}.numberResources`}
                placeholder={t('placeholder.numberResources')}
                type='number'
                disableDecimal
                disableNegative
                disableZero
                inputProps={{
                    maxLength: 2,
                }}
            />,
            startDate: <CoreDatePicker
                control={control}
                name={`planDescribe.${index}.planDescribeMaintenance.${index2}.startDate`}
                onChangeValue={(newDate) => handleStartDateChange(index2, newDate)}
                required
                rules={{ required: t('common:validation.required') }}
                disablePast
            />,
            endDate: <CoreDatePicker
                control={control}
                name={`planDescribe.${index}.planDescribeMaintenance.${index2}.endDate`}
                onChangeValue={(newDate) => handleEndDateChange(index2, newDate)}
                required
                rules={{ required: t('common:validation.required') }}
                disablePast
            />,
            quantityDate: <CoreInput
                control={control}
                name={`planDescribe.${index}.planDescribeMaintenance.${index2}.quantityDate`}
                placeholder={t('placeholder.quantityDate')}
                type='number'
                disableDecimal
                disableNegative
                disableZero
            />,
            totalPersonnel: <CoreInput
                control={control}
                name={`planDescribe.${index}.planDescribeMaintenance.${index2}.totalPersonnel`}
                placeholder={t('placeholder.totalPersonnel')}
                type='number'
                disableDecimal
                disableNegative
                disableZero
            />,
            note: <CoreInput
                control={control}
                name={`planDescribe.${index}.planDescribeMaintenance.${index2}.note`}
                placeholder={t('placeholder.enterNote')}
                inputProps={{
                    maxLength: 1000,
                }}
            />,
        }
    })
    return [
        {
            columnsTableStep3,
            dataTableStep3
        },
        {},
    ] as const
}
