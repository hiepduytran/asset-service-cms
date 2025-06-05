import { logoutAccount } from '@/config/axios'
import { getCmsToken, setCmsToken } from '@/config/token'
import { WHITE } from '@/helper/colors'
import { useAppDispatch, useAppSelector } from '@/redux/hook'
import { setOrgConfig } from '@/redux/reducer/orgReducer'
import { MENU_URL } from '@/routes'
import { postRefreshToken } from '@/service/auth/refreshToken'
import { useQueryGetOrgAllByUser } from '@/service/resource/org/getAllByUser'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { IconButton, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { MenuCustom } from '../../MenuCustom'
import { toastError } from '@/toast'

export const Org = () => {
  const [anchorEl, setAnchorEl] = useState<any>(null)
  const router = useRouter()
  const dispatch = useAppDispatch()

  const { name: orgName } = useAppSelector((state) => state.orgData)

  const handleChangeOrg = async (id: number, name: string) => {
    const tokenAccess = getCmsToken()
    if (tokenAccess && tokenAccess?.refreshToken) {
      try {
        const res = await postRefreshToken(tokenAccess?.refreshToken, id)
        if (res?.data?.accessToken) {
          setCmsToken(res.data)
          dispatch(
            setOrgConfig({
              id,
              name,
            })
          )
          setAnchorEl(null)
          router.push({ pathname: MENU_URL.DASHBOARD })
        }
      } catch (error: any) {
        toastError(error)
        logoutAccount()
      }
    }
  }
  const { data: orgList, isError } = useQueryGetOrgAllByUser({
    activated: true,
  })

  if (isError || (orgList && orgList.data.length === 0)) {
    router.push('/500')
  }

  return (
    <>
      <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
        <div className='flex gap-3 items-center text-white'>
          <Typography variant='body1' style={{ color: WHITE }}>
            {orgName}
          </Typography>
          <KeyboardArrowDownIcon fontSize='small' />
        </div>
      </IconButton>

      <MenuCustom
        classes={{
          root: 'mt-4',
          paper: 'w-106',
        }}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        itemList={orgList ? orgList.data : []}
        onItemAction={(item) => {
          handleChangeOrg(item.id, item.name)
        }}
        currentValue={orgName}
      />
    </>
  )
}
