import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import CoreInput from '@/components/atoms/CoreInput'
import CoreInputColor from '@/components/atoms/CoreInputColor'
import { Action } from '@/components/molecules/Action'
import { ParameterType } from '@/enum'
import { TRANSLATE } from '@/routes'
import { RequestBody } from '@/service/asset/paramAsset/save/type'
import { Grid } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

type Props = {
  index4?: number
  index: number
  index2: number
  index3: number
  append: any
  remove: any
  minimum: number
  maximum: number
  isWarning: boolean
  isView: boolean
  fieldLength: number
}

export default function TableImpactLevelCenter({
  index4,
  index,
  index2,
  index3,
  append,
  remove,
  isWarning,
  minimum,
  maximum,
  isView,
  fieldLength,
}: Props) {
  const { control } = useFormContext<RequestBody['POST']>()
  const { t } = useTranslation(TRANSLATE.PARAM_ASSET)
  return (
    <Grid container spacing={{ xs: 1, sm: 2, md: 3 }} paddingY={1}>
      <Grid item xs={12} sm={12} md={2.5} lg={2.5}>
        <CoreInput
          control={control}
          name={`trackAssetLine.${index}.assetCategory.${index2}.attributes.${index3}.impactStandard.${index4}.startValue`}
          label='Từ'
          type='number'
          rules={{
            validate: {
              min: (val: number) => {
                return val >= minimum || `${t('text.less_than')} ${minimum}`
              },
              max: (val: number) => {
                return val <= maximum || `${t('text.more_than')} ${maximum}`
              },
            },
          }}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={2.5} lg={2.5}>
        <CoreInput
          control={control}
          name={`trackAssetLine.${index}.assetCategory.${index2}.attributes.${index3}.impactStandard.${index4}.endValue`}
          label={t('label.move')}
          type='number'
          rules={{
            validate: {
              min: (val: number) => {
                return val >= minimum || `${t('text.less_than')} ${minimum}`
              },
              max: (val: number) => {
                return val <= maximum || `${t('text.more_than')} ${maximum}`
              },
            },
          }}
        />
      </Grid>
      {isWarning ? (
        <>
          <Grid item xs={12} sm={12} md={2} lg={2}>
            <CoreInput
              control={control}
              name={`trackAssetLine.${index}.assetCategory.${index2}.attributes.${index3}.impactStandard.${index4}.content`}
              label={t('label.content')}
              required
              rules={{ required: t('common:validation.required') }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={2} lg={2}>
            <CoreInputColor
              name={`trackAssetLine.${index}.assetCategory.${index2}.attributes.${index3}.impactStandard.${index4}.color`}
              control={control}
              label={t('label.color')}
              placeholder={`${t('placeholder.color')}`}
            />
          </Grid>
        </>
      ) : null}
      <Grid item xs={12} sm={12} md={2} lg={2}>
        <CoreAutocomplete
          control={control}
          name={`trackAssetLine.${index}.assetCategory.${index2}.attributes.${index3}.impactStandard.${index4}.actionRegulation`}
          label={t('label.actionRegulation')}
          placeholder={`${t('placeholder.actionRegulation')}`}
          options={ParameterType}
        />
      </Grid>
      {!isView && (
        <Grid item xs={12} sm={12} md={1} lg={1}>
          <div className='flex justify-center items-center'>
            <Action
              actionList={fieldLength === 1 ? ['append'] : ['remove', 'append']}
              onAppendAction={() => {
                append({
                  startValue: 0,
                  endValue: 0,
                  content: '',
                  color: '',
                  actionRegulation: '',
                  parameterType: null,
                })
              }}
              onRemoveAction={() => {
                remove(index4)
              }}
            />
          </div>
        </Grid>
      )}
    </Grid>
  )
}
