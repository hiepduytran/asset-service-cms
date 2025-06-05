import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import { CoreButton } from '@/components/atoms/CoreButton'
import { CoreDatePicker } from '@/components/atoms/CoreDatePicker'
import CoreInput from '@/components/atoms/CoreInput'
import CoreSwitch from '@/components/atoms/CoreSwitch'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import CoreLoading from '@/components/molecules/CoreLoading'
import { TopAction } from '@/components/molecules/TopAction'
import PageWithDetail from '@/components/organism/PageWithDetail'
import { REGEX } from '@/helper/regex'
import { MENU_URL } from '@/routes'
import { Grid } from '@mui/material'
import { useRouter } from 'next/router'
import { DialogDelete } from '../DialogDelete'
import { useStandardDeclarationSave } from './useStandardDeclarationSave'

export default function SaveStandardDeclaration() {
  const [values, handles] = useStandardDeclarationSave()
  const router = useRouter()
  const { isLoading, isView, isUpdate, id, isLoadingSubmit, methodForm } =
    values
  const { control } = methodForm
  const { t, onSubmit, onCancel } = handles
  const { showDialog } = useDialog()
  return (
    <PageWithDetail
      title={
        <div className='flex justify-between items-center'>
          <CoreBreadcrumbs
            breadcrumbs={[
              {
                title: t('title.maintenance'),
              },
              {
                title: t('title.config'),
              },
              {
                title: t('title.standard_declaration'),
                pathname: MENU_URL.STANDARD_DECLARATION,
              },
              {
                title: `${isView
                  ? t('text.view')
                  : isUpdate
                    ? t('text.edit')
                    : t('text.add')
                  }`,
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
                pathname: `${MENU_URL.STANDARD_DECLARATION}/[id]`,
                query: {
                  id,
                },
              })
            }}
            onDeleteAction={() =>
              showDialog(
                <DialogDelete
                  groupStandardId={id}
                  backFn={() => {
                    router.push({
                      pathname: MENU_URL.STANDARD_DECLARATION,
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
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <CoreInput
                control={control}
                name='code'
                // value={watch('code')?.toUpperCase()}
                label={t('label.code')}
                placeholder={t('placeholder.code')}
                inputProps={{ maxLength: 50 }}
                isViewProp={isView || isUpdate}
                rules={{
                  pattern: {
                    value: REGEX.CODE_NEW,
                    message: t('common:validation.code_new'),
                  },
                }}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={4} lg={4}>
              <CoreInput
                control={control}
                name='name'
                label={t('label.name')}
                placeholder={t('placeholder.name')}
                required
                rules={{
                  required: t('common:validation.required'),
                  validate: {
                    trimRequired: (v: any) => {
                      return (
                        v.trim().length > 0 || t('common:validation.required')
                      )
                    },
                  },
                }}
                inputProps={{
                  maxLength: 250,
                }}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={4} lg={4}>
              <CoreDatePicker
                control={control}
                name='createdDate'
                label={t('label.createdDate')}
                placeholder={`${t('placeholder.createdDate')}`}
                disablePast
                isViewProp={!!id}
              />
            </Grid>

            <Grid item xs={12}>
              <CoreSwitch control={control} name='isActive' />
            </Grid>
          </Grid>

          {!isView && (
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
