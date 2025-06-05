import DefaultImageApp from '@/assets/png/customer.png'
import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import CoreLoading from '@/components/molecules/CoreLoading'
import PageContainer from '@/components/organism/PageContainer'
import { useAppSelector } from '@/redux/hook'
import { MENU_URL } from '@/routes'
import { useQueryGetSystemByUserList } from '@/service/uaa/system/getByUser'
import { DashboardCustomize } from '@mui/icons-material'
import { Box, IconButton, Typography } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const Dashboard = () => {
  const router = useRouter()
  const { isLoading, data: totalListBizz } = useQueryGetSystemByUserList()
  const { domain } = useAppSelector((state) => state.companyConfigData)

  useEffect(() => {
    if (router.pathname === '/') router.push('/dashboard')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <PageContainer
      title={
        <CoreBreadcrumbs
          isShowDashboard={false}
          breadcrumbs={[
            {
              title: (
                <div className='flex gap-4 items-center'>
                  <IconButton>
                    <DashboardCustomize fontSize='small' />
                  </IconButton>
                  <Typography>Trang chủ</Typography>
                </div>
              ),
              pathname: MENU_URL.DASHBOARD,
            },
          ]}
        />
      }
    >
      <div className='flex flex-col gap-10 justify-center items-center mt-10'>
        <Typography variant='h6'>DANH SÁCH SYSTEM</Typography>
        <div className='flex w-full justify-center'>
          {isLoading ? (
            <CoreLoading />
          ) : (
            <Box className='grid xl:grid-cols-7 md:grid-cols-5 sx:grid-cols-2 gap-15 mx-10 my-20 w-auto'>
              {(totalListBizz ? totalListBizz.data : []).map((system) => {
                return (
                  <Link
                    key={system.id}
                    href={`http://${domain}/${system.homepage}`}
                    target='_blank'
                    rel='noopener'
                    style={{
                      textDecoration: 'none',
                      color: 'black',
                    }}
                  >
                    <Box className='flex flex-col items-center cursor-pointer gap-12 justify-center'>
                      <Image
                        width={80}
                        height={80}
                        style={{ objectFit: 'cover', borderRadius: 8 }}
                        src={
                          system.imageUrl &&
                          system.imageUrl.includes('https://')
                            ? system.imageUrl
                            : DefaultImageApp
                        }
                        alt={system?.name}
                      />
                      <Typography className='text-center'>
                        {system?.name}
                      </Typography>
                    </Box>
                  </Link>
                )
              })}
            </Box>
          )}
        </div>
      </div>
    </PageContainer>
  )
}

export default Dashboard
