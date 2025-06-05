import { TrackAssetLine } from '@/service/asset/paramAsset/save/type'
import {
  styled,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material'
import React, { useId, useState } from 'react'
import { RowItem } from './RowItem'
import CoreLoading from '@/components/molecules/CoreLoading'
import EmptyIcon from '@/components/icons/EmptyIcon'
import { useTranslation } from 'react-i18next'
import { TRANSLATE } from '@/routes'
import { TableContainerCommon, TableHeadCommon } from '@/components/organism/CoreTable'

export const StyledTableCell = styled(TableCell)(() => ({
  fontWeight: '600',
}))

export const HeaderTable = () => {
  const { t } = useTranslation(TRANSLATE.PARAM_ASSET)
  return (
    <TableHeadCommon layout='Layout1'>
      <TableRow>
        <StyledTableCell>{`${t('table.name')}`}</StyledTableCell>
        <StyledTableCell>{`${t('table.value')}`}</StyledTableCell>
        <StyledTableCell>{`${t('table.type')}`}</StyledTableCell>
        <StyledTableCell>{`${t('table.measure')}`}</StyledTableCell>
        <StyledTableCell>{`${t('table.minimum_standard')}`}</StyledTableCell>
        <StyledTableCell>{`${t('table.max_standard')}`}</StyledTableCell>
        <StyledTableCell>{`${t('table.influence')}`}</StyledTableCell>
        <StyledTableCell></StyledTableCell>
      </TableRow>
    </TableHeadCommon>
  )
}

export const BodyTable = ({
  trackAssetLine,
  dataLength,
  isLoading,
}: {
  trackAssetLine: TrackAssetLine[]
  dataLength: number
  isLoading: boolean
}) => {
  const { t } = useTranslation(TRANSLATE.PARAM_ASSET)

  if (isLoading)
    return (
      <TableBody>
        <TableRow>
          <TableCell variant='body'>
            <div className='flex justify-center min-h-[60px]'>
              <CoreLoading />
            </div>
          </TableCell>
        </TableRow>
      </TableBody>
    )

  return (
    <>
      {trackAssetLine?.length === 0 ? (
        <TableRow>
          <TableCell colSpan={8} variant='body' align='center' className='py-8'>
            <div className='flex justify-center min-h-[60px] flex-col'>
              <EmptyIcon />
              <Typography variant='body2'>
                {t('common:table.no_data')}
              </Typography>
            </div>
          </TableCell>
        </TableRow>
      ) : (
        trackAssetLine.map((item, index) =>
          item.assetCategory?.length === 0 ? (
            <TableRow key={'key' + index}>
              <TableCell
                colSpan={8}
                variant='body'
                align='center'
                className='py-8'
              >
                <div className='flex justify-center min-h-[60px] flex-col'>
                  <EmptyIcon />
                  <Typography variant='body2'>
                    {t('common:table.no_data')}
                  </Typography>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            item.assetCategory.map((item2, index2) => (
              <TableBody key={`${index}-${index2}`}>
                <RowItem
                  key={index2}
                  item={item}
                  index={index}
                  index2={index2}
                  item2={item2}
                  dataLength={dataLength}
                />
              </TableBody>
            ))
          )
        )
      )}
    </>
  )
}

type Props = {
  trackAssetLine: TrackAssetLine[]
  dataLength: number
}

export default function TableParamAsset({ trackAssetLine, dataLength }: Props) {
  const [isLoading, setIsLoading] = useState(false)

  const id = useId()

  return (
    <TableContainerCommon layout='Layout1'>
      <Table>
        <HeaderTable />
        <BodyTable
          key={id}
          trackAssetLine={trackAssetLine}
          dataLength={dataLength}
          isLoading={isLoading}
        />
      </Table>
    </TableContainerCommon>
  )
}
