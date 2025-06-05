import { memo } from 'react'

const Layout1Icon = ({
  className,
  onClick,
}: {
  className?: string
  onClick?: any
}) => {
  return (
    <div className={className}>
      <svg
        width='157'
        height='94'
        viewBox='0 0 157 94'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <rect
          x='0.5'
          y='0.5'
          width='156'
          height='93'
          rx='3.5'
          fill='white'
          stroke='#DFE0EB'
        />
        <rect x='34' y='15' width='122' height='64' fill='#FFEAEB' />
        <path
          d='M1 4C1 2.34315 2.34315 1 4 1H33V93H4C2.34315 93 1 91.6569 1 90V4Z'
          fill='white'
        />
        <rect x='7' y='13' width='20' height='4' rx='2' fill='#DFE0EB' />
        <rect x='7' y='19' width='20' height='4' rx='2' fill='#DFE0EB' />
        <rect x='7' y='25' width='20' height='4' rx='2' fill='#DFE0EB' />
        <rect x='7' y='31' width='20' height='4' rx='2' fill='#DFE0EB' />
        <rect x='7' y='37' width='20' height='4' rx='2' fill='#DFE0EB' />
        <rect x='33' y='1' width='1' height='92' fill='#DFE0EB' />
        <rect
          x='34'
          y='15'
          width='1'
          height='122'
          transform='rotate(-90 34 15)'
          fill='#DFE0EB'
        />
        <path d='M34 1H153C154.657 1 156 2.34315 156 4V14H34V1Z' fill='white' />
        <circle cx='132.5' cy='7.5' r='1.5' fill='#DFE0EB' />
        <circle cx='140.5' cy='7.5' r='1.5' fill='#DFE0EB' />
        <circle cx='148.5' cy='7.5' r='1.5' fill='#DFE0EB' />
        <path
          d='M34 80H156V90C156 91.6569 154.657 93 153 93H34V80Z'
          fill='white'
        />
        <circle cx='41.5' cy='86.5' r='1.5' fill='#DFE0EB' />
        <circle cx='49.5' cy='86.5' r='1.5' fill='#DFE0EB' />
        <circle cx='57.5' cy='86.5' r='1.5' fill='#DFE0EB' />
        <rect
          x='34'
          y='80'
          width='1'
          height='122'
          transform='rotate(-90 34 80)'
          fill='#DFE0EB'
        />
      </svg>
    </div>
  )
}

export default memo(Layout1Icon)
