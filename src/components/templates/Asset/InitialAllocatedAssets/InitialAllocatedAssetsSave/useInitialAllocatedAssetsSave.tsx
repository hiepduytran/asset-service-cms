import { toastError, toastSuccess } from '@/toast'
import { useFormCustom } from '@/lib/form'
import { MENU_URL, TRANSLATE } from '@/routes'
import { useRouter } from 'next/router'
import { useEffect, useMemo } from 'react'
import { useFieldArray } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useMutation } from 'react-query'
import CoreInput from '@/components/atoms/CoreInput'
import { Box, IconButton, InputAdornment, Typography } from '@mui/material'
import Image from 'next/image'
import { ColumnProps } from '@/components/organism/CoreTable'
import { InitialAllocatedAssetsSave } from '@/service/asset/initialAllocatedAssets/save/type'
import { SelectBoxCustom } from '@/components/atoms/SelectBoxCustom'
import { getListAsset } from '@/service/product/getListAsset'
import NotePencil from '@/assets/svg/NotePencil.svg'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import { DialogDeclareIdentifierCode } from './DialogDeclareIdentifierCode'
import { useAppSelector } from '@/redux/hook'
import { postInitialAllocatedAssets } from '@/service/asset/initialAllocatedAssets/save'
import { useQueryInitialAllocatedAssets } from '@/service/asset/initialAllocatedAssets/save/getDetail'
import { GREEN } from '@/helper/colors'

const defaultValues = {
  code: '',
  updateDate: '',
  requestDate: '',
  allocationChooseType: 'ORGANIZATION',
  organization: null,
  department: null,
  employee: null,
  assetAllocationLine: [
    {
      product: null,
      quantity: 0,
      uom: null,
      requestQuantity: 0,
      allocationLineMap: [],
    },
  ],
}

export const useInitialAllocatedAssetsSave = () => {
  const { t } = useTranslation(TRANSLATE.INITIAL_ALLOCATED_ASSETS)
  const methodForm = useFormCustom<InitialAllocatedAssetsSave>({
    defaultValues,
  })
  const { showDialog } = useDialog()
  const router = useRouter()
  const { actionType } = router.query
  const id = Number(router.query?.id)
  const isView = actionType === 'VIEW'
  const { id: orgId, name: orgName } = useAppSelector((state) => state.orgData)

  const { handleSubmit, reset, setValue, control, watch, trigger } = methodForm

  useEffect(() => {
    if (orgId && !isView) {
      setValue('organization', {
        id: orgId,
        name: orgName,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const { fields, remove, append } = useFieldArray({
    control: control,
    name: `assetAllocationLine`,
    keyName: 'key',
  })

  const columns = useMemo(
    () => [
      {
        header: t('table.assetCode'),
        fieldName: 'assetCode',
      },
      {
        header: t('table.assetName'),
        fieldName: 'assetName',
      },
      {
        header: t('table.allocateQuantity'),
        fieldName: 'allocateQuantity',
      },
      {
        header: '',
        fieldName: 'addIdentifier',
      },
      {
        header: '',
        fieldName: 'deleteRow',
      },
    ],
    [t]
  ) as ColumnProps[]
  const productColumns = useMemo(
    () =>
      [
        {
          header: t('table.assetCode'),
          fieldName: 'sku',
        },
        {
          header: t('table.assetName'),
          fieldName: 'name',
        },
      ] as ColumnProps[],
    [t]
  )

  const dataTable = fields.map((item, index) => {
    return {
      key: item.key,
      assetCode: (
        <SelectBoxCustom
          columns={productColumns}
          control={control}
          name={`assetAllocationLine.${index}.product`}
          label=''
          placeholder={`${t('placeholder.assetCode')}`}
          fetchDataFn={getListAsset}
          params={{
            type: 'ASSET',
          }}
          labelPath='sku'
          valuePath='id'
          onChangeValue={(value) => {
            if (!!value) {
              setValue(`assetAllocationLine.${index}.sku`, value?.sku)
              setValue(`assetAllocationLine.${index}.assetName`, value?.name)
              setValue(`assetAllocationLine.${index}.uom`, {
                id: value?.uomId,
                name: value?.uomName,
              })
            } else {
              setValue(`assetAllocationLine.${index}.sku`, '')
              setValue(`assetAllocationLine.${index}.assetName`, '')
              setValue(`assetAllocationLine.${index}.uom`, null)
            }
            setValue(`assetAllocationLine.${index}.requestQuantity`, 0)
          }}
          trigger={trigger}
        />
      ),
      assetName: (
        <CoreInput
          control={control}
          name={`assetAllocationLine.${index}.assetName`}
          label=''
          isViewProp
        />
      ),
      allocateQuantity: (
        <CoreInput
          control={control}
          name={`assetAllocationLine.${index}.requestQuantity`}
          label=''
          placeholder={t('placeholder.allocateQuantity')}
          type='number'
          disableDecimal
          disableNegative
          disableZero
          className={isView ? 'w-30' : 'w-60'}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <Typography className='text-[#242424]'>
                  {watch(`assetAllocationLine.${index}.uom`)?.name}
                </Typography>
              </InputAdornment>
            ),
          }}
        />
      ),
      addIdentifier: (
        <>
          {!watch(`assetAllocationLine.${index}.quantity`) && !isView ? (
            <Box
              className='flex items-center gap-2'
              onClick={() => {
                watch(`assetAllocationLine.${index}.requestQuantity`) > 0 &&
                  showDialog(
                    <DialogDeclareIdentifierCode
                      control={control}
                      setValue={setValue}
                      watch={watch}
                      handleSubmit={handleSubmit}
                      index={index}
                      requestQuantity={watch(
                        `assetAllocationLine.${index}.requestQuantity`
                      )}
                      productId={
                        watch(`assetAllocationLine.${index}.product`)?.id
                      }
                      isView={isView}
                      categoryId={watch(`assetAllocationLine.${index}.product.category`)?.id}
                    />
                  )
              }}
            >
              <Image
                src={require('@/assets/svg/action/add.svg')}
                alt='plus'
                width={16}
                height={16}
              />
              <Typography
                sx={{ color: GREEN, cursor: 'pointer', marginY: '5px' }}
              >
                {`${t('addIdentifier')}`}
              </Typography>
            </Box>
          ) : (
            <Box className='flex items-center'>
              <Typography sx={{ marginY: '5px' }}>
                <CoreInput
                  control={control}
                  name={`assetAllocationLine.${index}.quantity`}
                  isViewProp
                  className='w-60 hidden'
                />
              </Typography>
              <Image
                alt=''
                src={NotePencil}
                height={20}
                width={20}
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  showDialog(
                    <DialogDeclareIdentifierCode
                      control={control}
                      setValue={setValue}
                      watch={watch}
                      handleSubmit={handleSubmit}
                      index={index}
                      requestQuantity={watch(
                        `assetAllocationLine.${index}.requestQuantity`
                      )}
                      productId={
                        watch(`assetAllocationLine.${index}.product`)?.id
                      }
                      isView={isView}
                      categoryId={watch(`assetAllocationLine.${index}.product.category`)?.id}
                    />
                  )
                }}
              />
            </Box>
          )}
        </>
      ),
      deleteRow: !isView ? (
        <IconButton
          onClick={() => {
            remove(index)
          }}
        >
          <Image
            src={require('@/assets/svg/action/delete.svg')}
            alt='delete'
            width={16}
            height={16}
          />
        </IconButton>
      ) : null,
    }
  })

  const { mutate, isLoading: isLoadingSubmit } = useMutation(
    postInitialAllocatedAssets,
    {
      onSuccess: (res) => {
        toastSuccess(t('common:message.success'))
        router.push({
          pathname: `${MENU_URL.INITIAL_ALLOCATED_ASSETS}/[id]`,
          query: {
            id: id ? id : res.data?.data.id,
            actionType: 'VIEW',
          },
        })
        refetch()
      },
      onError: (error) => {
        toastError(error)
      },
    }
  )

  const { data, isLoading, refetch } = useQueryInitialAllocatedAssets(
    {
      id: id,
    },
    { enabled: !!id }
  )

  useEffect(() => {
    if (id && data?.data) {
      reset({
        ...data?.data,
        assetAllocationLine: data?.data?.assetAllocationLine.map((item) => {
          return {
            ...item,
            product: {
              ...item?.product,
              sku: item?.product?.code,
            },
            sku: item?.product?.code,
            assetName: item?.product?.name,
            allocationLineMap: item.allocationLineMap.map((item1) => {
              return {
                ...item1,
                asset: {
                  ...item1?.asset,
                  lotName: item1?.asset?.lot?.name,
                },
              }
            }),
          }
        }),
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, data?.data])

  const onCancel = () => {
    router.back()
  }

  const onSubmit = handleSubmit(async (data) => {
    mutate(data)
  })

  return [
    {
      methodForm,
      isView,
      isLoadingSubmit,
      isLoading,
      id,
      columns,
      dataTable,
    },
    { t, onCancel, onSubmit, append },
  ] as const
}
