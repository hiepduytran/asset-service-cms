import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import { CoreButton } from '@/components/atoms/CoreButton'
import CoreInput from '@/components/atoms/CoreInput'
import { CoreDialog } from '@/components/organism/CoreDialog'
import { getListAssetAccessoryId } from '@/service/asset/IncidentLogList/dialog'
import { getListSeverityManagementHigher } from '@/service/asset/severityManagement/list'
import { Grid } from '@mui/material'
import useDialogReviewAgain from './useDialogReviewAgain'
type Props = {
  prop: {
    data: any
    length: number
    refetchDetailIncidentApprove: any
    productId: number
  }
}
const DialogReviewAgain = (props: Props) => {
  const {
    prop: { data, length, refetchDetailIncidentApprove, productId },
  } = props
  const [{ methods, isLoading }, { t, hideDialog, onSubmit }] =
    useDialogReviewAgain({
      data,
      length,
      refetchDetailIncidentApprove,
    })
  const { control, setValue } = methods
  return (
    <CoreDialog
      title={`${t('Đánh giá lại sự cố')}`.toUpperCase()}
      onClose={hideDialog}
      width={800}
    >
      <form className='p-20'>
        <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12}>
            <CoreInput
              name='code'
              control={control}
              label={t('Mã Sự cố ')}
              isViewProp
            />
          </Grid>
          <Grid item xs={12}>
            <CoreInput
              name='name'
              control={control}
              label={t('Tên Sự cố ')}
              required
              rules={{
                required: t('common:validation.required'),
              }}
              isViewProp={false}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <CoreAutoCompleteAPI
              name='incidentLocation'
              control={control}
              label={t('Vị trí')}
              placeholder={`${t('Chọn vị trí')}`}
              parentPath='product'
              required
              rules={{
                required: t('common:validation.required'),
              }}
              fetchDataFn={getListAssetAccessoryId}
              params={{
                productId: productId,
              }}
              onChangeValue={(val) => {
                if (val) {
                  setValue('incidentLocation', val?.product)
                } else {
                  setValue('incidentLocation', null)
                }
              }}
              isViewProp
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <CoreAutoCompleteAPI
              name='severityManagement'
              control={control}
              label={t('Mức độ nghiêm trọng')}
              placeholder={t('Chọn mức độ nghiêm trọng')}
              required
              rules={{
                required: t('common:validation.required'),
              }}
              fetchDataFn={getListSeverityManagementHigher}
              params={{
                managementType: 'SEVERITY_MANAGEMENT',
              }}
              isViewProp={false}
            />
          </Grid>
          <Grid item xs={12}>
            <CoreInput
              name='reason'
              control={control}
              label={t('Lý do')}
              multiline
              inputProps={{
                maxLength: 1000,
              }}
              isViewProp={false}
            />
          </Grid>
        </Grid>

        <div className='flex justify-center gap-10 mt-20'>
          <CoreButton theme='cancel' onClick={hideDialog}>
            {t('common:btn.cancel')}
          </CoreButton>
          <CoreButton theme='submit' onClick={onSubmit} loading={isLoading}>
            {t('Đánh giá lại')}
          </CoreButton>
        </div>
      </form>
    </CoreDialog>
  )
}

export default DialogReviewAgain
