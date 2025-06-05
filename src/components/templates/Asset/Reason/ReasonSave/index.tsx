import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import { CoreButton } from '@/components/atoms/CoreButton'
import CoreCheckbox from '@/components/atoms/CoreCheckbox'
import CoreInput from '@/components/atoms/CoreInput'
import CoreSwitch from '@/components/atoms/CoreSwitch'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import { Action } from '@/components/molecules/Action'
import CoreLoading from '@/components/molecules/CoreLoading'
import { TopAction } from '@/components/molecules/TopAction'
import PageWithDetail from '@/components/organism/PageWithDetail'
import { getTitleBreadcrumbs } from '@/helper/getTitleBreadcrumbs'
import { REGEX } from '@/helper/regex'
import { MENU_URL } from '@/routes'
import { getFeatureList } from '@/service/uaa/feature/get'
import { getSystemList } from '@/service/uaa/system/getList'
import { Grid } from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'
import { DialogDelete } from '../DialogDelete'
import { useReasonSave } from './useReasonSave'

export default function ReasonSave() {
  const [values, handles] = useReasonSave()
  const router = useRouter()
  const {
    isLoading,
    isView,
    isUpdate,
    id,
    isLoadingSubmit,
    methodForm,
    fields,
  } = values
  const { control, watch } = methodForm
  const { t, onSubmit, onCancel, append, remove } = handles
  const { showDialog } = useDialog()
  return (
    <PageWithDetail
      title={
        <div className='flex justify-between items-center'>
          <CoreBreadcrumbs
            breadcrumbs={[
              {
                title: t('title'),
                pathname: MENU_URL.REASON,
              },
              {
                title: getTitleBreadcrumbs(t, isView, isUpdate),
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
                pathname: `${MENU_URL.REASON}/[id]`,
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
                      pathname: MENU_URL.REASON,
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
                label={t('table.code')}
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
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <CoreInput
                control={control}
                name='name'
                label={t('table.name')}
                required
                rules={{
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
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <CoreCheckbox
                control={control}
                name='isForeign'
                label={t('bondage')}
              />
            </Grid>
            {watch('isForeign') &&
              fields.map((field, index) => (
                <React.Fragment key={field.key}>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <CoreAutoCompleteAPI
                      control={control}
                      name={`reasonLine.${index}.system`}
                      label={t('table.system')}
                      fetchDataFn={getSystemList}
                      placeholder=''
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={5} lg={5}>
                    <CoreAutoCompleteAPI
                      control={control}
                      name={`reasonLine.${index}.features`}
                      label={t('table.features')}
                      fetchDataFn={getFeatureList}
                      params={{
                        systemId: watch(`reasonLine.${index}.system`)?.id,
                      }}
                      placeholder=''
                      multiple
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={1} lg={1}>
                    <Action
                      actionList={
                        fields.length === 1 ? ['append'] : ['append', 'remove']
                      }
                      onAppendAction={() => {
                        append({
                          system: null,
                          features: [],
                        })
                      }}
                      onRemoveAction={() => {
                        remove(index)
                      }}
                    />
                  </Grid>
                </React.Fragment>
              ))}
            <Grid item xs={12} sm={12} md={12} lg={12}>
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
