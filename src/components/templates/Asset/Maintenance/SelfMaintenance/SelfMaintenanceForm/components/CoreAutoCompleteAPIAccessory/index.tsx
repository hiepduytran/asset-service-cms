import { GRAY_SCALE, GREY } from '@/helper/colors'
import { PAGE_SIZE } from '@/helper/contain'
import { toastError } from '@/toast'
import { PageResponse } from '@/service/type'
import CloseIcon from '@mui/icons-material/Close'
import {
  Autocomplete,
  AutocompleteProps,
  Chip,
  CircularProgress,
  FilterOptionsState,
  FormHelperText,
  TextField,
  Typography,
} from '@mui/material'
import { useDebounce } from '@uidotdev/usehooks'
import { get } from 'lodash'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import React, { ReactNode, useCallback, useEffect, useState } from 'react'
import { Controller } from 'react-hook-form'

export interface FormControlAutoCompleteProps<
  T,
  Multiple extends boolean | undefined = undefined,
  DisableClearable extends boolean | undefined = undefined,
  FreeSolo extends boolean | undefined = undefined
> extends Omit<
  AutocompleteProps<T, Multiple, DisableClearable, FreeSolo>,
  'renderInput' | 'options'
> {
  control: any
  name: string
  label: ReactNode
  placeholder: string
  rules?: any
  disabled?: boolean
  readOnly?: boolean
  labelPath?: string
  valuePath?: string
  isHasMessageError?: boolean
  helperText?: string
  required?: boolean
  params?: any
  variant?: 'outlined' | 'filled' | 'standard'
  isViewProp?: boolean
  exceptValues?: any[]
  hasAllOption?: boolean
  fetchDataFn: (val: any) => Promise<PageResponse<any>>
  onChangeValue?: (val: any) => void
  onAfterChangeValue?: () => void
}

const CoreAutoCompleteAPIAccessory: <
  T,
  Multiple extends boolean | undefined = undefined,
  DisableClearable extends boolean | undefined = undefined,
  FreeSolo extends boolean | undefined = undefined
>(
  prop: FormControlAutoCompleteProps<T, Multiple, DisableClearable, FreeSolo>
) => React.ReactElement<
  FormControlAutoCompleteProps<T, Multiple, DisableClearable, FreeSolo>
> = (props) => {
  const { t } = useTranslation()

  const {
    control,
    name,
    multiple,
    placeholder,
    rules,
    label,
    disabled,
    readOnly,
    labelPath = 'name',
    valuePath = 'id',
    isHasMessageError = true,
    helperText,
    required,
    params,
    variant = 'standard',
    isViewProp,
    exceptValues,
    fetchDataFn,
    onChangeValue,
    hasAllOption,
    onAfterChangeValue,
    ...restProps
  } = props

  const router = useRouter()
  const { actionType } = router.query

  const isView = isViewProp ?? actionType === 'VIEW'

  const [page, setPage] = useState(0)
  const [isClick, setIsClick] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [totalPages, setTotalPages] = useState(0)
  const [search, setSearch] = useState('')
  const debounceSearch = useDebounce(search, 700)
  const [data, setData] = useState<any>([])
  const [dataPage0, setDataPage0] = useState<any>([])

  const convertParam = JSON.stringify(params)
  const convertExceptValues = JSON.stringify(exceptValues)

  const handleSearchData = useCallback(async () => {
    setIsLoading(true)
    const data = await fetchDataFn({
      page: 0,
      size: PAGE_SIZE,
      search: debounceSearch,
      ...(params || {}),
    })

    if (data && Array.isArray(data.data.content)) {
      const dataValue = [
        ...data.data.content.map((item: any) => ({
          ...item,
          [labelPath]: item?.product?.name,
          [valuePath]: item?.product?.id,
        })),
      ]

      setData(() =>
        exceptValues
          ? dataValue.filter((obj) => {
            return !exceptValues.some(
              (item: any) => item[valuePath] === obj[valuePath]
            )
          })
          : dataValue
      )
    }

    setIsLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceSearch, convertParam])

  const handleFetchData = useCallback(
    async (isPreApply: boolean, pageOption?: number) => {
      try {
        setIsLoading(true)
        const pageValue = pageOption ?? page

        if (pageValue !== 0 && pageValue >= totalPages) {
          setIsLoading(false)
          return
        }
        const data = await fetchDataFn({
          page: pageValue,
          size: PAGE_SIZE,
          search: debounceSearch,
          ...(params || {}),
        })

        if (data && Array.isArray(data.data.content)) {
          const dataValue = data.data.content.map((item: any) => ({
            ...item,
            [labelPath]: item?.product?.name,
            [valuePath]: item?.product?.id,
          }))

          if (pageValue === 0) {
            setDataPage0(dataValue)
          }

          setData((pre: any) => {
            const newVal = [...(isPreApply ? pre : []), ...dataValue]

            return exceptValues
              ? newVal.filter((obj) => {
                return !exceptValues.some(
                  (item: any) => item[valuePath] === obj[valuePath]
                )
              })
              : newVal
          })

          setTotalPages(data.data.totalPages)
        }

        setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
        toastError(error)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [page, totalPages, convertParam, debounceSearch]
  )

  useEffect(() => {
    try {
      if (isClick && !disabled && !readOnly) handleFetchData(false)
    } catch (error) {
      toastError(error)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isClick, convertParam, convertExceptValues])

  useEffect(() => {
    if (isClick && !disabled && !readOnly) {
      if (debounceSearch) {
        handleSearchData()
      } else {
        setPage(() => 0)
        setData(dataPage0)
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceSearch, convertParam])

  const handleScroll = async (e: any) => {
    const listBoxNode = e.currentTarget
    const currentHeight = listBoxNode.scrollTop + listBoxNode.clientHeight

    if (listBoxNode.scrollHeight - currentHeight <= 1) {
      setPage((prev) => prev + 1)
      handleFetchData(true, page + 1)
    }
  }

  const finalData =
    (!debounceSearch || debounceSearch.toLocaleLowerCase() === 'all') &&
      hasAllOption
      ? [
        {
          [valuePath]: null,
          [labelPath]: 'Tất cả',
        },
        ...data,
      ]
      : data

  return (
    <div
      onClick={() => {
        if (!readOnly && !disabled && !isView && !isClick) setIsClick(true)
      }}
    >
      <Controller
        control={control}
        name={name}
        render={({
          field: { onChange, onBlur, value, ref },
          fieldState: { error },
        }) => {
          return (
            <Autocomplete
              multiple={multiple}
              value={value ?? null}
              options={finalData?.length > 0 ? finalData : []}
              disabled={disabled}
              readOnly={readOnly || isView}
              loading={isLoading}
              noOptionsText={t('form.autocomplete.no_options')}
              onBlur={onBlur}
              onChange={(e, value: any) => {
                onChange(value)
                if (onChangeValue) onChangeValue(value)
                if (onAfterChangeValue) onAfterChangeValue()
              }}
              forcePopupIcon={!isView}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    variant='outlined'
                    style={{
                      borderRadius: 4,
                      height: 26,
                      borderColor: GRAY_SCALE,
                      color: GREY,
                    }}
                    label={get(option, labelPath)}
                    {...getTagProps({ index })}
                    deleteIcon={<CloseIcon />}
                    key={get(option, valuePath)}
                  />
                ))
              }
              isOptionEqualToValue={(option, value) => {
                if (value instanceof Object) {
                  return get(option, valuePath) === get(value, valuePath)
                }
                return get(option, valuePath) === value
              }}
              getOptionLabel={(option) => {
                return (
                  (get(option, labelPath)) ?? ''
                )
              }}
              renderOption={(props, option: any) => {
                return (
                  <li {...props}>
                    <Typography variant='body2' title={get(option, labelPath)}>
                      {get(option, labelPath)}
                    </Typography>
                  </li>
                )
              }}
              filterOptions={(options, params: FilterOptionsState<any>) => {
                setSearch(params.inputValue)
                return options
              }}
              renderInput={(params) => (
                <>
                  <TextField
                    {...params}
                    variant={isView ? 'standard' : (variant as any)}
                    inputRef={ref}
                    label={label}
                    error={!!(error || helperText)}
                    helperText={error && isHasMessageError && error.message}
                    placeholder={
                      (multiple ? !!value?.length : !!value) || isView
                        ? ''
                        : placeholder ||
                        t('form.autocomplete.placeholder', {
                          label,
                        }).toString()
                    }
                    InputLabelProps={{
                      // ...params.InputLabelProps,
                      shrink: true,
                      required: isView ? false : required,
                    }}
                    InputProps={{
                      disableUnderline: isView,
                      notched: true,
                      ...params.InputProps,
                      endAdornment: (
                        <>
                          {isLoading ? (
                            <CircularProgress color='inherit' size={20} />
                          ) : null}
                          {params.InputProps.endAdornment}
                        </>
                      ),
                    }}
                  />
                  {helperText && <FormHelperText>{helperText}</FormHelperText>}
                </>
              )}
              ListboxProps={{
                onScroll: (e) => {
                  handleScroll(e)
                },
              }}
              {...restProps}
            />
          )
        }}
        rules={!isView ? rules : {}}
      />
    </div>
  )
}

export default React.memo(CoreAutoCompleteAPIAccessory)
