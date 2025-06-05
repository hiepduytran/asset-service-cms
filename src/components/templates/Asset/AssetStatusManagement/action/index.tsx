import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import { CoreButton } from '@/components/atoms/CoreButton'
import CoreInput from '@/components/atoms/CoreInput'
import CoreSwitch from '@/components/atoms/CoreSwitch'
import CoreLoading from '@/components/molecules/CoreLoading'
import { TopAction } from '@/components/molecules/TopAction'
import CoreNavbar from '@/components/organism/CoreNavbar'
import PageContainer from '@/components/organism/PageContainer'
import { getTitleBreadcrumbs } from '@/helper/getTitleBreadcrumbs'
import { REGEX } from '@/helper/regex'
import { MENU_URL } from '@/routes'
import { toastError } from '@/toast'
import { Grid } from '@mui/material'
import DialogAssetStatusManagement from '../dialog'
import useAssetStatusManagementAction from './useAssetStatusManagementAction'

export default function AssetStatusManagementAction() {
  const [
    {
      methods,
      isView,
      isUpdate,
      router,
      id,
      isLoading,
      isLoadingGetAssetStatusManagement,
    },
    { t, showDialog, onSubmit, onCancel },
  ] = useAssetStatusManagementAction()
  const { control, getValues, watch } = methods
  return (
    <PageContainer
      title={
        <CoreBreadcrumbs
          breadcrumbs={[
            {
              title: t('title'),
              pathname: `${MENU_URL.ASSET_STATUS_MANAGEMENT}`,
            },
            {
              title: getTitleBreadcrumbs(t, isView, isUpdate),
            },
          ]}
        />
      }
    >
      <CoreNavbar
        breadcrumbs={[
          {
            title: t('common:detail'),
            content: isLoadingGetAssetStatusManagement ? (
              <CoreLoading />
            ) : (
              <form onSubmit={onSubmit}>
                <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
                  <Grid item xs={12} sm={12} md={6}>
                    <CoreInput
                      control={control}
                      name='code'
                      label={t('Mã tình trạng')}
                      inputProps={{
                        maxLength: 50,
                      }}
                      isViewProp={isUpdate}
                      rules={{
                        pattern: {
                          value: REGEX.CODE_NEW,
                          message: t('common:validation.code_new_2'),
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <CoreInput
                      control={control}
                      name='name'
                      label={t('Tên tình trạng')}
                      rules={{
                        required: t('common:validation.required'),
                        validate: {
                          trim: (value: any) => {
                            if (!value.trim()) {
                              return t('common:validation.required')
                            }
                          },
                        },
                      }}
                      required
                      inputProps={{
                        maxLength: 250,
                      }}
                      isViewProp={isView || getValues('isDefault')}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <CoreInput
                      control={control}
                      name='note'
                      label={t('Ghi chú')}
                      multiline
                      inputProps={{
                        maxLength: 1000,
                      }}
                      isViewProp={isView || getValues('isDefault')}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <CoreSwitch
                      control={control}
                      name='isActive'
                      label={`${t('Trạng thái')}`}
                    />
                  </Grid>
                </Grid>
                {!isView && (
                  <div className='flex gap-10 justify-center mt-20'>
                    <CoreButton theme='cancel' onClick={onCancel}>
                      {t('common:btn.destroy')}
                    </CoreButton>
                    <CoreButton
                      theme='submit'
                      type='submit'
                      loading={isLoading}
                    >
                      {isUpdate ? t('common:btn.save') : t('common:btn.add')}
                    </CoreButton>
                  </div>
                )}
              </form>
            ),
            rightAction: !isLoadingGetAssetStatusManagement && (
              <TopAction
                actionList={
                  isView
                    ? watch('isDefault')
                      ? ['edit']
                      : ['edit', 'delete']
                    : isUpdate
                    ? ['delete']
                    : []
                }
                onDeleteAction={() => {
                  if (getValues('isUsed')) {
                    toastError(' Bản ghi này đang được sử dụng không thể xóa !')
                  } else {
                    showDialog(<DialogAssetStatusManagement />)
                  }
                }}
                onEditAction={() => {
                  if (getValues('isUsed')) {
                    toastError(
                      ' Bản ghi này đang được sử dụng không thể chỉnh sửa !'
                    )
                  } else {
                    router.push({
                      pathname: `${MENU_URL.ASSET_STATUS_MANAGEMENT}/[id]`,
                      query: { id },
                    })
                  }
                }}
              />
            ),
          },
        ]}
      />
    </PageContainer>
  )
}
