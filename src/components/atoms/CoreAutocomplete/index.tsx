import { TRANSLATE } from '@/routes'
import {
  Autocomplete,
  AutocompleteProps,
  CircularProgress,
  FormHelperText,
  TextField,
  Typography,
} from '@mui/material'
import { find, get, isObject, join, map } from 'lodash'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import React, { ReactNode, useCallback } from 'react'
import { Controller } from 'react-hook-form'
import { CoreAutoChip } from '@/components/atoms/CoreAutoChip'
import { getPlaceholder } from '@/helper/getPlaceholder'

export interface FormControlAutoCompleteProps<
  T,
  Multiple extends boolean | undefined = undefined,
  DisableClearable extends boolean | undefined = undefined,
  FreeSolo extends boolean | undefined = undefined
> extends Omit<
    AutocompleteProps<T, Multiple, DisableClearable, FreeSolo>,
    'renderInput'
  > {
  control: any
  name: string
  label?: any
  InputLabelProps?: any
  inputProps?: any
  InputProps?: any
  required?: boolean
  valuePath?: string
  labelPath?: string
  labelPathDisplay?: string[]
  loading?: boolean
  isHasMessageError?: boolean
  returnValueType?: 'enum' | 'option'
  helperText?: ReactNode | string
  AutoCompleteClassName?: string
  defaultValue?: any
  rules?: any
  isCreateAble?: boolean
  onAfterChangeValue?: any
  errCustom?: boolean
  variant?: 'outlined' | 'filled' | 'standard'
  isViewProp?: boolean
  onChangeValue?: (val: any) => void
}

const CoreAutocomplete: <
  T,
  Multiple extends boolean | undefined = undefined,
  DisableClearable extends boolean | undefined = undefined,
  FreeSolo extends boolean | undefined = undefined
>(
  prop: FormControlAutoCompleteProps<T, Multiple, DisableClearable, FreeSolo>
) => React.ReactElement<
  FormControlAutoCompleteProps<T, Multiple, DisableClearable, FreeSolo>
> = (props) => {
  const {
    className,
    control,
    name,
    options,
    label,
    placeholder,
    InputLabelProps,
    inputProps,
    InputProps,
    required,
    readOnly,
    valuePath = 'value',
    labelPath = 'label',
    labelPathDisplay = [labelPath],
    loading,
    isHasMessageError = true,
    returnValueType = 'enum',
    multiple,
    disabled,
    helperText,
    isCreateAble,
    AutoCompleteClassName,
    rules,
    defaultValue,
    size,
    errCustom,
    variant = 'standard',
    isViewProp,
    onChangeValue,
    onAfterChangeValue,
    renderOption,
    ...restProps
  } = props

  const { t } = useTranslation(TRANSLATE.COMMON)

  const router = useRouter()

  const { actionType } = router.query
  const isView = isViewProp ?? actionType === 'VIEW'

  const getValueOption = useCallback(
    (value: any) => {
      if (multiple) {
        if (isCreateAble) {
          return value
        }
        return map(value, (v) => {
          if (!isObject(v)) {
            return (
              find(options, (item) => {
                return get(item, valuePath) === v
              }) ?? null
            )
          }
          return v
        })
      }

      if (returnValueType === 'enum') {
        return find(options, (item) => get(item, valuePath) === value) ?? null
      }

      return value
    },
    [isCreateAble, multiple, options, returnValueType, valuePath]
  )

  const formatOptionLabel = (option: any) =>
    join(
      labelPathDisplay.map((key) => get(option, key)),
      ' - '
    )

  return (
    <div className={className}>
      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue}
        render={({
          field: { onChange, onBlur, value, ref },
          fieldState: { error },
        }) => {
          return (
            <Autocomplete
              forcePopupIcon={!isView}
              className={AutoCompleteClassName}
              multiple={multiple}
              disableCloseOnSelect={multiple}
              defaultValue={defaultValue}
              isOptionEqualToValue={(option, value) => {
                if (value instanceof Object) {
                  return get(option, valuePath) === get(value, valuePath)
                }
                return get(option, valuePath) === value
              }}
              getOptionLabel={(option) => formatOptionLabel(option)}
              loading={loading}
              options={options}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <CoreAutoChip
                    {...getTagProps({ index })}
                    title={formatOptionLabel(option)}
                    label={formatOptionLabel(option)}
                    key={get(option, valuePath)}
                  />
                ))
              }
              noOptionsText={t('form.autocomplete.no_options')}
              disabled={disabled}
              readOnly={isView || readOnly}
              onChange={(_, value: any) => {
                const afterValue = multiple
                  ? value.map((v: any) => get(v, valuePath))
                  : get(value, valuePath) ?? null
                if (onChangeValue) {
                  returnValueType === 'enum'
                    ? onChangeValue(afterValue)
                    : onChangeValue(value)
                }
                returnValueType === 'enum'
                  ? onChange(afterValue)
                  : onChange(value)

                if (onAfterChangeValue) onAfterChangeValue()
              }}
              onBlur={onBlur}
              value={getValueOption(value) ?? (multiple ? [] : null)}
              renderOption={(props, option: any) => {
                return (
                  <li {...props} key={get(option, valuePath)}>
                    <Typography variant='body1' title={get(option, labelPath)}>
                      {formatOptionLabel(option)}
                    </Typography>
                  </li>
                )
              }}
              renderInput={(params) => (
                <>
                  <TextField
                    {...params}
                    variant={variant}
                    placeholder={getPlaceholder(
                      t,
                      'autocomplete',
                      placeholder,
                      label,
                      isView,
                      value,
                      multiple
                    )}
                    inputRef={ref}
                    label={label}
                    error={!!(error || errCustom)}
                    helperText={error && isHasMessageError && error.message}
                    InputLabelProps={{
                      ...params.InputLabelProps,
                      shrink: true,
                      required,
                      ...InputLabelProps,
                    }}
                    inputProps={{
                      ...params.inputProps,
                      ...inputProps,
                    }}
                    // eslint-disable-next-line react/jsx-no-duplicate-props
                    InputProps={{
                      disableUnderline: isView,
                      ...params.InputProps,
                      endAdornment: (
                        <>
                          {loading ? (
                            <CircularProgress color='inherit' size={20} />
                          ) : null}
                          {params.InputProps.endAdornment}
                        </>
                      ),

                      ...InputProps,
                    }}
                  />
                  {helperText && <FormHelperText>{helperText}</FormHelperText>}
                </>
              )}
              {...restProps}
            />
          )
        }}
        rules={!isView ? rules : {}}
      />
    </div>
  )
}

export default React.memo(CoreAutocomplete)
