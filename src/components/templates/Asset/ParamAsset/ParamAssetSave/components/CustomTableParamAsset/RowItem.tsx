import {
  AssetCategory,
  TrackAssetLine,
} from '@/service/asset/paramAsset/save/type'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { RequestBody } from '@/service/asset/paramAsset/save/type'
import { Fragment, useCallback, useEffect, useState } from 'react'
import { IconButton, TableCell, TableRow, Typography } from '@mui/material'
import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import { getListUnit } from '@/service/product/getListUnit'
import CoreInput from '@/components/atoms/CoreInput'
import Image from 'next/image'
import DialogLevel from '../DialogLevel'
import { BLUE } from '@/helper/colors'
import GroupIcon from '@/assets/svg/Group.svg'
import NotePencil from '@/assets/svg/NotePencil.svg'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import { TRANSLATE } from '@/routes'
import { isEqual } from 'lodash';

export const defaultImpact = [
  {
    startValue: 0,
    endValue: 0,
    content: '',
    color: '',
    actionRegulation: null,
  },
]

export const RowItem = ({
  item,
  item2,
  index,
  index2,
  dataLength,
}: {
  item: TrackAssetLine
  item2: AssetCategory
  index: number
  index2: number
  dataLength: number
}) => {
  const router = useRouter()
  const { actionType } = router.query
  const isView = actionType === 'VIEW'

  const { t } = useTranslation(TRANSLATE.PARAM_ASSET)
  const { control, watch, setValue, trigger } = useFormContext<RequestBody['POST']>()

  const {
    fields: attributesFields,
    remove,
    append,
  } = useFieldArray({
    control,
    name: `trackAssetLine.${index}.assetCategory.${index2}.attributes`,
    keyName: 'key',
  })
  const watchedAttributes = watch(`trackAssetLine.${index}.assetCategory.${index2}.attributes`);

  useEffect(() => {
    if (attributesFields.length !== watchedAttributes?.length) {
      setValue(`trackAssetLine.${index}.assetCategory.${index2}.attributes`, watchedAttributes);
    }
  }, [watchedAttributes, attributesFields.length, setValue, index, index2]);
  const [open, setOpen] = useState(false)
  const [attribute, setAttribute] =
    useState<{
      indexAtt: number
      attributeName: string
      maximum: number
      minimum: number
      uom: string
    }>()

  const handleClickOpen = (
    index: number,
    minimum: number,
    maximum: number,
    uom: any,
    attributeName: string
  ) => {
    setOpen(true)
    setAttribute({
      indexAtt: index,
      minimum: minimum,
      maximum: maximum,
      uom: uom,
      attributeName: attributeName,
    })
  }

  const handleIsParameter = (index: boolean) => {
    if (index === true) {
      return <Typography>Chính</Typography>
    } else if (index === false) {
      return <Typography>Phụ</Typography>
    } else {
      return null
    }
  }

  const [deletedAttributes, setDeletedAttributes] = useState<any[]>([]);

  const handleRemove = (index: number) => {
    const removedField = attributesFields[index];
    setDeletedAttributes((prev) => [...prev, removedField]);
    remove(index);
  };

  const handleAppend = useCallback(() => {
    if (deletedAttributes.length > 0) {
      // Take the last removed item and append it
      const itemToAppend = deletedAttributes[deletedAttributes.length - 1];
      append(itemToAppend);
      // Remove the appended item from the deletedAttributes array
      setDeletedAttributes((prev) => prev.slice(0, -1));
    }
  }, [append, deletedAttributes]);

  return (
    <>
      <TableRow key={index2} sx={{ backgroundColor: '#F6F7F9' }}>
        <TableCell colSpan={8}>
          <Typography
            sx={{
              padding: '8px 0px 8px 0px',
              fontWeight: 600,
            }}
          >
            {item2?.attributeCategory?.name}
          </Typography>
        </TableCell>
      </TableRow>
      {attributesFields.map((item3: any, index3) => {
        return (
          <Fragment key={item3.key}>
            <TableRow key={item3.key}>
              <TableCell component='th' scope='row' key={item3.key}>
                {
                  watch(
                    `trackAssetLine.${index}.assetCategory.${index2}.attributes.${index3}.attribute`
                  )?.name
                }
              </TableCell>
              <TableCell>
                {
                  watch(`trackAssetLine.${index}.assetCategory.${index2}.attributes.${index3}.attributeValue`)
                    ?.map((item4: any) => item4?.name)
                    .join(", ")
                }
              </TableCell>
              <TableCell>
                {handleIsParameter(
                  watch(
                    `trackAssetLine.${index}.assetCategory.${index2}.attributes.${index3}.isParameter`
                  )
                )}
              </TableCell>
              <TableCell>
                <CoreAutoCompleteAPI
                  control={control}
                  key={index3}
                  name={`trackAssetLine.${index}.assetCategory.${index2}.attributes.${index3}.uom`}
                  placeholder={t('placeholder.uomId')}
                  label=''
                  fetchDataFn={getListUnit}
                  required
                  rules={{ required: t('common:validation.required') }}
                />
              </TableCell>
              <TableCell>
                <CoreInput
                  key={index3}
                  control={control}
                  type='number'
                  name={`trackAssetLine.${index}.assetCategory.${index2}.attributes.${index3}.minimum`}
                  placeholder={t('placeholder.enterMinimumLevel')}
                  required
                  isHasMessageError
                  rules={{
                    required: t('common:validation.required'),
                  }}
                  disableZero
                />
              </TableCell>
              <TableCell>
                <CoreInput
                  key={index3}
                  type='number'
                  control={control}
                  name={`trackAssetLine.${index}.assetCategory.${index2}.attributes.${index3}.maximum`}
                  placeholder={t('placeholder.enterMaximumLevel')}
                  required
                  rules={{
                    required: t('common:validation.required'),
                    validate: {
                      min: (val: number) => {
                        return (
                          val >
                          watch(
                            `trackAssetLine.${index}.assetCategory.${index2}.attributes.${index3}.minimum`
                          ) ||
                          `${t('text.less_than')} ${watch(
                            `trackAssetLine.${index}.assetCategory.${index2}.attributes.${index3}.minimum`
                          )}`
                        )
                      },
                    },
                  }}
                />
              </TableCell>
              <TableCell>
                <IconButton
                  className={
                    watch(
                      `trackAssetLine.${index}.assetCategory.${index2}.attributes.${index3}.minimum`
                    ) && watch(
                      `trackAssetLine.${index}.assetCategory.${index2}.attributes.${index3}.maximum`
                    ) && watch(
                      `trackAssetLine.${index}.assetCategory.${index2}.attributes.${index3}.uom`
                    ) ? 'opacity-1' : 'opacity-50'}
                  onClick={() => {
                    watch(
                      `trackAssetLine.${index}.assetCategory.${index2}.attributes.${index3}.minimum`
                    ) && watch(
                      `trackAssetLine.${index}.assetCategory.${index2}.attributes.${index3}.maximum`
                    ) && watch(
                      `trackAssetLine.${index}.assetCategory.${index2}.attributes.${index3}.uom`
                    ) &&
                      handleClickOpen(
                        index3,
                        watch(
                          `trackAssetLine.${index}.assetCategory.${index2}.attributes.${index3}.minimum`
                        ),
                        watch(
                          `trackAssetLine.${index}.assetCategory.${index2}.attributes.${index3}.maximum`
                        ),
                        watch(
                          `trackAssetLine.${index}.assetCategory.${index2}.attributes.${index3}.uom`
                        ),
                        item3.attribute?.name
                      )
                  }
                  }
                  key={index3}
                >
                  {
                    (
                      (
                        !isEqual(
                          watch(`trackAssetLine.${index}.assetCategory.${index2}.attributes.${index3}.impactMinimum`) || [],
                          defaultImpact
                        ) ||
                        !isEqual(
                          watch(`trackAssetLine.${index}.assetCategory.${index2}.attributes.${index3}.impactStandard`) || [],
                          defaultImpact
                        ) ||
                        !isEqual(
                          watch(`trackAssetLine.${index}.assetCategory.${index2}.attributes.${index3}.impactMaximum`) || [],
                          defaultImpact
                        )
                      )
                    ) ? (
                      <Image src={NotePencil} alt='' width={20} height={20} />
                    ) : (
                      <Image src={GroupIcon} alt='' width={16} height={16} />
                    )
                  }
                </IconButton>
              </TableCell>
              {!isView && (
                <TableCell>
                  <IconButton
                    onClick={() => {
                      handleRemove(index3)
                    }}
                  >
                    <Image
                      src={require('@/assets/svg/action/delete.svg')}
                      alt='delete'
                      width={16}
                      height={16}
                    />
                  </IconButton>
                </TableCell>
              )}
            </TableRow>
          </Fragment >
        )
      })}
      {
        (dataLength > 0
          ? dataLength > watch(`trackAssetLine.${index}.assetCategory.${index2}.attributes`).length
          : watch(`trackAssetLine.${index}.assetCategory.${index2}.size`) > watch(`trackAssetLine.${index}.assetCategory.${index2}.attributes`).length
        ) && (
          <TableRow>
            <TableCell colSpan={8}>
              <Typography
                className="cursor-pointer"
                sx={{ padding: '8px 0px 8px 0px', color: BLUE }}
                onClick={handleAppend}
              >
                {t('text.addParameter')}
              </Typography>
            </TableCell>
          </TableRow>
        )
      }
      {
        open && (
          <DialogLevel
            index={index}
            index2={index2}
            control={control}
            open={open}
            attribute={attribute}
            setOpen={setOpen}
            watch={watch}
            isView={isView}
            trigger={trigger}
          />
        )
      }
    </>
  )
}
