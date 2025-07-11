import { memo } from 'react'

const ArrowsCounterClockwise = ({ className }: { className?: string }) => {
  return (
    <div className={className}>
      <svg
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M7.48438 9.34863H2.98438V4.84863'
          stroke='#F89E19'
          strokeWidth='1.2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M17.8336 6.16637C17.0675 5.40029 16.1581 4.7926 15.1571 4.37799C14.1562 3.96339 13.0834 3.75 12 3.75C10.9166 3.75 9.84378 3.96339 8.84285 4.37799C7.84191 4.7926 6.93244 5.40029 6.16635 6.16637L2.98438 9.34835'
          stroke='#F89E19'
          strokeWidth='1.2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M16.5156 14.6514H21.0156V19.1514'
          stroke='#F89E19'
          strokeWidth='1.2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M6.1665 17.8338C6.93259 18.5999 7.84206 19.2076 8.843 19.6222C9.84393 20.0368 10.9167 20.2502 12.0001 20.2502C13.0835 20.2502 14.1563 20.0368 15.1573 19.6222C16.1582 19.2076 17.0677 18.5999 17.8338 17.8338L21.0157 14.6519'
          stroke='#F89E19'
          strokeWidth='1.2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    </div>
  )
}

export default memo(ArrowsCounterClockwise)
