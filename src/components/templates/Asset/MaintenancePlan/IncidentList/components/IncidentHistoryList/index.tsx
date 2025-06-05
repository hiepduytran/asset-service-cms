import { CoreButton } from '@/components/atoms/CoreButton'
import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import CoreInput from '@/components/atoms/CoreInput'
import { CoreTable } from '@/components/organism/CoreTable'
import PageContainer from '@/components/organism/PageContainer'
import { WHITE } from '@/helper/colors'
import { FormControl, Grid, MenuItem, Select, Typography } from '@mui/material'
import React from 'react'
import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import { useIncidentHistoryList } from './useIncidentHistoryList'
import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import { getAllDepartment } from '@/service/asset/requestAllocation/getList'
import { getListSeverityManagement } from '@/service/asset/severityManagement/list'
import { MENU_URL } from '@/routes'

export default function IncidentHistoryList() {
  const [values, handles] = useIncidentHistoryList()

  const { methodForm, columns, columnsMaintenance, tableData, data, isLoadingTable, id, code, name, viewType, router } = values
  const { control } = methodForm

  const { t, onSubmit, onChangePageSize, onReset } = handles
  return (
    <PageContainer
      title={
        <CoreBreadcrumbs
          breadcrumbs={[
            {
              title: t('nav.weeklyIncidentList'),
              pathname: MENU_URL.INCIDENT_LIST,
            },
            {
              title: `${code} - ${name}`,
            },
          ]}
        />
      }
    >
      <div className='flex flex-col'>
        <form
          onSubmit={onSubmit}
          className='flex flex-col py-10 px-5'
          style={{
            backgroundColor: WHITE,
            borderRadius: 20,
          }}
        >
          <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <CoreInput
                control={control}
                name='search'
                label={t('common:form.search.label')}
                placeholder={t('common:form.search.placeholder')}
                inputProps={{
                  maxLength: 50,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <CoreAutoCompleteAPI
                control={control}
                name='department'
                label={t('table.part')}
                placeholder=''
                fetchDataFn={getAllDepartment}
                hasAllOption
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <CoreAutoCompleteAPI
                control={control}
                name='severityManagement'
                label={t('table.severityLevel')}
                placeholder=''
                fetchDataFn={getListSeverityManagement}
                hasAllOption
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <CoreAutocomplete
                control={control}
                name='isHandle'
                label={t('table.processingStatus')}
                options={[
                  { label: t('common:all'), value: null },
                  { label: 'Đã xử lý', value: true },
                  { label: 'Chưa xử lý', value: false },
                ]}
              />
            </Grid>
          </Grid>

          <div className='flex justify-center mt-10 gap-10'>
            <CoreButton onClick={onReset} theme='reset'>
              Reset
            </CoreButton>
            <CoreButton theme='submit' type='submit'>
              {t('common:btn.search')}
            </CoreButton>
          </div>
        </form>

        <div className='py-5 flex justify-between items-center'>
          <Typography sx={{
            fontSize: '14px',
            fontWeight: '700'
          }}>
            DANH SÁCH LỊCH SỬ SỰ CỐ
          </Typography>
          <div className='flex items-center gap-2'>
            <Typography>Lọc:</Typography>
            <FormControl variant='standard'>
              <Select
                value={viewType}
                disableUnderline
                sx={{ color: '#0078D4' }}
              >
                <MenuItem
                  value='INCIDENT'
                  sx={{ color: '#0078D4' }}
                  onClick={() => {
                    router.push({
                      pathname: `${MENU_URL.INCIDENT_HISTORY_LIST}/[id]`,
                      query: {
                        id: id,
                        code: code,
                        name: name
                      },
                    })
                  }}
                >
                  Chiều sự cố
                </MenuItem>
                <MenuItem
                  value='MAINTENANCE'
                  sx={{ color: '#0078D4' }}
                  onClick={() => {
                    router.push({
                      pathname: `${MENU_URL.INCIDENT_HISTORY_LIST}/[id]`,
                      query: {
                        id: id,
                        code: code,
                        name: name,
                        view: 'MAINTENANCE'
                      },
                    })
                  }}
                >
                  Chiều bảo dưỡng/sửa chữa
                </MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>

        {
          viewType === 'INCIDENT' ? (
            <CoreTable
              tableName='incidentHistoryList'
              columns={columns}
              data={tableData}
              onChangePageSize={onChangePageSize}
              {...data}
              isLoading={isLoadingTable}
              isShowColumnStt
            />
          ) : (
            <CoreTable
              tableName='incidentHistoryList'
              columns={columnsMaintenance}
              data={[]}
              onChangePageSize={onChangePageSize}
              isLoading={isLoadingTable}
              isShowColumnStt
            />
          )
        }
      </div>
    </PageContainer>
  )
}
