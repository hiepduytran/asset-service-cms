import { CoreDialog } from '@/components/organism/CoreDialog'
import { Box, Grid } from '@mui/material'
import CoreInput from '@/components/atoms/CoreInput'
import { CoreButton } from '@/components/atoms/CoreButton'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import { useDialogIncident } from './useDialogIncident'
import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import { getAccessoryByProductId } from '@/service/asset/assetPeriod/save/getAccessoryByProductId'
import { getListSeverityManagementFilter } from '@/service/asset/operate/save/getListSeverityManagement'
import AutoCompleteAPICustom from './AutoCompleteAPICustom'
import { REGEX } from '@/helper/regex'

export const DialogIncident = (props: any) => {
    const { type, index, methodForm, productId, dataAll } = props
    const { hideDialog } = useDialog()
    const [values, handles] = useDialogIncident(props)
    const { isLoadingSubmit } = values
    const { t, onSubmit, onCancel } = handles
    const { control, watch, setValue } = methodForm

    return (
        <CoreDialog
            onClose={hideDialog}
            width={900}
            title={
                type === 'REVIEW_AGAIN'
                    ? t('reassessIncident')
                    : type === 'CREATE_NEW'
                        ? t('recordNewIncident')
                        : type === 'REVIEW_EDIT'
                            ? t('editReassess')
                            : t('editIncidentRecord')
            }
        >
            <Box className='p-15'>
                <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <CoreInput
                            control={control}
                            name={`incident.${index}.code`}
                            label={t('table.incidentCode')}
                            isViewProp={type !== 'CREATE_NEW'}
                            rules={{
                                pattern: {
                                    value: REGEX.CODE_NEW,
                                    message: t('common:validation.code_new'),
                                },
                            }}
                            inputProps={{
                                maxLength: 50,
                            }}
                            onChangeValue={(value) => {
                                if (value) {
                                    setValue(`incident.${index}.code`, value.toUpperCase())
                                }
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <CoreInput
                            control={control}
                            name={`incident.${index}.name`}
                            label={t('table.incidentName')}
                            required
                            rules={{
                                required: t('common:validation.required'),
                            }}
                            inputProps={{
                                maxLength: 250,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                        <AutoCompleteAPICustom
                            control={control}
                            name={`incident.${index}.incidentLocation`}
                            label={t('table.location')}
                            placeholder=''
                            fetchDataFn={getAccessoryByProductId}
                            params={{
                                productId: productId,
                                notIds: dataAll?.map((item: any) => item?.incidentLocation?.id),
                            }}
                            required
                            rules={{
                                required: t('common:validation.required'),
                            }}
                            isViewProp={type === 'REVIEW_AGAIN' || type === 'REVIEW_EDIT'}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                        <CoreAutoCompleteAPI
                            control={control}
                            name={`incident.${index}.severityManagement`}
                            label={t('table.severityLevel')}
                            placeholder=''
                            fetchDataFn={getListSeverityManagementFilter}
                            params={{
                                levelId: watch(`incident.${index}.severityManagement`)?.id
                            }}
                            required
                            rules={{
                                required: t('common:validation.required'),
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <CoreInput
                            name={`incident.${index}.reason`}
                            control={control}
                            label={t('table.reason')}
                            multiline
                            required
                            rules={{
                                required: t('common:validation.required'),
                            }}
                            inputProps={{
                                maxLength: 1000,
                            }}
                        />
                    </Grid>
                </Grid>
            </Box>
            <Box className='flex justify-center gap-10 py-10'>
                <CoreButton theme='cancel' onClick={() => {
                    onCancel('cancel')
                }}>
                    {t('common:btn.cancel')}
                </CoreButton>
                {(type === 'REVIEW_EDIT' || type === 'EDIT_NEW') &&
                    (<CoreButton theme='delete' onClick={() => {
                        onCancel('delete')
                    }}>
                        {t('common:btn.delete')}
                    </CoreButton>)}
                <CoreButton theme='submit' onClick={onSubmit} loading={isLoadingSubmit}>
                    {
                        type === 'REVIEW_AGAIN'
                            ? t('action.reassess')
                            : type === 'CREATE_NEW'
                                ? t('recordIncident')
                                : t('common:btn.save_change')
                    }
                </CoreButton>
            </Box>
        </CoreDialog>
    )
}
