import { PRIMARY, WHITE } from '@/helper/colors'
import { Box, Divider, Typography } from '@mui/material'
import React from 'react'

interface Props {
  step: number
  onChange: (val: number) => void
  stepList: string[]
}

const CustomStep = (props: Props) => {
  const { onChange, step, stepList } = props

  const renderStep = () => {
    return stepList.map((stepName, index) => {
      return (
        <React.Fragment key={'key' + index}>
          <Box className='flex flex-col items-center'>
            <div className='flex justify-center items-center'>
              <Box
                className='flex items-center justify-center mb-2'
                sx={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '16px',
                  backgroundColor: step >= index ? PRIMARY : '#A7A7A7',
                  cursor: 'pointer',
                  ':hover': {
                    opacity: 0.5,
                  },
                }}
                onClick={() => onChange(index)}
              >
                <Typography variant='body1' sx={{ color: WHITE }}>
                  {index + 1}
                </Typography>
              </Box>
              <Typography
                variant='body2'
                sx={{
                  color: step >= index ? PRIMARY : '#A7A7A7',
                  marginLeft: '12px',
                }}
              >
                {stepName}
              </Typography>
            </div>
          </Box>
          {index + 1 < stepList.length && (
            <Divider style={{ width: '40px', margin: '0px 15px 2px 15px' }} />
          )}
        </React.Fragment>
      )
    })
  }

  return <Box className='flex items-center w-full'>{renderStep()}</Box>
}

export default CustomStep
