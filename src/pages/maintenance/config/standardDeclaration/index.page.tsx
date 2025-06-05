import { BasicLayout } from '@/components/layouts/WrapLayout/BasicLayout'
import { Meta } from '@/components/meta'
import StandardDeclarationList from '@/components/templates/Asset/StandardDeclaration/StandardDeclarationList'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { TRANSLATE } from '@/routes'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <StandardDeclarationList />

Page.getLayout = BasicLayout
Page.getMeta = Meta(() => ({ title: 'Standard Declaration List' }))

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
