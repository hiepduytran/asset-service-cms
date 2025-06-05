import CoreCheckbox from '@/components/atoms/CoreCheckbox'
import { Grid, Typography } from '@mui/material'
import { dateEnum } from '../../utils'
import TableCustom from '../TableCustom'
import useStep2 from './useStep2'

import { CoreButton } from '@/components/atoms/CoreButton'
import CustomStep from '../CustomStep'

type Props = {
  step: number
}
export default function Step2(props: Props) {
  const { step } = props
  const [
    { methods, isView, isUpdate, maintenanceCardLinesFields, isLoadingApprove },
    { t, handleChangeStatus },
  ] = useStep2()
  const { control, watch } = methods
  return (
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
        </Typography>
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
      </Grid>

      <Grid item xs={12}>
        <div className=' space-y-20'>
          {maintenanceCardLinesFields.map((item, index) => {
            return (
              <div key={'key' + index}>
                <Typography
                  variant='h6'
                  sx={{
                    fontWeight: 600,
                    marginBottom: 2,
                    marginTop: 2,
                  }}
                >
                  {item.standardGroup.name}
                </Typography>
                <TableCustom index={index} />
              </div>
            )
          })}
        </div>
      </Grid>

      {!(watch('state') === 'REJECT') && (
        <Grid item xs={12}>
          <div className='flex items-center mt-15'>
            {
              <CustomStep
                step={watch('checkAccountLevel') === 'LEVEL_1' ? 0 : 1}
                onChange={() => {}}
                stepList={
                  watch('checkApproveLevel') === 'LEVEL_2'
                    ? [
                        `${t(
                          'self_maintenance.standard_approval.approval_level_1'
                        )}`,
                        `${t(
                          'self_maintenance.standard_approval.approval_level_2'
                        )}`,
                      ]
                    : [
                        `${t(
                          'self_maintenance.standard_approval.approval_level_1'
                        )}`,
                      ]
                }
              />
            }
          </div>
        </Grid>
      )}

      {((watch('state') === 'PENDING' &&
        watch('checkAccountLevel') === 'LEVEL_1') ||
        (watch('state') === 'APPROVED_LEVEL_1' &&
          watch('checkAccountLevel') === 'LEVEL_2')) && (
        <div className='flex justify-center mt-15 w-full'>
          <div className='m-5'>
            <CoreButton
              theme='reject'
              loading={isLoadingApprove}
              onClick={() => {
                const currentState =
                  watch('checkAccountLevel') === 'LEVEL_1'
                    ? 'REJECT_1'
                    : 'REJECT_2'
                handleChangeStatus(currentState)
              }}
            >
              {t('common:btn.reject')}
            </CoreButton>
          </div>

          <div className='m-5'>
            <CoreButton
              theme='submit'
              type='submit'
              loading={isLoadingApprove}
              onClick={() =>
                handleChangeStatus(
                  watch('state') === 'PENDING'
                    ? 'APPROVED_LEVEL_1'
                    : 'APPROVED_LEVEL_2'
                )
              }
            >
              {t('common:btn.approval')}
            </CoreButton>
          </div>
        </div>
      )}
    </Grid>
  )
}
