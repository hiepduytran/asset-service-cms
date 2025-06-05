import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import CoreInput from '@/components/atoms/CoreInput'
import CoreSwitch from '@/components/atoms/CoreSwitch'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import { TopAction } from '@/components/molecules/TopAction'
import { CoreButton } from '@/components/atoms/CoreButton'
import CoreLoading from '@/components/molecules/CoreLoading'
import PageWithDetail from '@/components/organism/PageWithDetail'
import { MENU_URL } from '@/routes'
import { Grid } from '@mui/material'
import { useRouter } from 'next/router'
import { DialogDeleteProblemCategory } from '../DialogDeleteProblemCategory'
import { useProblemCategorySave } from './useProblemCategorySave'
import { getTitleBreadcrumbs } from '@/helper/getTitleBreadcrumbs'

export default function SaveProblemCategory() {
  const [values, handles] = useProblemCategorySave()
  const router = useRouter()
  const { actionType } = router.query
  const { isLoading, id, isLoadingSubmit, methodForm } = values
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
                pathname: MENU_URL.PROBLEM_CATEGORY,
              },
              {
                title: getTitleBreadcrumbs(t, actionType === 'VIEW', !!id),
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
                pathname: `${MENU_URL.PROBLEM_CATEGORY}/[id]`,
                query: {
                  id,
                },
              })
            }}
            onDeleteAction={() =>
              showDialog(
                <DialogDeleteProblemCategory
                  id={id}
                  backFn={() => {
                    router.push({
                      pathname: MENU_URL.PROBLEM_CATEGORY,
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
                value={watch('code')?.toUpperCase()}
                label={t('label.code')}
                placeholder={t('placeholder.code')}
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
