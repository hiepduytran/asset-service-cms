import { useAppSelector } from '@/redux/hook'
import moment from 'moment'

export const FORMAT_DATE_TIME_API = 'YYYY-MM-DDTHH:mm:ssZ'
export const DEFAULT_FORMAT_DATE_TIME = 'DD/MM/YYYY HH:mm'

export const FORMAT_DATE_API = 'YYYY-MM-DD'
export const DEFAULT_FORMAT_DATE = 'DD/MM/YYYY'

export const useDate = () => {
  const { dateType = DEFAULT_FORMAT_DATE } = useAppSelector(
    (state) => state.companyConfigData
  )

  const convertToDate = (val: any, format = dateType) => {
    if (!val) return null
    else return moment(val).format(format)
  }

  const convertToTime = (val: any, format = DEFAULT_FORMAT_DATE_TIME) => {
    if (!val) return null
    else return moment(val).format(format)
  }

  const compareTimes = (time1: string, time2: string) => {
    console.log(time1, time2, 'xxxxxxxxxxxx')
    const date1 = new Date(time1)
    const date2 = new Date(time2)

    console.log(date1, date2, 'yyyyyyyyy')

    console.log(!!0)

    if (date1.getTime() > date2.getTime()) {
      console.log('123')
      return 1
    } else if (date1.getTime() < date2.getTime()) {
      console.log('456')
      return -1
    } else {
      console.log('678')
      return 0
    }
  }

  const getDateNow = (format = FORMAT_DATE_API) => {
    return moment(moment.now()).format(format)
  }

  const getStartDateOfMonth = (format = FORMAT_DATE_API) => {
    return moment(moment().startOf('month')).format(format)
  }

  const getEndDateOfMonth = (format = FORMAT_DATE_API) => {
    return moment(moment().endOf('month')).format(format)
  }

  const checkDateValid = (val: any) => {
    return (
      moment(val, 'DD-MM-YYYY', true).isValid() ||
      moment(val, 'YYYY-MM-DDTHH:mm:ssZ', true).isValid() ||
      moment(val, 'YYYY-MM-DD', true).isValid()
    )
  }

  return {
    convertToDate,
    convertToTime,
    getDateNow,
    compareTimes,
    getStartDateOfMonth,
    getEndDateOfMonth,
    checkDateValid,
  }
}
