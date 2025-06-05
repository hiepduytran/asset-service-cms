import {
  DEFAULT_FORMAT_DATE,
  FORMAT_DATE_API,
} from '@/components/hooks/date/useDate'
import { useAppSelector } from '@/redux/hook'
import { DateView } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import moment, { Moment } from 'moment'
import { useRouter } from 'next/router'
import * as React from 'react'
import { Control, Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { getPlaceholder } from '@/helper/getPlaceholder'

export type CoreDatePickerProps = {
  format?: string
  locale?: string
  className?: string
  disabled?: boolean
  readOnly?: boolean
  disableFuture?: boolean
  acceptRegex?: any
  disableHighlightToday?: boolean
  disableMaskedInput?: boolean
  disableOpenPicker?: boolean
  disablePast?: boolean
  shouldDisableDate?: any
  shouldDisableMonth?: any
  shouldDisableYear?: any
  label?: any
  placeholder?: string
  valueProp?: any
  error?: boolean
  helperText?: string
  control: Control<any>
  name: string
  rules?: object
  required?: boolean
  trigger?: any
  minDate?: Moment | Date | string | number
  maxDate?: Moment | Date | string | number
  views?: DateView[]
  variant?: 'outlined' | 'filled' | 'standard'
  isViewProp?: boolean
  isHasMessageError?: boolean
  onChange?: (value: any) => void
  onChangeValue?: (value: any) => void
}

export const CoreDatePicker = (props: CoreDatePickerProps) => {
  const { t } = useTranslation()
  const router = useRouter()
  const { actionType } = router.query

  const {
    variant = 'standard',
    locale = 'en-US',
    format,
    className,
    valueProp,
    label,
    placeholder,
    error,
    control,
    name,
    helperText,
    rules,
    required,
    trigger,
    readOnly,
    isViewProp,
    isHasMessageError = true,
    minDate,
    maxDate,
    onChange,
    onChangeValue,
    ...rest
  } = props

  const isView = isViewProp ?? actionType === 'VIEW'

  const { dateType = DEFAULT_FORMAT_DATE } = useAppSelector(
    (state) => state.companyConfigData
  )

  const getValidDate = (date: any) => {
    if (moment.isMoment(date)) {
      return date
    } else if (typeof date === 'string' || typeof date === 'number') {
      return moment(date)
    } else if (date instanceof Date) {
      return moment(date)
    }
    return undefined
  }

  const formatDate = (value: any) => {
    if (!value) return null
    return moment.isMoment(value)
      ? value
      : moment(value, format ?? FORMAT_DATE_API)
  }

  const handleDateChange = React.useCallback(
    (onChange: (value: any) => void, newValue: Moment | null) => {
      if (newValue) {
        const afterValue = newValue.isValid()
          ? newValue.format(format ?? FORMAT_DATE_API)
          : newValue

        onChange(afterValue)
        if (onChangeValue) onChangeValue(afterValue)
      } else {
        onChange(null)
        if (onChangeValue) onChangeValue(null)
      }

      if (trigger) trigger(name)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [trigger, format, name]
  )

  return (
    <div className={className}>
      <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale={locale}>
        <Controller
          control={control}
          name={name}
          render={({
            field: { onChange, onBlur, value, ref, ...params },
            fieldState: { error },
          }) => (
            <DatePicker
              disableOpenPicker={isView}
              label={label}
              value={valueProp ? formatDate(valueProp) : formatDate(value)}
              onChange={(newValue: Moment | null) =>
                handleDateChange(onChange, newValue)
              }
              inputRef={ref}
              readOnly={isView || readOnly}
              format={format ?? dateType}
              minDate={getValidDate(minDate)}
              maxDate={getValidDate(maxDate)}
              slotProps={{
                day: {
                  style: {
                    fontSize: '0.68rem',
                  },
                },
                textField: {
                  error: !!error,
                  fullWidth: true,
                  variant: 'standard',
                  placeholder: getPlaceholder(
                    t,
                    'date',
                    placeholder,
                    label,
                    isView,
                    value
                  ),

                  helperText: error?.message ?? helperText,
                  inputProps: {
                    readOnly: isView || readOnly,
                  },
                  InputProps: {
                    disableUnderline: isView,
                  },
                  InputLabelProps: {
                    required: required,
                  },
                  ...params,
                  ...rest,
                  onBlur: (e) => {
                    const value = e.target.value
                    const parsedDate = moment(value, dateType, true)
                    handleDateChange(
                      onChange,
                      parsedDate.isValid() ? parsedDate : null
                    )
                    onBlur()
                  },
                },
              }}
              {...rest}
            />
          )}
          rules={!isView ? rules : {}}
        />
      </LocalizationProvider>
    </div>
  )
}
