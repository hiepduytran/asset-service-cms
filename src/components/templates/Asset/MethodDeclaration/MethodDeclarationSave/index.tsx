import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import { CoreButton } from '@/components/atoms/CoreButton'
import CoreInput from '@/components/atoms/CoreInput'
import CoreSwitch from '@/components/atoms/CoreSwitch'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import CoreLoading from '@/components/molecules/CoreLoading'
import { TopAction } from '@/components/molecules/TopAction'
import PageWithDetail from '@/components/organism/PageWithDetail'
import { REGEX } from '@/helper/regex'
import { MENU_URL } from '@/routes'
import { getListProductCategory } from '@/service/product/getListProductCategory'
import { getGroupStandardList } from '@/service/asset/standardDeclaration/getList'
import { Grid } from '@mui/material'
import { useRouter } from 'next/router'
import { DialogDelete } from '../DialogDelete'
import { useMethodDeclarationSave } from './useMethodDeclarationSave'

export default function SaveMethodDeclaration() {
  const [values, handles] = useMethodDeclarationSave()
  const router = useRouter()
  const { isLoading, isView, isUpdate, id, isLoadingSubmit, methodForm } =
    values
  const { control } = methodForm
  const { t, onSubmit, onCancel, refetch } = handles
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
                title: t('title.method_declaration'),
                pathname: MENU_URL.METHOD_DECLARATION,
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
                pathname: `${MENU_URL.METHOD_DECLARATION}/[id]`,
                query: {
                  id,
                },
              })
            }}
            onDeleteAction={() =>
              showDialog(
                <DialogDelete
                  id={id}
                  backFn={() => {
                    router.push({
                      pathname: MENU_URL.METHOD_DECLARATION,
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
                label={t('placeholder.name')}
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
              <CoreAutoCompleteAPI
                control={control}
                name='groupStandard'
                label={t('table.standardGroup')}
                placeholder={t('placeholder.groupStandard')}
                fetchDataFn={getGroupStandardList}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={4} lg={4}>
              <CoreAutoCompleteAPI
                control={control}
                name='product'
                label={t('table.tool')}
                placeholder={t('placeholder.product')}
                fetchDataFn={getListProductCategory}
                params={{
                  defaultType: 'DMCCDC',
                }}
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
