import CoreCheckbox from '@/components/atoms/CoreCheckbox'
import { CoreButton } from '@/components/atoms/CoreButton'
import CoreLoading from '@/components/molecules/CoreLoading'
import { Grid, Typography } from '@mui/material'
import { dateEnum } from '../../utils'
import TableCustomSelfMaintenanceForm from '../TableCustom'
import useStep2 from './useStep2'

type Props = {
  isLoadingGetStandardByIds?: boolean
  loadingSubmit?: boolean
}
export default function Step2(props: Props) {
  const { loadingSubmit, isLoadingGetStandardByIds } = props
  const [
    { methods, fieldsMaintenanceCardLines, isView, isUpdate, loadingDraft },
    { t, onCancel, onDraft },
  ] = useStep2()
  const {
    control,
    setError,
    formState: { errors },
    clearErrors,
    watch,
  } = methods
  return (
    <>
      <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12}>
          <Typography
            variant='h6'
            sx={{
              fontWeight: 600,
              marginBottom: 1,
            }}
          >
            {t(
              'self_maintenance.self_maintenance_perform.applicable'
            ).toUpperCase()}
            {!isView && <span className=' text-[#FF3B30]'>*</span>}
          </Typography>
          <div
            className='flex'
            onBlur={() => {
              const [isMon, isTue, isWed, isThu, isFri, isSat, isSun] = watch([
                'isMon',
                'isTue',
                'isWed',
                'isThu',
                'isFri',
                'isSat',
                'isSun',
              ])
              const val = [
                ...(isMon ? ['MON'] : []),
                ...(isTue ? ['TUE'] : []),
                ...(isWed ? ['WED'] : []),
                ...(isThu ? ['THU'] : []),
                ...(isFri ? ['FRI'] : []),
                ...(isSat ? ['SAT'] : []),
                ...(isSun ? ['SUN'] : []),
              ]
              if (val.length <= 0) {
                setError('applicableDayOfWeeks', {
                  type: 'custom',
                  message: `${t('common:validation.required')}`,
                })
              } else {
                clearErrors('applicableDayOfWeeks')
              }
            }}
          >
            <div className='flex'>
              {dateEnum.map((ele, index) => {
                return (
                  <CoreCheckbox
                    key={ele.label}
                    name={ele.value}
                    control={control}
                    label={ele.label}
                  />
                )
              })}
            </div>
          </div>
          <Typography fontSize={10} className='text-[#FF3B30]'>
            {errors?.applicableDayOfWeeks?.message}
          </Typography>
        </Grid>

        {!isUpdate && isLoadingGetStandardByIds ? (
          <CoreLoading />
        ) : (
          <Grid item xs={12}>
            <div className=' space-y-20'>
              {fieldsMaintenanceCardLines.map((item, index) => {
                return (
                  <div key={'key' + index}>
                    <Typography
                      variant='h6'
                      sx={{
                        fontWeight: 600,
                        marginBottom: 2,
                      }}
                    >
                      {item?.standardGroup?.name}
                    </Typography>
                    <TableCustomSelfMaintenanceForm index={index} />
                  </div>
                )
              })}
            </div>
          </Grid>
        )}
      </Grid>
      {!isView && (
        <div className='flex justify-center mt-15'>
          <div className='m-5'>
            <CoreButton theme='cancel' onClick={onCancel}>
              {t('common:btn.cancel')}
            </CoreButton>
          </div>
          {isUpdate ? (
            <></>
          ) : (
            <div className='m-5'>
              <CoreButton
                theme='submit'
                onClick={onDraft}
                loading={loadingDraft}
              >
                {t('common:btn.draft')}
              </CoreButton>
            </div>
          )}
          <div className='m-5'>
            <CoreButton theme='submit' type='submit' loading={loadingSubmit}>
              {t('common:btn.send_approval')}
            </CoreButton>
          </div>
        </div>
      )}
    </>
  )
}
