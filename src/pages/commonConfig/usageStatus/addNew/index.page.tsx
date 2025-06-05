import { BasicLayout } from '@/components/layouts/WrapLayout/BasicLayout'
import { Meta } from '@/components/meta'
import SaveUsageStatus from '@/components/templates/Asset/UsageStatus/UsageStatusSave'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { TRANSLATE } from '@/routes'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <SaveUsageStatus />

Page.getLayout = BasicLayout
Page.getMeta = Meta(() => ({ title: 'Usage Status Save' }))

export const getServerSideProps = async ({ locale = 'vn' }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale, [
                'common',
                TRANSLATE.USAGE_STATUS,
            ])),
        },
    }
}

export default Page
