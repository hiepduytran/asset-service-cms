import { CoreButton } from '@/components/atoms/CoreButton'
import CoreCheckbox from '@/components/atoms/CoreCheckbox'
import { RED } from '@/helper/colors'
import {
  Box,
  Dialog,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
} from '@mui/material'
import Image from 'next/image'
import { useFieldArray } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import TableImpactLevelBig from './TableImpactlevel/TableImpactLevelBig'
import TableImpactLevelCenter from './TableImpactlevel/TableImpactLevelCenter'
import TableImpactLevelSmall from './TableImpactlevel/TableImpactLevelSmall'
import { TRANSLATE } from '@/routes'

type Props = {
  index: number
  index2: number
  control: any
  open: boolean
  attribute: any
  watch: any
  isView: boolean
  setOpen: any
  trigger: any
}

export default function DialogLevel({
  index,
  index2,
  control,
  open,
  attribute,
  watch,
  isView,
  setOpen,
  trigger
}: Props) {
  const { t } = useTranslation(TRANSLATE.PARAM_ASSET)
  const {
    fields: impactLevelConfigurationSmall,
    append: appendImpactMinimum,
    remove: removeImpactMinimum,
  } = useFieldArray({
    name: `trackAssetLine.${index}.assetCategory.${index2}.attributes.${attribute.indexAtt}.impactMinimum`,
    keyName: 'keySmall',
  })

  const {
    fields: impactLevelConfigurationCenter,
    append: appendImpactStandard,
    remove: removeImpactStandard,
  } = useFieldArray({
    name: `trackAssetLine.${index}.assetCategory.${index2}.attributes.${attribute.indexAtt}.impactStandard`,
    keyName: 'keyCenter',
  })

  const {
    fields: impactLevelConfigurationBig,
    append: appendImpactMaximum,
    remove: removeImpactMaximum,
  } = useFieldArray({
    name: `trackAssetLine.${index}.assetCategory.${index2}.attributes.${attribute.indexAtt}.impactMaximum`,
    keyName: 'keyBig',
  })

  const handleClose = () => {
    setOpen(false)
  }
  const handleSubmitForm = async () => {
    const isValid = await trigger([
      `trackAssetLine.${index}.assetCategory.${index2}.attributes.${attribute.indexAtt}.impactMinimum`,
      `trackAssetLine.${index}.assetCategory.${index2}.attributes.${attribute.indexAtt}.impactStandard`,
      `trackAssetLine.${index}.assetCategory.${index2}.attributes.${attribute.indexAtt}.impactMaximum`,
    ])
    isValid && setOpen(false)
  }
  return (
    <Dialog onClose={handleClose} open={open} maxWidth='lg'>
      <DialogTitle>
        <div className='flex items-center'>
          <Box className='flex justify-center items-center m-auto align-middle text-center mt-10'>
            <Typography
              fontWeight={600}
              fontSize={20}
              style={{ lineHeight: 1.5 }}
            >
              {`${t('text.config_parameter')}`}
            </Typography>
            &nbsp;
            <Typography
              fontWeight={600}
              fontSize={20}
              color={RED}
              style={{ lineHeight: 1.5 }}
            >
              {attribute.attributeName}
            </Typography>
          </Box>
          <IconButton
            aria-label='close'
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <Image
              className='absolute right-7 top-7 cursor-pointer'
              onClick={handleClose}
              height={25}
              width={25}
              src={require('@/assets/svg/close.svg')}
              alt='close'
            />
          </IconButton>
        </div>
      </DialogTitle>

      <Grid container spacing={3}>
        <Grid
          item
          xs={12}
          style={{
            paddingTop: 0,
          }}
        >
          <CoreCheckbox
            control={control}
            label={t('label.warning')}
            name={`trackAssetLine.${index}.assetCategory.${index2}.attributes.${attribute.indexAtt}.isWarning`}
            placeholder=''
          />
        </Grid>
        <Grid item xs={12}>
          <Typography fontWeight={600}>
            {`${t('text.mini_config')}`} (&lt; {attribute.minimum}
            {attribute?.uom?.name})
          </Typography>
        </Grid>
        <Grid item xs={12}>
          {impactLevelConfigurationSmall.map((field: any, index4: number) => {
            return (
              <TableImpactLevelSmall
                key={field.keySmall}
                index4={index4}
                index={index}
                index2={index2}
                index3={attribute.indexAtt}
                append={appendImpactMinimum}
                remove={removeImpactMinimum}
                minimum={attribute.minimum}
                isWarning={watch(
                  `trackAssetLine.${index}.assetCategory.${index2}.attributes.${attribute.indexAtt}.isWarning`
                )}
                isView={isView}
                fieldLength={impactLevelConfigurationSmall.length}
              />
            )
          })}
        </Grid>
        <Grid item xs={12}>
          <Typography fontWeight={600}>
            {`${t('text.standard_config')}`} ({attribute.minimum}
            {attribute?.uom?.name}&nbsp; &lt;= X &lt;= {attribute.maximum}
            {attribute?.uom?.name})
          </Typography>
        </Grid>
        <Grid item xs={12}>
          {impactLevelConfigurationCenter.map((field: any, index5: number) => {
            return (
              <TableImpactLevelCenter
                key={field.keyCenter}
                index4={index5}
                index={index}
                index2={index2}
                index3={attribute.indexAtt}
                append={appendImpactStandard}
                remove={removeImpactStandard}
                minimum={attribute.minimum}
                maximum={attribute.maximum}
                isWarning={watch(
                  `trackAssetLine.${index}.assetCategory.${index2}.attributes.${attribute.indexAtt}.isWarning`
                )}
                isView={isView}
                fieldLength={impactLevelConfigurationCenter.length}
              />
            )
          })}
        </Grid>
        <Grid item xs={12}>
          <Typography fontWeight={600}>
            {`${t('text.max_config')}`} (&gt; {attribute.maximum}
            {attribute?.uom?.name})
          </Typography>
        </Grid>
        <Grid item xs={12}>
          {impactLevelConfigurationBig.map((field: any, index6: number) => {
            return (
              <TableImpactLevelBig
                key={field.keyBig}
                index4={index6}
                index={index}
                index2={index2}
                index3={attribute.indexAtt}
                append={appendImpactMaximum}
                remove={removeImpactMaximum}
                maximum={attribute.maximum}
                isWarning={watch(
                  `trackAssetLine.${index}.assetCategory.${index2}.attributes.${attribute.indexAtt}.isWarning`
                )}
                isView={isView}
                fieldLength={impactLevelConfigurationBig.length}
              />
            )
          })}
        </Grid>
      </Grid>
      {!isView && (
        <div className='flex justify-center gap-10 py-17'>
          <CoreButton theme='cancel' onClick={handleClose}>
            {t('common:btn.cancel')}
          </CoreButton>
          <CoreButton
            theme='submit'
            type='submit'
            onClick={handleSubmitForm}
          >
            {t('common:btn.config')}
          </CoreButton>
        </div>
      )}
    </Dialog>
  )
}
