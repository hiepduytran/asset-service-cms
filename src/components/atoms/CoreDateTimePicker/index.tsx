import {
  DEFAULT_FORMAT_DATE_TIME,
  FORMAT_DATE_TIME_API,
} from '@/components/hooks/date/useDate'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import moment, { Moment } from 'moment'
import { useRouter } from 'next/router'
import React from 'react'
import { Control, Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { getPlaceholder } from '@/helper/getPlaceholder'

export type CoreDateTimePickerProps = {
  format?: string
  locale?: string
  className?: string
  disabled?: boolean
  readOnly?: boolean
  disableFuture?: boolean
  acceptRegex?: any
  closeOnSelect?: boolean
  disableHighlightToday?: boolean
  disableMaskedInput?: boolean
  disableOpenPicker?: boolean
  disablePast?: boolean
  shouldDisableDate?: any
  shouldDisableMonth?: any
  shouldDisableYear?: any
  label?: any
  placeholder?: string
  value?: any
  error?: boolean
  helperText?: string
  control: Control<any>
  name: string
  rules?: object
  required?: boolean
  trigger?: any
  minDate?: Moment | Date | string | number
  maxDate?: Moment | Date | string | number
  variant?: 'outlined' | 'filled' | 'standard'
  isViewProp?: boolean
  isHasMessageError?: boolean
  onChange?: (value: any) => void
  onChangeValue?: (value: any) => void
}

export const CoreDateTimePicker = (props: CoreDateTimePickerProps) => {
  const { t } = useTranslation()
  const {
    locale = 'en-US',
    variant = 'standard',
    value,
    label,
    placeholder,
    format,
    error,
    control,
    name,
    helperText,
    rules,
    required,
    trigger,
    readOnly,
    isViewProp,
    minDate,
    maxDate,
    onChange,
    onChangeValue,
    ...rest
  } = props

  const router = useRouter()
  const { actionType } = router.query

  const isView = isViewProp ?? actionType === 'VIEW'

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
      : moment(value, format ?? FORMAT_DATE_TIME_API)
  }

  const handleDateChange = React.useCallback(
    (onChange: (value: any) => void, newValue: Moment | null) => {
      if (newValue) {
        if (onChangeValue) {
          onChangeValue(newValue.format(FORMAT_DATE_TIME_API))
        }
        onChange(
          newValue.isValid()
            ? newValue.format(format ?? FORMAT_DATE_TIME_API)
            : newValue
        )
      } else {
        onChange(null)
      }
      if (trigger) trigger(name)
    },
    [format, trigger, name, onChangeValue]
  )

  const renderOpenPickerIcon = () => {
    if (isView) return null
    return <CalendarMonthIcon fontSize='small' />
  }

  return (
    <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale={locale}>
      <Controller
        control={control}
        name={name}
        render={({
          field: { onChange, onBlur, value, ref, ...params },
          fieldState: { error },
        }) => {
          return (
            <DateTimePicker
              label={label}
              format={format ?? DEFAULT_FORMAT_DATE_TIME}
              value={moment(value, FORMAT_DATE_TIME_API)}
              onChange={(newValue: Moment | null) =>
                handleDateChange(onChange, newValue)
              }
              inputRef={ref}
              readOnly={readOnly}
              minDate={getValidDate(minDate)}
              maxDate={getValidDate(maxDate)}
              slots={{
                openPickerIcon: renderOpenPickerIcon,
              }}
              slotProps={{
                textField: {
                  variant: 'standard',
                  placeholder: getPlaceholder(
                    t,
                    'time',
                    placeholder,
                    label,
                    isView,
                    value
                  ),
                  fullWidth: true,
                  error: !!error,
                  helperText: error?.message,
                  required: required,
                  InputProps: {
                    disableUnderline: readOnly || isView,
                  },
                  ...params,
                  ...rest,
                  onBlur: () => {
                    // const value = e.target.value
                    // const parsedDate = moment(value, FORMAT_DATE_TIME_API, true)
                    // handleDateChange(
                    //   onChange,
                    //   parsedDate.isValid() ? parsedDate : null
                    // )
                    onBlur()
                  },
                },
                day: {
                  style: {
                    fontSize: '0.8rem',
                  },
                },
                inputAdornment: {
                  style: {
                    margin: '12px',
                  },
                },
              }}
              {...rest}
            />
          )
        }}
        rules={rules}
      />
    </LocalizationProvider>
  )
}
