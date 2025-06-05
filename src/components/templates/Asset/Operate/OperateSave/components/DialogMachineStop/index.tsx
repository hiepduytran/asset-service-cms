import { CoreDialog } from '@/components/organism/CoreDialog'
import { Box, Grid } from '@mui/material'
import CoreInput from '@/components/atoms/CoreInput'
import { CoreButton } from '@/components/atoms/CoreButton'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import { useDialogMachineStop } from './useDialogMachineStop'
import { CoreDateTimePicker } from '@/components/atoms/CoreDateTimePicker'
import { REGEX } from '@/helper/regex'
import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import { getIncidentList } from '@/service/asset/operate/save/incident/getList'

export const DialogMachineStop = (props: any) => {
    const { type, index, methodForm, assetId } = props
    const { hideDialog } = useDialog()
    const [values, handles] = useDialogMachineStop(props)
    const { isLoadingSubmit } = values
    const { t, onSubmit, onCancel } = handles

    const { control, setValue } = methodForm

    return (
        <CoreDialog
            onClose={hideDialog}
            width={900}
            title={t('machineStopForm')}
        >
            <Box className='p-15'>
                <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <CoreInput
                            control={control}
                            name={`machineStop.${index}.code`}
                            label={t('table.machineStopLogCode')}
                            isViewProp={type === 'UPDATE'}
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
                                    setValue(`machineStop.${index}.code`, value.toUpperCase())
                                }
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                        <CoreDateTimePicker
                            control={control}
                            name={`machineStop.${index}.startDate`}
                            label={t('operate_save.label.startDate')}
                            required
                            rules={{
                                required: t('common:validation.required'),
                            }}
                            placeholder='dd/mm/yyyy hh:mm'
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                        <CoreDateTimePicker
                            control={control}
                            name={`machineStop.${index}.endDate`}
                            label={t('operate_save.label.endDate')}
                            placeholder='dd/mm/yyyy hh:mm'
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <CoreAutoCompleteAPI
                            name={`machineStop.${index}.incidentRecoding`}
                            control={control}
                            label={'Sự cố tham chiếu'}
                            placeholder=''
                            fetchDataFn={getIncidentList}
                            params={{
                                isGetAll: false,
                                assetId: assetId ?? 1,
                            }}
                            multiple
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <CoreInput
                            name={`machineStop.${index}.reason`}
                            control={control}
                            label={t('table.machineStopReason')}
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
                <CoreButton theme='cancel' onClick={onCancel}>
                    {t('common:btn.cancel')}
                </CoreButton>
                <CoreButton theme='submit' onClick={onSubmit} loading={isLoadingSubmit}>
                    {t('action.record')}
                </CoreButton>
            </Box>
        </CoreDialog>
    )
}
