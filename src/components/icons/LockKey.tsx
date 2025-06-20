import { memo } from 'react'

const LockKey = ({ className }: { className?: string }) => {
  return (
    <div className={className}>
      <svg
        width='120'
        height='120'
        viewBox='0 0 120 120'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M59.9966 75C65.1743 75 69.3716 70.8027 69.3716 65.625C69.3716 60.4473 65.1743 56.25 59.9966 56.25C54.8189 56.25 50.6216 60.4473 50.6216 65.625C50.6216 70.8027 54.8189 75 59.9966 75Z'
          stroke='#F89E19'
          strokeWidth='5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M59.9966 75V86.25'
          stroke='#F89E19'
          strokeWidth='5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M97.4966 41.25H22.4966C20.4255 41.25 18.7466 42.9289 18.7466 45V97.5C18.7466 99.5711 20.4255 101.25 22.4966 101.25H97.4966C99.5676 101.25 101.247 99.5711 101.247 97.5V45C101.247 42.9289 99.5676 41.25 97.4966 41.25Z'
          stroke='#F89E19'
          strokeWidth='5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M43.1216 41.25V24.375C43.1216 19.8995 44.8995 15.6072 48.0642 12.4426C51.2288 9.2779 55.5211 7.5 59.9966 7.5C64.4721 7.5 68.7643 9.2779 71.929 12.4426C75.0937 15.6072 76.8716 19.8995 76.8716 24.375V41.25'
          stroke='#F89E19'
          strokeWidth='5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    </div>
  )
}

export default memo(LockKey)
