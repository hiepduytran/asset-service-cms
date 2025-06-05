import { useFieldArray, useFormContext } from 'react-hook-form'
import { RequestBody } from '@/service/asset/operate/save/type'
import { Fragment } from 'react'
import { InputAdornment, TableCell, TableRow, Typography } from '@mui/material'
import CoreInput from '@/components/atoms/CoreInput'
import { OperateLine } from '@/service/asset/operate/save/type'
import { getOperateContent } from '@/service/hrm/getOperateContent'
import { CoreDateTimePicker } from '@/components/atoms/CoreDateTimePicker'
import { useTranslation } from 'react-i18next'
import { TRANSLATE } from '@/routes'
import { useRouter } from 'next/router'

export const RowItem = ({
  item,
  index,
}: {
  item: OperateLine
  index: number
}) => {
  const { t } = useTranslation(TRANSLATE.OPERATE)
  const { fields: attributesFields } = useFieldArray({
    name: `operateLine.${index}.attributes`,
  })
  const { control, watch, setValue } = useFormContext<RequestBody['SAVE']>()

  const router = useRouter()
  const { actionType } = router.query
  const isView = actionType === 'VIEW'

  const actionRegulationText = (text: string) => {
    if (text === 'TESTING') {
      return <Typography>{`${t('operate_save.text.check')}`}</Typography>
    } else if (text === 'STOP') {
      return <Typography>{`${t('operate_save.text.stop')}`}</Typography>
    } else if (text === 'MAINTAIN') {
      return <Typography>{`${t('operate_save.text.maintenance')}`}</Typography>
    } else {
      return null
    }
  }

  return (
    <>
      <TableRow sx={{ backgroundColor: '#F6F7F9' }}>
        <TableCell colSpan={9}>
          <Typography
            sx={{
              padding: '8px 0px 8px 0px',
              fontWeight: 600,
            }}
          >
            {item?.attributeCategory?.name}
          </Typography>
        </TableCell>
      </TableRow>
      {attributesFields.map((item3: any, index2) => {
        return (
          <Fragment key={index2}>
            <TableRow sx={{ padding: '8px 0px 8px 0px' }}>
              <TableCell component='th' scope='row'>
                {item3.attribute?.name}
              </TableCell>
              <TableCell>
                {item3?.attributeValue
                  .map((item4: any) => item4?.name)
                  .join(', ')}
              </TableCell>
              <TableCell>
                {item3.isParameter === true
                  ? `${t('operate_save.text.main')}`
                  : `${t('operate_save.text.extra')}`}
              </TableCell>
              <TableCell>
                <Typography
                  sx={{
                    padding: '20px 20px 20px 12px',
                  }}
                >
                  {item3?.minimum}&nbsp;-&nbsp;{item3?.maximum}&nbsp;
                  {item3?.uom?.name}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  sx={{
                    padding: '20px 20px 20px 12px',
                  }}
                >
                  16/06/2024 07:30
                </Typography>
              </TableCell>
              <TableCell>
                <CoreInput
                  control={control}
                  name={`operateLine.${index}.attributes.${index2}.value`}
                  placeholder={`${t('operate_save.placeholder.value')}`}
                  required={true}
                  rules={{
                    required: t('common:validation.required'),
                  }}
                  onChangeValue={async (val) => {
                    if (val) {
                      const res = await getOperateContent({
                        temperate: val,
                        lineId: item3.lineId,
                      })
                      setValue(
                        `operateLine.${index}.attributes.${index2}.content`,
                        res?.data?.content
                      )
                      setValue(
                        `operateLine.${index}.attributes.${index2}.color`,
                        res?.data?.color
                      )
                      setValue(
                        `operateLine.${index}.attributes.${index2}.actionRegulation`,
                        res?.data?.actionRegulation
                      )
                      if (val > item3?.maximum && item3.isParameter === true) {
                        setValue('evaluateAsset', 'ABNORMAL')
                      }
                    }
                  }}
                  className={isView ? 'w-30' : 'w-60'}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <Typography className='text-[#242424]'>
                          {item3?.uom?.name}
                        </Typography>
                      </InputAdornment>
                    ),
                  }}
                />
              </TableCell>
              <TableCell>
                <CoreDateTimePicker
                  control={control}
                  name={`operateLine.${index}.attributes.${index2}.timeRecord`}
                  label=''
                  placeholder='DD/MM/YYYY HH:mm'
                />
              </TableCell>
              <TableCell>
                <div className='flex items-center'>
                  {watch(`operateLine.${index}.attributes.${index2}.color`) && (
                    <div
                      style={{
                        border: '1px solid',
                        borderRadius: '100%',
                        padding: 5,
                        width: '5px',
                        color: watch(
                          `operateLine.${index}.attributes.${index2}.color`
                        ),
                        backgroundColor: watch(
                          `operateLine.${index}.attributes.${index2}.color`
                        ),
                      }}
                    />
                  )}
                  &nbsp;
                  <Typography
                    style={{
                      color: watch(
                        `operateLine.${index}.attributes.${index2}.color`
                      ),
                    }}
                  >
                    {watch(
                      `operateLine.${index}.attributes.${index2}.content`
                    ) === ''
                      ? `${t('operate_save.text.no_warning')}`
                      : watch(
                        `operateLine.${index}.attributes.${index2}.content`
                      )}
                  </Typography>
                </div>
              </TableCell>
              <TableCell>
                <Typography>
                  {actionRegulationText(
                    watch(
                      `operateLine.${index}.attributes.${index2}.actionRegulation`
                    )
                  )}
                </Typography>
              </TableCell>
            </TableRow>
          </Fragment>
        )
      })}
    </>
  )
}
