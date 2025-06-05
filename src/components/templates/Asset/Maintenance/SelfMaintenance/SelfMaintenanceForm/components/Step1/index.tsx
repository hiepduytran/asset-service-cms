import { CoreButton } from '@/components/atoms/CoreButton'
import CoreCheckbox from '@/components/atoms/CoreCheckbox'
import { CoreDatePicker } from '@/components/atoms/CoreDatePicker'
import CoreInput from '@/components/atoms/CoreInput'
import { getAllProductAndStandard } from '@/service/asset/maintenance/selfMaintenance/SelfMaintenanceForm/list'
import { Box, Grid, Typography } from '@mui/material'
import AutoCompleteCustomSelfMaintenanceForm from '../AutoCompleteAPICustom'
import useStep1 from './useStep1'
import { CoreImage } from '@/components/atoms/CoreImage'
import { REGEX } from '@/helper/regex'

type Props = {
  handleChangeStep: (val: number) => void
  loadingSubmit?: boolean
}

export default function Step1(props: Props) {
  const { handleChangeStep, loadingSubmit } = props
  const [
    { methods, standardMethodGroupFields, isView, isUpdate, loadingDraft },
    { t, onCancel, onDraft },
  ] = useStep1()

  const { control, setValue, watch } = methods

  return (
    <>
      <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12}>
          <Typography variant='h6' sx={{ fontWeight: 600, marginBottom: 3 }}>
            {`${t(
              'self_maintenance.standard_declare.info_standard'
            ).toUpperCase()}`}
          </Typography>
          <div className='flex gap-10'>
            <Grid item xs={12} sm={12} md={4}>
              <CoreInput
                name='code'
                control={control}
                label={t(
                  'self_maintenance.self_maintenance_perform.maintenanceCard.label'
                )}
                placeholder={t(
                  'self_maintenance.self_maintenance_perform.maintenanceCard.placeholder'
                )}
                inputProps={{
                  maxLength: 50,
                }}
                isViewProp={!!isUpdate}
                rules={{
                  pattern: {
                    value: REGEX.CODE_NEW,
                    message: t('common:validation.code_new'),
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <CoreInput
                name='name'
                control={control}
                label={t(
                  'self_maintenance.self_maintenance_perform.nameCard.label'
                )}
                placeholder={t(
                  'self_maintenance.self_maintenance_perform.nameCard.placeholder'
                )}
                inputProps={{
                  maxLength: 250,
                }}
                isViewProp={!!isUpdate}
                rules={{
                  required: t('common:validation.required'),
                  validate: {
                    isRequired: (v: string) =>
                      v.trim().length > 0 || t('common:validation.required'),
                  },
                }}
                required={!isView}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <CoreDatePicker
                name='startDate'
                control={control}
                label={t('table.startDate')}
                placeholder='DD/MM/YYYY'
                disablePast
              />
            </Grid>
          </div>
        </Grid>

        <Grid item xs={12}>
          <Typography variant='h6' sx={{ fontWeight: 600, marginBottom: 3 }}>
            {t(
              'self_maintenance.self_maintenance_form.info_asset'
            ).toUpperCase()}
          </Typography>
          <div className='flex gap-10'>
            <Grid xs={12} sm={12} md={4}>
              <AutoCompleteCustomSelfMaintenanceForm
                name='product'
                control={control}
                label={t('self_maintenance.standard_declare.productSKU.label')}
                placeholder={t(
                  'self_maintenance.standard_declare.productSKU.placeholder'
                )}
                fetchDataFn={getAllProductAndStandard}
                labelPath='sku'
                rules={{
                  required: t('common:validation.required'),
                }}
                required
                onChangeValue={(val) => {
                  if (val) {
                    setValue('productName', val?.name)
                    setValue('productImageUrls', val?.imageUrls)
                    setValue('standardMethodGroups', val?.standardMethodGroups)
                    return
                  }
                  setValue('productName', '')
                  setValue('productImageUrls', [])
                  setValue('standardMethodGroups', [])
                }}
              />
            </Grid>
            <Grid xs={12} sm={12} md={4}>
              <CoreInput
                name='productName'
                control={control}
                label={t(
                  'self_maintenance.self_maintenance_perform.product.label'
                )}
                placeholder={t(
                  'self_maintenance.self_maintenance_perform.product.placeholder'
                )}
                isViewProp={true}
              />
            </Grid>
          </div>
        </Grid>
        <Grid item xs={12}>
          <Typography fontSize={'14px'} fontWeight={700}>
            {t('self_maintenance.standard_declare.image')}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Box className='flex gap-10 mb-5'>
            {watch('product')?.imageUrls?.map((item, index) => (
              <div
                className='flex justify-center items-center p-2 border-[1px] border-solid border-[#DFE0EB] rounded-sm'
                key={'key' + index}
              >
                <CoreImage
                  width={100}
                  height={100}
                  alt=''
                  className='rounded-sm'
                  src={item ?? ''}
                />
              </div>
            ))}
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant='h6'
            sx={{
              fontWeight: 600,
              marginBottom: 3,
              marginTop: 3,
            }}
          >
            {`${t(
              'self_maintenance.self_maintenance_form.applicable_standard'
            )}`.toUpperCase()}
          </Typography>
          <div className='flex flex-wrap'>
            {standardMethodGroupFields.map((item, index) => {
              return (
                <CoreCheckbox
                  key={item.key}
                  control={control}
                  name={`standardMethodGroups.${index}.check`}
                  label={item.standardGroup.name}
                />
              )
            })}
          </div>
        </Grid>
      </Grid>
      {!isView && (
        <>
          {isUpdate ? (
            <div className='flex justify-center mt-15'>
              <div className='m-5'>
                <CoreButton theme='cancel' onClick={onCancel}>
                  {t('common:btn.cancel')}
                </CoreButton>
              </div>

              <div className='m-5'>
                <CoreButton theme='submit' onClick={() => handleChangeStep(1)}>
                  {`${t('next_step_2')}`}
                </CoreButton>
              </div>
            </div>
          ) : (
            <div className='flex justify-center mt-15'>
              <div className='m-5'>
                <CoreButton theme='cancel' onClick={onCancel}>
                  {t('common:btn.cancel')}
                </CoreButton>
              </div>
              <div className='m-5'>
                <CoreButton
                  theme='submit'
                  onClick={onDraft}
                  loading={loadingDraft}
                >
                  {t('common:btn.draft')}
                </CoreButton>
              </div>
              <div className='m-5'>
                <CoreButton theme='submit' onClick={() => handleChangeStep(1)}>
                  {`${t('next_step_2')}`}
                </CoreButton>
              </div>
            </div>
          )}
        </>
      )}
    </>
  )
}
