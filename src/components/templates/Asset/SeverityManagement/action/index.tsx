import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
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
import DialogSeverityManagement from '../dialog'
import useSeverityManagementAction from './useSeverityManagementAction'

export default function SeverityManagementAction() {
  const [
    {
      methods,
      isView,
      isUpdate,
      router,
      id,
      isLoading,
      isLoadingGetSeverityManagement,
    },
    { t, showDialog, onSubmit, onCancel },
  ] = useSeverityManagementAction()
  const { control, getValues, watch } = methods
  return (
    <PageContainer
      title={
        <CoreBreadcrumbs
          breadcrumbs={[
            {
              title: t('title'),
              pathname: `${MENU_URL.SEVERITY_MANAGEMENT}`,
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
            content: isLoadingGetSeverityManagement ? (
              <CoreLoading />
            ) : (
              <form onSubmit={onSubmit}>
                <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
                  <Grid item xs={12} sm={12} md={4}>
                    <CoreInput
                      control={control}
                      name='code'
                      label={t('label.code')}
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
                  <Grid item xs={12} sm={12} md={4}>
                    <CoreInput
                      control={control}
                      name='name'
                      label={t('label.name')}
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
                      isViewProp={isUpdate}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4}>
                    <CoreAutocomplete
                      control={control}
                      name='level'
                      label={t('Level')}
                      rules={{
                        required: t('common:validation.required'),
                      }}
                      required
                      options={[
                        { label: 1, value: 1 },
                        { label: 2, value: 2 },
                        { label: 3, value: 3 },
                        { label: 4, value: 4 },
                        { label: 5, value: 5 },
                        { label: 6, value: 6 },
                        { label: 7, value: 7 },
                      ]}
                      isViewProp={isView || getValues('isDefault')}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <CoreInput
                      control={control}
                      name='note'
                      label={t('label.note')}
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
                      label={`${t('label.isActive')}`}
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
            rightAction: !isLoadingGetSeverityManagement && (
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
                    toastError(`${t('text.errorRemove')}`)
                  } else {
                    showDialog(<DialogSeverityManagement />)
                  }
                }}
                onEditAction={() => {
                  if (getValues('isUsed')) {
                    toastError(`${t('text.errorEdit')}`)
                  } else {
                    router.push({
                      pathname: `${MENU_URL.SEVERITY_MANAGEMENT}/[id]`,
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
