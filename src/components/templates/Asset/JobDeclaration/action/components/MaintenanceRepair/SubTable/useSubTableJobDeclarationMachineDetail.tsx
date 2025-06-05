import CoreInput from '@/components/atoms/CoreInput'
import { ColumnProps } from '@/components/organism/CoreTable'
import { TRANSLATE } from '@/routes'
import { JobDeclarationDetail } from '@/service/asset/jobDeclaration/action/type'
import { IconButton, InputAdornment, Typography } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useLayoutEffect, useMemo } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
type Props = {
  name: 'detailsWorkOverview' | 'detailsWorkRepair'
  index: number
  item: any
  setOpenNoData: (item: any) => void
}
export default function useSubTableJobDeclarationMachineDetail(props: Props) {
  const { name, index, item, setOpenNoData } = props
  const { t } = useTranslation(TRANSLATE.JOB_DECLARATION)
  const { id, actionType } = useRouter().query
  const isView = actionType === 'VIEW'
  const isUpdate = !!id

  const methods = useFormContext<JobDeclarationDetail>()
  const { control, getValues } = methods
  const { fields, append, remove } = useFieldArray({
    control,
    name: `${name}.${index}.repairWorkDetails`,
    keyName: 'key',
  })

  useLayoutEffect(() => {
    if (fields.length === 0) {
      append(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const columnsRepair = useMemo(() => {
    return [
      {
        header: (
          <div className='flex items-center gap-2'>
            <Typography
              sx={{
                fontWeight: 600,
              }}
            >
              Nội dung công việc
            </Typography>
            <Typography
              sx={{
                fontWeight: 600,
                color: '#FF4956',
              }}
            >
              *
            </Typography>
          </div>
        ),
        fieldName: 'content',
      },
      {
        header: (
          <div className='flex items-center gap-2'>
            <Typography
              sx={{
                fontWeight: 600,
              }}
            >
              Thời gian tiêu chuẩn
            </Typography>
            <Typography
              sx={{
                fontWeight: 600,
                color: '#FF4956',
              }}
            >
              *
            </Typography>
          </div>
        ),
        fieldName: 'standardTime',
        styleCell: {
          style: {
            width: '300px',
          },
        },
      },
      ...(isView
        ? []
        : [
            {
              header: '',
              fieldName: 'action',
              styleCell: {
                style: {
                  width: '100px',
                },
              },
            },
          ]),
    ] as ColumnProps[]
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t])

  const tableData = fields.map((item2, index2) => {
    return {
      ...item2,
      content: (
        <CoreInput
          name={`${name}.${index}.repairWorkDetails.${index2}.content`}
          control={control}
          label={''}
          placeholder={t('Nhập chi tiết máy')}
          rules={{
            required: t('common:validation.required'),
          }}
        />
      ),
      standardTime: isView ? (
        <div className='flex gap-2'>
          <Typography>{item2.standardTime}</Typography>
          <Typography>giờ</Typography>
        </div>
      ) : (
        <CoreInput
          name={`${name}.${index}.repairWorkDetails.${index2}.standardTime`}
          control={control}
          type='number'
          label={''}
          placeholder={t('Nhập thời gian tiêu chuẩn')}
          rules={{
            required: t('common:validation.required'),
          }}
          maxLength={2}
          required
          disableNegative
          disableZero
          disableDecimal
          InputProps={{
            endAdornment: (
              <InputAdornment position='start'>
                <Typography sx={{ paddingLeft: '8px' }} color={'#000000DE'}>
                  giờ
                </Typography>
              </InputAdornment>
            ),
          }}
        />
      ),
      action: !isView ? (
        <IconButton
          onClick={() => {
            remove(index)
            if (getValues(`${name}.${index}.repairWorkDetails`).length === 0) {
              setOpenNoData(item)
            }
          }}
        >
          <Image
            src={require('@/assets/svg/action/delete.svg')}
            alt='delete'
            width={16}
            height={16}
          />
        </IconButton>
      ) : (
        <></>
      ),
    }
  })
  return [
    { methods, id, isView, isUpdate, tableData, columnsRepair },
    { t, append },
  ] as const
}
