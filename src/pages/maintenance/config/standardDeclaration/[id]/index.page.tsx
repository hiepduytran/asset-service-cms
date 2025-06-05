import { BasicLayout } from '@/components/layouts/WrapLayout/BasicLayout'
import { Meta } from '@/components/meta'
import StandardDeclarationSave from '@/components/templates/Asset/StandardDeclaration/StandardDeclarationSave'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { TRANSLATE } from '@/routes'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <StandardDeclarationSave />

Page.getLayout = BasicLayout
Page.getMeta = Meta(() => ({ title: 'Standard Declaration Save' }))

export const getServerSideProps = async ({ locale = 'vn' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        TRANSLATE.STANDARD_DECLARATION,
      ])),
    },
  }
}

export default Page
