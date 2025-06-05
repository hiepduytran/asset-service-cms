import { PAGE_SIZE } from '@/helper/contain'
import { toastError } from '@/toast'
import { PageResponse } from '@/service/type'
import {
    Autocomplete,
    AutocompleteProps,
    Box,
    Checkbox,
    CircularProgress,
    FilterOptionsState,
    FormHelperText,
    TextField,
    Typography,
} from '@mui/material'
import { useDebounce } from '@uidotdev/usehooks'
import { get, join } from 'lodash'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useState } from 'react'
import { Controller } from 'react-hook-form'
import check from '@/assets/svg/check.svg'
import { CoreAutoChip } from '@/components/atoms/CoreAutoChip'
import { getPlaceholder } from '@/helper/getPlaceholder'

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
    label?: any
    placeholder: string
    rules?: any
    disabled?: boolean
    readOnly?: boolean
    labelPath?: string
    valuePath?: string
    labelPathDisplay?: string[]
    isHasMessageError?: boolean
    helperText?: string
    inputProps?: any
    required?: boolean
    params?: any
    variant?: 'outlined' | 'filled' | 'standard'
    isViewProp?: boolean
    exceptValues?: any[]
    hasAllOption?: boolean
    fetchDataFn: (val: any) => Promise<PageResponse<any>>
    onChangeValue?: (val: any) => void
    onAfterChangeValue?: () => void
    searchLabel?: string
    isCheckboxOption?: boolean
    isIconCheck?: boolean
}

const AutoCompleteAPICustom: <
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
        valuePath = 'id',
        labelPath = 'name',
        labelPathDisplay = [labelPath],
        isHasMessageError = true,
        helperText,
        inputProps,
        required,
        params,
        variant = 'standard',
        isViewProp,
        exceptValues,
        fetchDataFn,
        onChangeValue,
        hasAllOption,
        onAfterChangeValue,
        searchLabel = 'search',
        isCheckboxOption,
        isIconCheck,
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

    const filterOptions = useCallback(
        (options: any[]) =>
            exceptValues
                ? options.filter((obj) =>
                    exceptValues.every(
                        (item: any) => item[valuePath] !== obj[valuePath]
                    )
                )
                : options,
        [exceptValues, valuePath]
    )

    const handleSearchData = useCallback(async () => {
        setIsLoading(true)
        const data = await fetchDataFn({
            page: 0,
            size: PAGE_SIZE,
            [searchLabel]: debounceSearch,
            ...(params || {}),
        })

        if (data && Array.isArray(data.data.content)) {
            const dataValue = [
                ...data.data.content.map((item: any) => ({
                    ...item,
                    [valuePath]: item?.product?.id,
                    [labelPath]: item?.product?.name,
                })),
            ]

            setData(filterOptions(dataValue))
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
                    [searchLabel]: debounceSearch,
                    ...(params || {}),
                })

                if (data && Array.isArray(data.data.content)) {
                    const dataValue = data.data.content.map((item: any) => ({
                        ...item,
                        [valuePath]: item?.product?.id,
                        [labelPath]: item?.product?.name,
                    }))

                    if (pageValue === 0) {
                        setDataPage0(dataValue)
                    }

                    setData((prev: any) =>
                        filterOptions([...(!isPreApply ? [] : prev), ...dataValue])
                    )

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
        if (isClick && !disabled && !readOnly)
            handleFetchData(false).catch((e) => console.log(e))

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isClick, convertParam, convertExceptValues])

    useEffect(() => {
        if (isClick && !disabled && !readOnly) {
            if (debounceSearch) {
                handleSearchData().catch((e) => console.log(e))
            } else {
                setPage(() => 0)
                setData(dataPage0)
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debounceSearch, convertParam])

    const handleScroll = (e: any) => {
        const listBoxNode = e.currentTarget
        const currentHeight = listBoxNode.scrollTop + listBoxNode.clientHeight

        if (listBoxNode.scrollHeight - currentHeight <= 1) {
            setPage((prev) => prev + 1)
            handleFetchData(true, page + 1).catch(() => { })
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

    const formatOptionLabel = (option: any) => {
        if (labelPathDisplay?.length > 1) {
            return join(
                labelPathDisplay.map((key) => get(option?.product, key)),
                ' - '
            )
        } else {
            return join(
                labelPathDisplay.map((key) => get(option, key)),
                ' - '
            )
        }
    }

    return (
        <Box
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
                            value={value || (multiple ? [] : null)}
                            options={finalData?.length > 0 ? finalData : []}
                            disabled={disabled}
                            disableCloseOnSelect={multiple}
                            readOnly={readOnly || isView}
                            loading={isLoading}
                            noOptionsText={t('form.autocomplete.no_options')}
                            onBlur={onBlur}
                            onChange={(_, value: any) => {
                                onChange(value)
                                if (onChangeValue) onChangeValue(value)
                                if (onAfterChangeValue) onAfterChangeValue()
                            }}
                            forcePopupIcon={!isView}
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
                            isOptionEqualToValue={(option, value) => {
                                if (value instanceof Object) {
                                    return get(option, valuePath) === get(value, valuePath)
                                }
                                return get(option, valuePath) === value
                            }}
                            getOptionLabel={(option) => formatOptionLabel(option)}
                            renderOption={(props, option: any) => {
                                if (isCheckboxOption) {
                                    return (
                                        <li {...props} key={option[valuePath]}>
                                            <Checkbox
                                                size='small'
                                                sx={{ padding: 0, marginRight: '10px' }}
                                                checked={!!props['aria-selected']}
                                            />
                                            <Typography
                                                variant='body2'
                                                title={get(option, labelPath)}
                                                className='py-1 truncate ...'
                                            >
                                                {formatOptionLabel(option)}
                                            </Typography>
                                        </li>
                                    )
                                }
                                if (isIconCheck) {
                                    return (
                                        <li
                                            style={{
                                                paddingLeft: '4px',
                                            }}
                                            {...props}
                                            key={option[valuePath]}
                                        >
                                            {props['aria-selected'] ? (
                                                <Image
                                                    style={{
                                                        marginRight: 2,
                                                    }}
                                                    src={check}
                                                    alt=''
                                                />
                                            ) : (
                                                <Image src={''} alt='' width={16} height={16} />
                                            )}
                                            <Typography
                                                variant='body2'
                                                title={get(option, labelPath)}
                                                className='py-1 truncate ...'
                                            >
                                                {formatOptionLabel(option)}
                                            </Typography>
                                        </li>
                                    )
                                }
                                return (
                                    <li {...props} key={get(option, valuePath)}>
                                        <Typography variant='body1' title={get(option, labelPath)}>
                                            {formatOptionLabel(option)}
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
                                        inputProps={{
                                            ...params.inputProps,
                                            ...inputProps,
                                        }}
                                        placeholder={getPlaceholder(
                                            t,
                                            'autocomplete',
                                            placeholder,
                                            label,
                                            isView,
                                            value,
                                            multiple
                                        )}
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
                            ListboxProps={{ onScroll: handleScroll }}
                            {...restProps}
                        />
                    )
                }}
                rules={!isView ? rules : {}}
            />
        </Box>
    )
}

export default React.memo(AutoCompleteAPICustom)
