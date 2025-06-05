import {
  FormControlLabel,
  Radio,
  RadioGroup,
  RadioGroupProps,
  styled,
} from '@mui/material'
import { forwardRef, ReactNode } from 'react'
import { Controller } from 'react-hook-form'

type Option = {
  value: string | number | boolean
  label: ReactNode
}

type CoreRadioGroupProps = {
  name: string
  control: any
  options: Option[]
  defaultValue?: string | number
  disabled?: boolean
  readOnly?: boolean
  onChangeValue?: (value: string | number | boolean, option: Option) => void
} & RadioGroupProps

const RadioGroupCommon = styled(RadioGroup)(() => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '30px',
  justifyContent: 'center',
  cursor: 'pointer',
}))

const CoreRadioGroup = forwardRef<HTMLDivElement, CoreRadioGroupProps>(
  function RadioCustom({
    control,
    name,
    value,
    options,
    defaultValue,
    disabled = false,
    readOnly = false,
    onChangeValue,
    ...props
  }) {
    return (
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value, ...restField } }) => (
          <RadioGroupCommon {...props} {...restField}>
            {options.map((option) => (
              <FormControlLabel
                key={option.value.toString()}
                label={option.label}
                value={option.value}
                checked={value === option.value}
                control={
                  <Radio
                    inputProps={{
                      disabled: disabled || readOnly,
                      readOnly,
                    }}
                  />
                }
                onChange={(event) => {
                  onChange(event)
                  if (onChangeValue) onChangeValue(option?.value, option)
                }}
              />
            ))}
          </RadioGroupCommon>
        )}
      />
    )
  }
)

export default CoreRadioGroup
