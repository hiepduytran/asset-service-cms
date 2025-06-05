import { changeSelfMaintenanceTypeDetail } from '@/enum'
import { TRANSLATE } from '@/routes'
import { useTranslation } from 'react-i18next'
import styles from './styles.module.css'

type IncidentDetailsProps = {
  title: string
  severity: string
  source: string
  reporter: string
  timestamp: string
  reason: string
  length?: number
}
const IncidentDetail = ({
  title,
  severity,
  source,
  reporter,
  timestamp,
  reason,
}: IncidentDetailsProps) => {
  const { t } = useTranslation(TRANSLATE.INCIDENT_APPROVE)
  return (
    <div className='relative border border-solid border-gray-300 rounded-sm py-40 sm:px-20 md:px-50 xl:px-100 bg-white'>
      <div className={`${styles.ribbon} ${'bg-[#00CC6A]'}`}>
        <div className={`${styles.ribbon}`}>{'Sự cố ghi nhận gần nhất'}</div>
      </div>
      <div className='space-y-20 text-[15px]'>
        <div className='flex'>
          <div className='font-semibold sm:w-[150px] md:min-w-[200px] xl:min-w-[300px] 2xl:min-w-[600px]'>
            Tên sự cố:
          </div>
          <div className=''>{title}</div>
        </div>
        <div className='flex'>
          <div className='font-semibold sm:w-[150px] md:min-w-[200px] xl:min-w-[300px] 2xl:min-w-[600px]'>
            Mức độ nghiêm trọng:
          </div>
          <div
            className={`${
              severity === 'Khẩn cấp' ? 'text-[#FF0012] font-semibold' : ''
            }`}
          >
            {severity}
          </div>
        </div>
        <div className='flex '>
          <div className='font-semibold sm:w-[150px] md:min-w-[200px] xl:min-w-[300px] 2xl:min-w-[600px]'>
            Nguồn:
          </div>
          {changeSelfMaintenanceTypeDetail(source, t)}
        </div>
        <div className='flex'>
          <div className='font-semibold sm:w-[150px] md:min-w-[200px] xl:min-w-[300px] 2xl:min-w-[600px]'>
            Người ghi nhận:
          </div>
          <div className=' '>{reporter ?? '---'}</div>
        </div>
        <div className='flex'>
          <div className='font-semibold sm:w-[150px] md:min-w-[200px] xl:min-w-[300px] 2xl:min-w-[600px]'>
            Thời gian ghi nhận:
          </div>
          <div className=''>{timestamp}</div>
        </div>
        <div className='flex'>
          <div className='font-semibold sm:w-[150px] md:min-w-[200px] xl:min-w-[300px] 2xl:min-w-[600px]'>
            Lý do:
          </div>
          <div className=''>{reason}</div>
        </div>
      </div>
    </div>
  )
}

export default IncidentDetail
