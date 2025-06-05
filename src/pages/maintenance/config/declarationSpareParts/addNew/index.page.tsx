import { BasicLayout } from '@/components/layouts/WrapLayout/BasicLayout'
import { Meta } from '@/components/meta'
import DeclarationSparePartsSave from '@/components/templates/Asset/DeclarationSpareParts/DeclarationSparePartsSave'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { TRANSLATE } from '@/routes'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <DeclarationSparePartsSave />

Page.getLayout = BasicLayout
Page.getMeta = Meta(() => ({ title: 'Declaration Spare Parts Save' }))

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
