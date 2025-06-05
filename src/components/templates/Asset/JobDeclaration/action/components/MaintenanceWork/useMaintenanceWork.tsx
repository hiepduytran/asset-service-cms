import CoreInput from '@/components/atoms/CoreInput'
import { ColumnProps } from '@/components/organism/CoreTable'
import { TRANSLATE } from '@/routes'
import { JobDeclarationDetail } from '@/service/asset/jobDeclaration/action/type'
import { IconButton, InputAdornment, Typography } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
type Props = {
  title: string
  name:
    | 'maintenanceWorkOverview.maintenanceWorkDetails'
    | 'maintenanceWorkRepair.maintenanceWorkDetails'
}
export default function useTableMaintenanceWork({ title, name }: Props) {
  const { t } = useTranslation(TRANSLATE.JOB_DECLARATION)
  const methods = useFormContext<JobDeclarationDetail>()
  const { id, actionType } = useRouter().query
  const isView = actionType === 'VIEW'
  const isUpdate = !!id
  const { control, watch } = methods
  const { fields, append, remove } = useFieldArray({
    control,
    name: name,
    keyName: 'key',
  })
  const columnsOverview = useMemo(() => {
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
            width: isView ? '' : '400px',
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
                  width: '280px',
                },
              },
            },
          ]),
    ] as ColumnProps[]
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t])

  const tableData = fields.map((item, index) => {
    return {
      ...item,
      content: (
        <CoreInput
          name={`${name}.${index}.content`}
          control={control}
          label={''}
          placeholder={t('Nhập nội dung công việc')}
          rules={{ required: t('common:validation.required') }}
          required
          inputProps={{
            maxLength: 250,
          }}
        />
      ),
      standardTime: isView ? (
        <div className='flex gap-2'>
          <Typography>{item.standardTime}</Typography>
          <Typography>giờ</Typography>
        </div>
      ) : (
        <CoreInput
          name={`${name}.${index}.standardTime`}
          control={control}
          type='number'
          label={''}
          placeholder={t('Nhập thời gian tiêu chuẩn')}
          rules={{
            required: t('common:validation.required'),
          }}
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
      action: (
        <IconButton
          onClick={() => {
            remove(index)
          }}
        >
          <Image
            src={require('@/assets/svg/action/delete.svg')}
            alt='delete'
            width={16}
            height={16}
          />
        </IconButton>
      ),
    }
  })
  return [
    { tableData, columnsOverview, methods, id, isUpdate, isView },
    { t, append },
  ] as const
}
