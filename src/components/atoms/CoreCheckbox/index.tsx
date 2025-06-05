import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormControlLabelProps,
  FormHelperText,
} from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'
import { Controller } from 'react-hook-form'

const CoreCheckbox = (
  props: Omit<FormControlLabelProps, 'disabled' | 'readOnly' | 'control'> & {
    name: string
    control: any
    disabled?: boolean
    readOnly?: boolean
    isViewProp?: boolean
    onChangeValue?: any
    onAfterChange?: any
    styles?: any
    required?: boolean
    rules?: any
    helperText?: string
    isShowHelperText?: boolean
  }
) => {
  const {
    className,
    label,
    control,
    name,
    disabled,
    readOnly,
    isViewProp,
    onAfterChange,
    onChangeValue,
    styles,
    required,
    rules,
    helperText,
    isShowHelperText,
    ...rest
  } = props

  const router = useRouter()
  const { actionType } = router.query
  const isView = isViewProp ?? actionType === 'VIEW'

  return (
    <div className={className}>
      <Controller
        name={name}
        control={control}
        rules={isShowHelperText ? rules : {}}
        render={({
          field: { value, onChange, ...field },
          fieldState: { error },
        }) => (
          <FormControl error={!!error}>
            <FormControlLabel
              {...field}
              checked={value ?? false}
              label={label}
              control={
                <Checkbox
                  size='small'
                  checked={value ?? false}
                  readOnly={isView || disabled}
                  inputProps={{
                    disabled: isView || disabled,
                    readOnly: isView || readOnly,
                  }}
                  onChange={(e, checked) => {
                    onChange(e)
                    if (onChangeValue) onChangeValue(checked)
                    if (onAfterChange) onAfterChange()
                  }}
                />
              }
              sx={styles}
              {...rest}
            />
            {isShowHelperText && error && (
              <FormHelperText>{helperText || error.message}</FormHelperText>
            )}
          </FormControl>
        )}
      />
    </div>
  )
}

export default React.memo(CoreCheckbox)
