import { layoutType } from '@/components/layouts/MultipleLayouts/layoutTypeRecoil'
import { useLayoutDirection } from '@/components/layouts/RTL/context'
import { BLACK, PRIMARY } from '@/helper/colors'
import BorderInnerIcon from '@mui/icons-material/BorderInner'
import DoneIcon from '@mui/icons-material/Done'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import SettingsIcon from '@mui/icons-material/Settings'
import SevereColdIcon from '@mui/icons-material/SevereCold'
import { Menu, Radio, Typography } from '@mui/material'
import { useState } from 'react'
import { useRecoilState } from 'recoil'
import FontSizeEdit from './FontSizeEdit'
import Layout1Icon from './Icon/Layout1Icon'
import Layout2Icon from './Icon/Layout2Icon'

export const Setting = () => {
  const [anchorEl, setAnchorEl] = useState(null)

  const [layout, setLayout] = useRecoilState(layoutType)
  const { isRTL, toggleLayoutDirection } = useLayoutDirection()

  return (
    <>
      <div
        className='flex items-center justify-between cursor-pointer group px-8'
        onClick={(e: any) => setAnchorEl(e.currentTarget)}
      >
        <div className='flex gap-4 items-center'>
          <SettingsIcon
            fontSize='small'
            className='group-hover:text-[#0078D4]'
          />
          <Typography variant='body2' className='group-hover:text-[#0078D4]'>
            Cài đặt
          </Typography>
        </div>
        <KeyboardArrowRightIcon
          fontSize='small'
          className='group-hover:text-[#0078D4]'
        />
      </div>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => {
          setAnchorEl(null)
        }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        classes={{
          root: '-ml-3',
        }}
      >
        <div className='p-10 w-200 h-220 flex flex-col'>
          <FontSizeEdit />

          <div className='flex flex-col gap-4 mt-10'>
            <div className='flex gap-4'>
              <BorderInnerIcon fontSize='small' />
              <Typography mt={0.5}>Cấu trúc</Typography>
            </div>

            <div className='flex flex-col px-5'>
              <div
                className='flex gap-3 items-center cursor-pointer'
                onClick={() => toggleLayoutDirection(false)}
              >
                <Radio
                  checked={!isRTL}
                  value={'Từ phải sang trái'}
                  name='radio-buttons'
                  inputProps={{ 'aria-label': 'A' }}
                  onClick={() => toggleLayoutDirection(false)}
                />
                <Typography>Từ phải sang trái</Typography>
              </div>

              <div
                className='flex gap-3 items-center cursor-pointer'
                onClick={() => toggleLayoutDirection(true)}
              >
                <Radio
                  checked={isRTL}
                  value={'Từ phải sang trái'}
                  name='radio-buttons'
                  inputProps={{ 'aria-label': 'A' }}
                  onClick={() => toggleLayoutDirection(true)}
                />
                <Typography>Từ trái sang phải</Typography>
              </div>
            </div>
          </div>

          <div className='flex flex-col gap-4 mt-10'>
            <div className='flex gap-4'>
              <SevereColdIcon fontSize='small' />
              <Typography mt={0.5}>Layouts</Typography>
            </div>

            <div className='flex justify-between px-5 pt-2'>
              {['Layout1', 'Layout2'].map((ele: any, index) => {
                return (
                  <div
                    key={ele}
                    className='flex flex-col gap-2 justify-center items-center cursor-pointer'
                    onClick={() => {
                      setLayout(ele)
                    }}
                  >
                    {ele === 'Layout1' ? <Layout1Icon /> : <Layout2Icon />}

                    <div className='flex flex-row gap-2 items-center'>
                      <Typography
                        sx={{
                          color: layout === ele ? PRIMARY : BLACK,
                        }}
                      >
                        {ele}
                      </Typography>

                      <div className='h-12 w-5'>
                        {layout === ele ? (
                          <DoneIcon
                            color='primary'
                            style={{
                              marginTop: 2,
                              width: 10,
                            }}
                          />
                        ) : null}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </Menu>
    </>
  )
}
