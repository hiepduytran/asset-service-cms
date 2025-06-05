import { FormHelperText, styled } from '@mui/material'
import { MuiColorInput, MuiColorInputProps } from 'mui-color-input'
import { useRouter } from 'next/router'
import React from 'react'
import { Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

const MuiColorInputStyled = styled(MuiColorInput)`
  & .MuiColorInput-Button {
    min-height: 5px;
    margin-bottom: 8px;
  }
  
  &.is-view {
    position: relative;
  }
  
  &.is-view::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: transparent;
    cursor: not-allowed;
    z-index: 1;
  }
`

interface Props extends Omit<MuiColorInputProps, 'value'> {
  className?: string
  control: any
  name: string
  isViewProp?: boolean
  rules?: any
  readOnly?: boolean
}

const CoreInputColor = (props: Props) => {
  const {
    className,
    control,
    name,
    label,
    placeholder,
    InputLabelProps,
    inputProps,
    InputProps,
    required,
    helperText,
    disabled,
    rules,
    variant = 'standard',
    readOnly,
    isViewProp,
    isAlphaHidden = true,
    format = 'hex',
    ...rest
  } = props

  const { t } = useTranslation('common')

  const router = useRouter()
  const { actionType } = router.query
  const isView = isViewProp ?? actionType === 'VIEW'

  return (
    <div className={className}>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <>
            <MuiColorInputStyled
              {...field}
              className={isView ? 'is-view' : ''}
              label={label}
              placeholder={
                placeholder ??
                String(
                  t('form.input.placeholder', {
                    label: String(label)?.toLowerCase(),
                  })
                )
              }
              required={required}
              variant={variant}
              isAlphaHidden={isAlphaHidden}
              format={format}
              inputProps={{
                readOnly: isView || readOnly,
                ...inputProps,
              }}
              InputProps={{
                disableUnderline: isView,
                ...InputProps,
              }}
              error={!!fieldState.error}
              {...rest}
            />
            {helperText && <FormHelperText>{helperText}</FormHelperText>}
          </>
        )}
        rules={!isView ? rules : {}}
      />
    </div>
  )
}

export default React.memo(CoreInputColor)
