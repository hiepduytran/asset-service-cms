import { ColumnProps } from '@/components/organism/CoreTable'
import { PAGE_SIZE } from '@/helper/contain'
import { toastError } from '@/toast'
import { Response } from '@/service/product/productController/getListTiny/type'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import CloseIcon from '@mui/icons-material/Close'
import {
  ClickAwayListener,
  Fade,
  IconButton,
  InputAdornment,
  Paper,
  Popper,
  TextField,
} from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import { useDebounce } from '@uidotdev/usehooks'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useController } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { CoreTableSelect } from './CoreTableSelect'

type Props = {
  params?: any
  onChangeValue?: (val: any) => void
  fetchDataFn: (val: any) => Promise<Response['GET']> | Promise<any>
  labelPath: string
  valuePath: string
  control: any
  name: string
  className?: string
  label?: string | null
  placeholder?: string
  columns: ColumnProps[]
  isViewProp?: boolean
  variant?: 'outlined' | 'filled' | 'standard'
  disabled?: any
  trigger?: any
}

export const SelectBoxCustom = (props: Props) => {
  const {
    params,
    fetchDataFn,
    labelPath,
    valuePath,
    control,
    name,
    variant = 'standard',
    className,
    label,
    placeholder,
    columns,
    onChangeValue,
    isViewProp,
    disabled,
    trigger,
  } = props

  const { t } = useTranslation()

  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null)
  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClickAway = () => {
    setAnchorEl(null)
  }
  const openPopper = Boolean(anchorEl)
  const [page, setPage] = useState(0)
  const [isClick, setIsClick] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<any[]>([])
  const [totalPages, setTotalPages] = useState(0)
  const [search, setSearch] = useState<string | false>(false)
  const debounceSearch = useDebounce(search, 700)
  const tableEl = useRef<HTMLTableElement | null>(null);

  const router = useRouter()
  const { actionType } = router.query
  const isView = isViewProp ?? actionType === 'VIEW'

  const convertParam = JSON.stringify(params)

  const handleSearchData = useCallback(async () => {
    setIsLoading(true)
    const data = await fetchDataFn({
      page: 0,
      size: PAGE_SIZE,
      search: debounceSearch,
      ...(params || {}),
    })

    if (data && Array.isArray(data.data.content)) {
      setData(() => [
        ...data.data.content.map((item: any) => ({
          ...item,
          [labelPath]: item[labelPath],
          [valuePath]: item[valuePath],
        })),
      ])
    }

    setIsLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceSearch, fetchDataFn, JSON.stringify(params)])

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
          ...(params || {}),
        })

        if (data && Array.isArray(data.data.content)) {
          setData((pre: any) => [
            ...(isPreApply ? pre : []),
            ...data.data.content.map((item: any) => ({
              ...item,
              [labelPath]: item[labelPath],
              [valuePath]: item[valuePath],
            })),
          ])
          setTotalPages(data.data.totalPages)
        }
        setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
        toastError(error)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [fetchDataFn, page, JSON.stringify(params), totalPages]
  )

  const clearValue = () => {
    onChange()
    onChangeValue && onChangeValue(null)
    setSearch('')
  }

  const onSelectValue = (val: any) => {
    onChange(val)
    setSearch('')
    handleClickAway()
    if (trigger) trigger(name)
  }

  useEffect(() => {
    if (isClick && !isView && !disabled) handleFetchData(false).catch(() => { })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isClick, convertParam])

  const dataTable = useMemo(() => {
    return data.map((item: any) => {
      return {
        ...item,
      }
    })
  }, [data])

  useEffect(() => {
    if (isClick) {
      if (debounceSearch) {
        handleSearchData()
      } else {
        setPage(() => 0)
        handleFetchData(false, 0)
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceSearch, JSON.stringify(params)])

  const handleScroll = useCallback(
    async (e: any) => {
      const listBoxNode = e.currentTarget
      const currentHeight = listBoxNode.scrollTop + listBoxNode.clientHeight
      if (listBoxNode.scrollHeight - currentHeight <= 1) {
        setPage((prev) => prev + 1)
        handleFetchData(true, page + 1)
      }
    },
    [page, handleFetchData]
  )

  const setTableRef = useCallback(
    (node: HTMLTableElement | null) => {
      if (node) {
        tableEl.current = node;
        if (openPopper) {
          node.addEventListener('scroll', handleScroll);
        }
      } else if (tableEl.current) {
        tableEl.current.removeEventListener('scroll', handleScroll);
      }
    },
    [handleScroll, openPopper]
  );

  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error },
  } = useController({
    control,
    name,
    rules: {
      required: `${t('validation.required')}`,
    },
  })

  return (
    <div
      onClick={() => {
        setIsClick(true)
      }}
      className={className}
    >
      <Popper
        sx={{ zIndex: 1200 }}
        open={openPopper}
        anchorEl={anchorEl}
        placement={'bottom-start'}
        transition
        className='max-w-[1080px]'
      >
        {({ TransitionProps }) => (
          <ClickAwayListener onClickAway={handleClickAway}>
            <Fade {...TransitionProps} timeout={100}>
              <Paper>
                <CoreTableSelect
                  refTableContainer={setTableRef}
                  maxHeight={200}
                  columns={columns}
                  data={dataTable}
                  paginationHidden
                  onReturnValueRow={(val) => {
                    if (onChangeValue) {
                      onChangeValue(val)
                    }
                    onSelectValue(val)
                  }}
                  stickyHeader={true}
                />
              </Paper>
            </Fade>
          </ClickAwayListener>
        )}
      </Popper>
      <TextField
        value={!!search ? search : !!value ? value[labelPath] : ''}
        onClick={(e) => {
          if (!isView && !disabled) {
            handleClick(e)
          }
        }}
        onChange={(e) => {
          setSearch(e.target.value)
        }}
        onBlur={(e) => {
          onBlur()
        }}
        required
        variant={isView ? 'standard' : variant}
        ref={ref}
        fullWidth
        label={label}
        placeholder={placeholder}
        disabled={disabled}
        error={!!error && !search}
        helperText={error && !search ? error.message : ''}
        InputProps={{
          disableUnderline: isView,
          endAdornment: !isView ? (
            <InputAdornment position='end'>
              {isLoading ? (
                <CircularProgress size={16} />
              ) : !!value ? (
                <IconButton onClick={clearValue}>
                  <CloseIcon fontSize='small' />
                </IconButton>
              ) : null}
              <IconButton>
                <ArrowDropDownIcon />
              </IconButton>
            </InputAdornment>
          ) : null,
          inputProps: {
            required: false,
          },
        }}
      />
    </div>
  )
}
