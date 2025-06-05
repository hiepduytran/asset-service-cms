import { CoreDialog } from '@/components/organism/CoreDialog'
import { Box, Grid } from '@mui/material'
import { useDeclareIdentifierCode } from './useDeclareIdentifierCode'
import CoreInput from '@/components/atoms/CoreInput'
import { CoreTable } from '@/components/organism/CoreTable'
import { CoreButton } from '@/components/atoms/CoreButton'
import CoreLoading from '@/components/molecules/CoreLoading'
import CoreCheckbox from '@/components/atoms/CoreCheckbox'

export const DialogDeclareIdentifierCode = (props: any) => {
  const [values, handles] = useDeclareIdentifierCode(props)
  const { columns, dataTable, control, isLoading } = values
  const { t, onSubmit, onCancel, autoGen } = handles
  const { watch, index, isView } = props
  return (
    <CoreDialog
      onClose={onCancel}
      width={1200}
      title={`${t('declareTheIdentifier')}`}
    >
      {isLoading ? (
        <CoreLoading />
      ) : (
        <Box className='p-15'>
          <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <CoreInput
                control={control}
                label={t('table.assetCode')}
                name=''
                value={watch(`assetAllocationLine.${index}.sku`)}
                isViewProp
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <CoreInput
                control={control}
                label={t('table.assetName')}
                name=''
                value={watch(`assetAllocationLine.${index}.assetName`)}
                isViewProp
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <CoreInput
                control={control}
                label={t('table.beginningPeriodIssuanceQuantity')}
                name=''
                value={`${watch(
                  `assetAllocationLine.${index}.requestQuantity`
                )} ${watch(`assetAllocationLine.${index}.uom`)?.name}`}
                isViewProp
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              {!isView ? (
                <CoreCheckbox
                  control={control}
                  name={`assetAllocationLine.${index}.autoGen`}
                  label={`${t('automatic_code_generation')}`}
                  onChangeValue={(value: boolean) => {
                    if (value) {
                      autoGen()
                    }
                  }}
                />
              ) : null}
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <CoreTable
                columns={columns}
                data={dataTable}
                isShowColumnStt
                paginationHidden
              />
            </Grid>
          </Grid>
        </Box>
      )}
      {!isView && (
        <div className='flex justify-center gap-10 py-10'>
          <CoreButton theme='cancel' onClick={onCancel}>
            {t('common:btn.cancel')}
          </CoreButton>
          <CoreButton theme='submit' onClick={onSubmit}>
            {t('common:btn.confirm')}
          </CoreButton>
        </div>
      )}
    </CoreDialog>
  )
}
