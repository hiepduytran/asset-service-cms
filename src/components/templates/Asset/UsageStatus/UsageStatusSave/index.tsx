import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import { CoreButton } from '@/components/atoms/CoreButton'
import CoreInput from '@/components/atoms/CoreInput'
import CoreSwitch from '@/components/atoms/CoreSwitch'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import CoreLoading from '@/components/molecules/CoreLoading'
import { TopAction } from '@/components/molecules/TopAction'
import PageWithDetail from '@/components/organism/PageWithDetail'
import { MENU_URL } from '@/routes'
import { Grid } from '@mui/material'
import { useRouter } from 'next/router'
import { DialogDeleteUsageStatus } from '../DialogDeleteUsageStatus'
import { useUsageStatusSave } from './useUsageStatusSave'
import { getTitleBreadcrumbs } from '@/helper/getTitleBreadcrumbs'
import { REGEX } from '@/helper/regex'

export default function SaveUsageStatus() {
  const [values, handles] = useUsageStatusSave()
  const router = useRouter()
  const { actionType } = router.query
  const { isLoading, isLoadingSubmit, methodForm } = values

  const id = Number(router.query?.id)
  const { control } = methodForm
  const { t, onSubmit, onCancel, watch } = handles
  const { showDialog } = useDialog()
  return (
    <PageWithDetail
      title={
        <div className='flex justify-between items-center'>
          <CoreBreadcrumbs
            breadcrumbs={[
              {
                title: t('title'),
                pathname: MENU_URL.USAGE_STATUS,
              },
              {
                title: getTitleBreadcrumbs(t, false, !!id),
              },
            ]}
          />
        </div>
      }
      topAction={
        !!id && (
          <TopAction
            actionList={['edit', 'delete']}
            onEditAction={() => {
              router.replace({
                pathname: `${MENU_URL.USAGE_STATUS}/[id]`,
                query: {
                  id,
                },
              })
            }}
            onDeleteAction={() =>
              showDialog(
                <DialogDeleteUsageStatus
                  id={Number(id)}
                  backFn={() => {
                    router.push({
                      pathname: MENU_URL.USAGE_STATUS,
                    })
                  }}
                />
              )
            }
          />
        )
      }
    >
      {isLoading ? (
        <CoreLoading />
      ) : (
        <form
          className='block bg-[#ffffff] rounded-xl mt-10'
          onSubmit={onSubmit}
        >
          <Grid container spacing={{ xs: 1, sm: 2, md: 3, lg: 4 }}>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <CoreInput
                control={control}
                name='code'
                label={t('label.code')}
                placeholder={t('placeholder.code')}
                rules={{
                  pattern: {
                    value: REGEX.CODE_NEW,
                    message: t('common:validation.code_new'),
                  },
                }}
                value={watch('code')?.toUpperCase()}
                inputProps={{ maxLength: 50 }}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={6}>
              <CoreInput
                control={control}
                name='name'
                label={t('label.name')}
                placeholder={t('placeholder.name')}
                required
                inputProps={{
                  maxLength: 250,
                }}
                rules={{ required: t('common:validation.required') }}
              />
            </Grid>

            <Grid item xs={12}>
              <CoreSwitch control={control} name='isActive' />
            </Grid>
          </Grid>

          {actionType !== 'VIEW' && (
            <div className='space-x-12 text-center mt-15'>
              <CoreButton theme='cancel' onClick={onCancel}>
                {t('common:btn.cancel')}
              </CoreButton>
              <CoreButton
                theme='submit'
                type='submit'
                loading={isLoadingSubmit}
              >
                {id ? t('common:btn.save_change') : t('common:btn.add')}
              </CoreButton>
            </div>
          )}
        </form>
      )}
    </PageWithDetail>
  )
}
