import { CoreDialog } from '@/components/organism/CoreDialog'
import { Box, Grid } from '@mui/material'
import { useAddNew } from './useAddNew'
import CoreInput from '@/components/atoms/CoreInput'
import { CoreTable } from '@/components/organism/CoreTable'
import { CoreButton } from '@/components/atoms/CoreButton'
import CoreCheckbox from '@/components/atoms/CoreCheckbox'

export const DialogAddNew = (props: any) => {
  const [values, handles] = useAddNew(props)
  const { columns, dataTable } = values
  const { t, onSubmit, onCancel, autoGen } = handles
  const { control, watch, index, index1, index2, quantityUnidentified, uomName } = props
  return (
    <CoreDialog
      onClose={onCancel}
      width={1200}
      title={t('addNewSerialAndIdentifierCode')}
    >
      <Box className='p-15'>
        <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <CoreInput
              control={control}
              label={t('table.location')}
              name=''
              value={watch(`pickIn.${index}.locationLot.${index1}.code`)}
              isViewProp
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <CoreInput
              control={control}
              label={t('table.lot')}
              name=''
              value={watch(
                `pickIn.${index}.locationLot.${index1}.lot.${index2}.code`
              )}
              isViewProp
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <CoreInput
              control={control}
              label={t('table.undeclaredQuantity')}
              name=''
              value={`${quantityUnidentified} ${uomName}`}
              isViewProp
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <CoreCheckbox
              control={control}
              name={`pickIn.${index}.locationLot.${index1}.lot.${index2}.autoGen`}
              label={`${t('automatic_code_generation')}`}
              onChangeValue={(value: boolean) => {
                if (value) {
                  autoGen()
                }
              }}
            />
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
      <Box className='flex justify-center gap-10 py-10'>
        <CoreButton theme='cancel' onClick={onCancel}>
          {t('common:btn.cancel')}
        </CoreButton>
        <CoreButton theme='submit' onClick={onSubmit}>
          {t('common:btn.confirm')}
        </CoreButton>
      </Box>
    </CoreDialog>
  )
}
