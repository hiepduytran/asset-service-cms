import FormatSizeIcon from '@mui/icons-material/FormatSize'
import { Slider, Typography } from '@mui/material'
import { useState } from 'react'

const marks = [
  { value: 0.6, label: '60%' },
  { value: 0.7, label: '70%' },
  { value: 0.8, label: '80%' },
  { value: 0.9, label: '90%' },
  { value: 1, label: '100%' },
  { value: 1.1, label: '110%' },
  { value: 1.2, label: '120%' },
  { value: 1.4, label: '140%' },
  { value: 1.3, label: '130%' },
]

function FontSizeEdit() {
  const [fontSize, setFontSize] = useState<number | number[]>(1)

  function changeHtmlFontSize() {
    const html = document.getElementsByTagName('html')[0]
    if (typeof fontSize === 'number') html.style.fontSize = `${fontSize * 100}%`
  }

  return (
    <div>
      <div className='flex gap-4 mt-5 mb-10'>
        <FormatSizeIcon fontSize='small' />
        <Typography mt={0.5}>Kích cỡ chữ</Typography>
      </div>

      <div className='px-15'>
        <Slider
          classes={{ markLabel: 'text-12 font-semibold' }}
          value={fontSize}
          track={false}
          aria-labelledby='discrete-slider-small-steps'
          step={0.1}
          marks={marks}
          min={0.6}
          max={1.4}
          valueLabelDisplay='off'
          onChange={(ev, value) => setFontSize(value)}
          onChangeCommitted={changeHtmlFontSize}
        />
      </div>
    </div>
  )
}

export default FontSizeEdit
