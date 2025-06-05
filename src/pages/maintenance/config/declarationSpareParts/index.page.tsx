import { BasicLayout } from '@/components/layouts/WrapLayout/BasicLayout'
import { Meta } from '@/components/meta'
import DeclarationSparePartsList from '@/components/templates/Asset/DeclarationSpareParts/DeclarationSparePartsList'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { TRANSLATE } from '@/routes'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <DeclarationSparePartsList />

Page.getLayout = BasicLayout
Page.getMeta = Meta(() => ({ title: 'Declaration Spare Parts List' }))

export const getServerSideProps = async ({ locale = 'vn' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        TRANSLATE.DECLARATION_SPARE_PARTS,
      ])),
    },
  }
}

export default Page
