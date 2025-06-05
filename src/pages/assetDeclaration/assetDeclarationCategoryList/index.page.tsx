import { BasicLayout } from '@/components/layouts/WrapLayout/BasicLayout'
import { Meta } from '@/components/meta'
import AssetDeclarationCategoryList from '@/components/templates/Asset/AssetDeclarationCategoryList'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { TRANSLATE } from '@/routes'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <AssetDeclarationCategoryList />

Page.getLayout = BasicLayout
Page.getMeta = Meta(() => ({ title: 'Asset Declaration Category List' }))

export const getServerSideProps = async ({ locale = 'vn' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        TRANSLATE.ASSET_DECLARATION_CATEGORY_LIST,
      ])),
    },
  }
}

export default Page
