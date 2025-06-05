import CoreCheckbox from '@/components/atoms/CoreCheckbox'
import { Grid, Typography } from '@mui/material'
import { dateEnum } from '../../utils'
import TableCustom from '../TableCustom'
import useStep2 from './useStep2'

type Props = {
  step: number
}
export default function Step2(props: Props) {
  const { step } = props
  const [{ methods, isView, isUpdate, maintenanceCardLinesFields }, { t }] =
    useStep2()
  const { control, getValues } = methods
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
    </Grid>
  )
}
