import { useDialog } from '@/components/hooks/dialog/useDialog'
import { CoreDialog } from '@/components/organism/CoreDialog'
import {
  Box,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material'
import { useConfig } from './useConfig'
import CoreInput from '@/components/atoms/CoreInput'
import {
  TableContainerCommon,
  TableHeadCommon,
} from '@/components/organism/CoreTable'
import { CoreButton } from '@/components/atoms/CoreButton'
import { TableCellHeaderNoneBorder, TableCellNonePaddingY } from '..'
import React from 'react'
import CoreLoading from '@/components/molecules/CoreLoading'
import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import { getListAttributeCategory } from '@/service/product/getListAttributeCategory'
import CoreCheckbox from '@/components/atoms/CoreCheckbox'
import Image from 'next/image'

export const DialogConfig = (props: {
  productId: number
  isConfig: boolean
  refetch: any
}) => {
  const [values, handles] = useConfig(props)
  const {
    methodForm,
    isLoadingSubmit,
    isLoadingAttribute,
    isLoading,
    isLoadingDetailAttribute,
  } = values
  const { t, onSubmit, getAttribute, handleRemove } = handles
  const { hideDialog } = useDialog()
  const { control, watch, setValue } = methodForm
  const { isConfig } = props

  return (
    <CoreDialog
      onClose={hideDialog}
      width={1100}
      title={`${t('parameterConfiguration')}`}
    >
      <form>
        <Box className='p-20'>
          <Grid container spacing={{ xs: 1, sm: 2, md: 3, lg: 4 }}>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <CoreInput
                control={control}
                name='sku'
                label={t('table.assetCode')}
                isViewProp
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <CoreInput
                control={control}
                name='name'
                label={t('table.assetName')}
                isViewProp
              />
            </Grid>
            {!isConfig && (
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <CoreAutoCompleteAPI
                  control={control}
                  name='parameter'
                  label={t('label.parameter')}
                  placeholder={t('placeholder.searchParameter')}
                  fetchDataFn={getListAttributeCategory}
                  onChangeValue={(value) => {
                    if (value) {
                      getAttribute(value.id)
                      setValue('parameter', '')
                    }
                  }}
                />
              </Grid>
            )}
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Typography
                style={{
                  fontSize: '14px',
                  fontWeight: 700,
                }}
              >
                {t('detailedParameter')}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <TableContainerCommon layout='Layout1'>
                <Table>
                  <TableHeadCommon layout='Layout1'>
                    <TableRow>
                      <TableCellHeaderNoneBorder>
                        {t('table.parameterName')}
                      </TableCellHeaderNoneBorder>
                      <TableCellHeaderNoneBorder>
                        {t('table.value')}
                      </TableCellHeaderNoneBorder>
                      <TableCellHeaderNoneBorder>
                        {t('table.parameterType')}
                      </TableCellHeaderNoneBorder>
                    </TableRow>
                  </TableHeadCommon>
                  <TableBody>
                    {isLoadingAttribute ||
                    isLoading ||
                    isLoadingDetailAttribute ? (
                      <TableRow>
                        <TableCell colSpan={3} variant='body'>
                          <div className='flex justify-center min-h-[60px]'>
                            <CoreLoading />
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : (
                      (watch('informationData') ?? []).map(
                        (item: any, index: number) => (
                          <React.Fragment key={'key' + index}>
                            <TableRow>
                              <TableCellHeaderNoneBorder colSpan={3}>
                                {item?.attributeCategory?.name}
                              </TableCellHeaderNoneBorder>
                            </TableRow>
                            {item?.attributes.map(
                              (item1: any, index1: number) => (
                                <TableRow key={item1.key}>
                                  <TableCellNonePaddingY>
                                    {item1?.attribute?.name}
                                  </TableCellNonePaddingY>
                                  <TableCellNonePaddingY>
                                    {item1?.attributeValue
                                      .map((item2: any) => item2?.name)
                                      .join(', ')}
                                  </TableCellNonePaddingY>
                                  <TableCellNonePaddingY>
                                    <Box className='flex items-center gap-8'>
                                      <CoreCheckbox
                                        control={control}
                                        name={`informationData.${index}.attributes.${index1}.isParameter`}
                                        label={t('label.mainParameter')}
                                        isViewProp={isConfig}
                                      />
                                      {!isConfig && (
                                        <IconButton
                                          onClick={() => {
                                            handleRemove(index, index1)
                                          }}
                                        >
                                          <Image
                                            src={require('@/assets/svg/action/delete.svg')}
                                            alt='delete'
                                            width={16}
                                            height={16}
                                          />
                                        </IconButton>
                                      )}
                                    </Box>
                                  </TableCellNonePaddingY>
                                </TableRow>
                              )
                            )}
                          </React.Fragment>
                        )
                      )
                    )}
                  </TableBody>
                </Table>
              </TableContainerCommon>
            </Grid>
          </Grid>
          {!isConfig && (
            <div className='flex justify-center gap-10 pt-20'>
              <CoreButton
                theme='cancel'
                onClick={() => {
                  hideDialog()
                }}
              >
                {t('common:btn.cancel')}
              </CoreButton>
              <CoreButton
                theme='submit'
                onClick={onSubmit}
                loading={isLoadingSubmit}
              >
                {t('common:btn.confirm')}
              </CoreButton>
            </div>
          )}
        </Box>
      </form>
    </CoreDialog>
  )
}
