import { CoreButton } from '@/components/atoms/CoreButton'
import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import CoreInput from '@/components/atoms/CoreInput'
import PageContainer from '@/components/organism/PageContainer'
import { GREEN, ORANGE, WHITE } from '@/helper/colors'
import {
  FormControl,
  Grid,
  IconButton,
  MenuItem,
  Select,
  styled,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material'
import React from 'react'
import { useAssetDeclarationCategoryList } from './useAssetDeclarationCategoryList'
import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import {
  CoreTable,
  TableContainerCommon,
  TableHeadCommon,
} from '@/components/organism/CoreTable'
import CoreTablePagination from '@/components/organism/CoreTablePagination'
import CoreLoading from '@/components/molecules/CoreLoading'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import { DialogConfig } from './DialogConfig'
import EmptyIcon from '@/components/icons/EmptyIcon'
import { MENU_URL } from '@/routes'
import Image from 'next/image'
import { DialogDeclareIdentifierCode } from './DialogDeclareIdentifierCode'
import { DialogUpdateIdentifiedAssetInfo } from './DialogUpdateIdentifiedAssetInfo'

export const TableCellHeader = styled(TableCell)(() => ({
  border: '1px solid #DFE0EB',
  fontWeight: '700',
}))
export const TableCellHeaderNoneBorder = styled(TableCell)(() => ({
  fontWeight: '700',
}))
export const TableCellHeaderCenter = styled(TableCell)(() => ({
  border: '1px solid #DFE0EB',
  fontWeight: '700',
  textAlign: 'center',
}))
export const TableCellBorderRight = styled(TableCell)(() => ({
  borderRight: '1px solid #DFE0EB',
}))
export const TableCellNonePaddingY = styled(TableCell)(() => ({
  paddingTop: 0,
  paddingBottom: 0,
}))

export default function AssetDeclarationCategoryList() {
  const [values, handles] = useAssetDeclarationCategoryList()
  const { showDialog } = useDialog()
  const {
    methodForm,
    isLoadingTable,
    dataTable,
    columns,
    isLoadingTableIdentifierCode,
    tableDataIdentifierCode,
    dataIdentifierCode,
    router,
    viewType,
  } = values
  const { control } = methodForm
  const { t, onReset, onSubmit, onChangePageSize, refetch } = handles
  return (
    <PageContainer
      title={
        <CoreBreadcrumbs
          breadcrumbs={[
            {
              title: t('title'),
            },
          ]}
        />
      }
    >
      <div className='flex flex-col'>
        <form
          onSubmit={onSubmit}
          className='flex flex-col p-5'
          style={{
            backgroundColor: WHITE,
            borderRadius: 20,
          }}
        >
          <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <CoreInput
                control={control}
                name='search'
                label={t('common:form.search.label')}
                placeholder={t('common:form.search.placeholder')}
                inputProps={{
                  maxLength: 50,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <CoreAutocomplete
                control={control}
                name='categoryId'
                label={t('table.assetCategory')}
                options={[{ value: null, label: t('common:all') }]}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <CoreAutocomplete
                control={control}
                name='isConfig'
                label={t('table.configurationParameters')}
                options={[
                  { value: null, label: t('common:all') },
                  { value: true, label: t('table.configured') },
                  { value: false, label: t('table.notConfigured') },
                ]}
              />
            </Grid>
          </Grid>
          <div className='flex justify-center mt-10 gap-10'>
            <CoreButton onClick={onReset} theme='reset'>
              Reset
            </CoreButton>
            <CoreButton theme='submit' type='submit'>
              {t('common:btn.search')}
            </CoreButton>
          </div>
        </form>
        <div className='flex justify-end items-center gap-10'>
          <div className='flex justify-end items-center gap-2'>
            <Typography>Chiều:</Typography>
            <FormControl variant='standard'>
              <Select
                value={viewType}
                disableUnderline
                sx={{ color: '#0078D4' }}
              >
                <MenuItem
                  value='ASSET_CODE'
                  onClick={() => {
                    router.push({
                      pathname: MENU_URL.ASSET_DECLARATION_CATEGORY_LIST,
                    })
                  }}
                  sx={{ color: '#0078D4' }}
                >
                  {t('table.assetCode')}
                </MenuItem>
                <MenuItem
                  value='IDENTIFIER_CODE'
                  onClick={() => {
                    router.push({
                      pathname: MENU_URL.ASSET_DECLARATION_CATEGORY_LIST,
                      query: {
                        view: 'IDENTIFIER_CODE',
                      },
                    })
                  }}
                  sx={{ color: '#0078D4' }}
                >
                  {t('table.identifierCode')}
                </MenuItem>
              </Select>
            </FormControl>
          </div>
          <CoreButton>{t('common:btn.add')}</CoreButton>
        </div>
        {viewType === 'ASSET_CODE' ? (
          <div className='py-5'>
            <TableContainerCommon layout='Layout1'>
              <Table>
                <TableHeadCommon layout='Layout1'>
                  <TableRow>
                    <TableCellHeaderNoneBorder rowSpan={2}>
                      STT
                    </TableCellHeaderNoneBorder>
                    <TableCellHeaderNoneBorder rowSpan={2}>
                      {t('table.assetCode')}
                    </TableCellHeaderNoneBorder>
                    <TableCellHeaderNoneBorder rowSpan={2}>
                      {t('table.assetName')}
                    </TableCellHeaderNoneBorder>
                    <TableCellHeaderNoneBorder rowSpan={2}>
                      {t('table.assetCategory')}
                    </TableCellHeaderNoneBorder>
                    <TableCellHeaderNoneBorder rowSpan={2}>
                      {t('table.allocated')}
                    </TableCellHeaderNoneBorder>
                    <TableCellHeaderCenter colSpan={3}>
                      {t('table.unallocated')}
                    </TableCellHeaderCenter>
                    <TableCellHeader rowSpan={2}>
                      {t('table.configurationParameters')}
                    </TableCellHeader>
                  </TableRow>
                  <TableRow>
                    <TableCellHeader rowSpan={1}>
                      {t('table.totalInventory')}
                    </TableCellHeader>
                    <TableCellHeader rowSpan={1}>
                      {t('table.identified')}
                    </TableCellHeader>
                    <TableCellHeader rowSpan={1}>
                      {t('table.unidentified')}
                    </TableCellHeader>
                  </TableRow>
                </TableHeadCommon>

                <TableBody>
                  {isLoadingTable ? (
                    <TableRow>
                      <TableCell colSpan={9} variant='body'>
                        <div className='flex justify-center min-h-[60px]'>
                          <CoreLoading />
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : !dataTable?.content?.length || !dataTable?.content ? (
                    <TableRow>
                      <TableCell
                        colSpan={9}
                        variant='body'
                        align='center'
                        className='py-8'
                      >
                        <div className='flex justify-center min-h-[60px] flex-col'>
                          <EmptyIcon />
                          <Typography variant='body2'>
                            {t('common:table.no_data')}
                          </Typography>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    dataTable?.content?.map((row, index) => (
                      <TableRow
                        key={'key' + index}
                        sx={{
                          cursor: 'pointer',
                          backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#fff',
                          '&:hover': { backgroundColor: '#b2e4f9' },
                        }}
                      >
                        <TableCell>
                          {dataTable?.page * dataTable?.size + index + 1}
                        </TableCell>
                        <TableCell>{row?.sku}</TableCell>
                        <TableCell>{row?.name}</TableCell>
                        <TableCell>{row?.productCategory?.name}</TableCell>
                        <TableCellBorderRight>
                          {`${row?.quantityAllocated} ${row?.uom?.name}`}
                        </TableCellBorderRight>
                        <TableCellBorderRight>
                          {`${row?.quantityPickIn} ${row?.uom?.name}`}
                        </TableCellBorderRight>
                        <TableCellBorderRight
                          onClick={() => {
                            row.quantityIdentified > 0 &&
                              showDialog(
                                <DialogUpdateIdentifiedAssetInfo
                                  productId={row?.id}
                                  checkingType={row?.checkingType}
                                  productCategory={row?.productCategory}
                                  sku={row?.sku}
                                  name={row?.name}
                                  quantityIdentified={row?.quantityIdentified}
                                  refetch={refetch}
                                  uomName={row?.uom?.name}
                                  uomId={row?.uom?.id}
                                />
                              )
                          }}
                          style={
                            row?.quantityIdentified > 0
                              ? { cursor: 'pointer' }
                              : {}
                          }
                        >
                          {`${row?.quantityIdentified} ${row?.uom?.name}`}
                        </TableCellBorderRight>
                        <TableCellBorderRight>
                          {
                            <div className='flex items-center'>
                              {`${row?.quantityUnidentified} ${row?.uom?.name}`}
                              {row?.quantityUnidentified > 0 && (
                                <IconButton
                                  onClick={() => {
                                    showDialog(
                                      <DialogDeclareIdentifierCode
                                        productId={row?.id}
                                        checkingType={row?.checkingType}
                                        productCategory={row?.productCategory}
                                        sku={row?.sku}
                                        name={row?.name}
                                        quantityUnidentified={
                                          row?.quantityUnidentified
                                        }
                                        quantityIdentified={
                                          row?.quantityIdentified
                                        }
                                        refetch={refetch}
                                        uomName={row?.uom?.name}
                                        uomId={row?.uom?.id}
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
                                </IconButton>
                              )}
                            </div>
                          }
                        </TableCellBorderRight>
                        <TableCell
                          style={{
                            color: row?.isConfig ? GREEN : ORANGE,
                            cursor: 'pointer',
                          }}
                          onClick={() => {
                            showDialog(
                              <DialogConfig
                                productId={row?.id}
                                isConfig={row?.isConfig}
                                refetch={refetch}
                              />
                            )
                          }}
                        >
                          {row?.isConfig
                            ? t('table.configured')
                            : t('table.notConfigured')}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainerCommon>
            <div className='py-5'>
              <CoreTablePagination
                size={Number(dataTable?.size)}
                page={Number(dataTable?.page)}
                totalPages={Number(dataTable?.totalPages)}
                onChangePagination={(val: any) =>
                  onChangePageSize && onChangePageSize(val)
                }
              />
            </div>
          </div>
        ) : (
          <div className='py-5'>
            <CoreTable
              tableName='assetDeclarationCategoryListIdentifierCode'
              columns={columns}
              data={tableDataIdentifierCode}
              onChangePageSize={onChangePageSize}
              {...dataIdentifierCode}
              isLoading={isLoadingTableIdentifierCode}
              isShowColumnStt
            />
          </div>
        )}
      </div>
    </PageContainer>
  )
}
