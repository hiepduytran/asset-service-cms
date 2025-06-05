import { CoreDialog } from '@/components/organism/CoreDialog'
import { Grid } from '@mui/material'
import CoreInput from '@/components/atoms/CoreInput'
import { useDialogIncidentDetail } from './useDialogIncidentDetail'
import { useDialog2 } from '@/components/hooks/dialog/useDialog'

export const DialogIncidentDetail = (props: any) => {
    const { methodForm, incidentCode, incidentName, location, severityLevel, reason } = props
    const { hideDialog2 } = useDialog2()
    const [values, handles] = useDialogIncidentDetail()
    const { control } = methodForm
    const { } = values
    const { t } = handles

    return (
        <CoreDialog
            onClose={hideDialog2}
            width={900}
            title={t('viewIncidentDetails')}
        >
            <div className='p-15'>
                <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <CoreInput
                            control={control}
                            name=''
                            label={t('table.incidentCode')}
                            value={incidentCode}
                            isViewProp
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <CoreInput
                            control={control}
                            name=''
                            label={t('table.incidentName')}
                            value={incidentName}
                            isViewProp
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <CoreInput
                            control={control}
                            name=''
                            label={t('table.location')}
                            value={location}
                            isViewProp
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <CoreInput
                            control={control}
                            name=''
                            label={t('table.severityLevel')}
                            value={severityLevel}
                            isViewProp
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <CoreInput
                            control={control}
                            name=''
                            label={t('table.reason')}
                            value={reason}
                            isViewProp
                            multiline
                        />
                    </Grid>
                </Grid>
            </div>
        </CoreDialog>
    )
}
