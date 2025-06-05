import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import { CoreButton } from '@/components/atoms/CoreButton'
import CoreInput from '@/components/atoms/CoreInput'
import PageContainer from '@/components/organism/PageContainer'
import { MENU_URL } from '@/routes'
import { Grid } from '@mui/material'
import { FormProvider } from 'react-hook-form'
import TableJobDeclaration from './components/Table'
import useJobDeclaration from './useJobDeclaration'

export default function JobDeclaration() {
  const [
    { methods, router, queryPage },
    { t, onSubmit, onReset, onChangePageSize },
  ] = useJobDeclaration()
  const { control } = methods
  return (
    <PageContainer
      title={
        <CoreBreadcrumbs
          breadcrumbs={[
            {
              title: t('title'),
              pathname: MENU_URL.INCIDENT_LOG_LIST,
            },
          ]}
        />
      }
    >
      <FormProvider {...methods}>
        <form className='flex flex-col' onSubmit={onSubmit}>
          <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={12} sm={12} md={4}>
              <CoreInput
                name='search'
                control={control}
                label={t('common:form.search.label')}
                placeholder={t('common:form.search.placeholder')}
              />
            </Grid>
            <div className='flex justify-center items-end mt-10 ml-10 gap-10'>
              <CoreButton theme='reset' onClick={onReset}>
                Reset
              </CoreButton>
              <CoreButton theme='submit' type='submit'>
                {t('common:btn.search')}
              </CoreButton>
            </div>
          </Grid>
          <div className='flex justify-end mt-10 mb-4'>
            <CoreButton
              onClick={() => router.push(`${MENU_URL.JOB_DECLARATION}/addNew`)}
            >
              {t('common:btn.add')}
            </CoreButton>
          </div>
          <TableJobDeclaration
            queryPage={queryPage}
            onChangePageSize={onChangePageSize}
          />
        </form>
      </FormProvider>
    </PageContainer>
  )
}
