import { useFormCustom } from '@/lib/form'
import { TRANSLATE } from '@/routes'
import _ from 'lodash'
import { useTranslation } from 'next-i18next'
import { useMutation } from 'react-query'
import { toastError, toastSuccess } from '@/toast'
import {
  postApproveConfig,
  putApproveConfig,
  useQueryApproveConfig,
} from '@/service/asset/approveConfig'
import { ApproveConfigSave } from '@/service/asset/approveConfig/type'
import { useEffect } from 'react'
import { getCmsToken } from '@/config/token'

const defaultValues = {
  assetSelfMaintainStandard: {
    level1: {
      groupStaff: null,
      approveLevel: 'LEVEL_1',
      isActive: true,
    },
    level2: {
      groupStaff: null,
      approveLevel: 'LEVEL_2',
      isActive: true,
    },
  },
  selfMaintainVoucher: {
    level1: {
      groupStaff: null,
      approveLevel: 'LEVEL_1',
      isActive: true,
    },
    level2: {
      groupStaff: null,
      approveLevel: 'LEVEL_2',
      isActive: true,
    },
  },
  weeklyPlan: {
    level1: {
      groupStaff: null,
      approveLevel: 'LEVEL_1',
      isActive: true,
    },
    level2: {
      groupStaff: null,
      approveLevel: 'LEVEL_2',
      isActive: true,
    },
  },
  emergingWeeklyPlan: {
    level1: {
      groupStaff: null,
      approveLevel: 'LEVEL_1',
      isActive: true,
    },
    level2: {
      groupStaff: null,
      approveLevel: 'LEVEL_2',
      isActive: true,
    },
  },
  annualPlan: {
    level1: {
      groupStaff: null,
      approveLevel: 'LEVEL_1',
      isActive: true,
    },
    level2: {
      groupStaff: null,
      approveLevel: 'LEVEL_2',
      isActive: true,
    },
  },
  emergencyFix: {
    level1: {
      groupStaff: null,
      approveLevel: 'LEVEL_1',
      isActive: true,
    },
    level2: {
      groupStaff: null,
      approveLevel: 'LEVEL_2',
      isActive: true,
    },
  },
  regularMaintenance: {
    level1: {
      groupStaff: null,
      approveLevel: 'LEVEL_1',
      isActive: true,
    },
    level2: {
      groupStaff: null,
      approveLevel: 'LEVEL_2',
      isActive: true,
    },
  },
}

export const useApproveConfig = () => {
  const { t } = useTranslation(TRANSLATE.APPROVE_CONFIG)
  const methodForm = useFormCustom<ApproveConfigSave>({
    defaultValues,
  })
  const tokenAccess: any = getCmsToken()
  const isNullStructure = (obj: any): boolean => {
    return _.every(
      obj,
      (item) => _.isNull(item.level1) && _.isNull(item.level2)
    )
  }
  const { data, isLoading, refetch } = useQueryApproveConfig({})
  const isUpdate = !isNullStructure(data?.data)
  useEffect(() => {
    if (isUpdate && data?.data) {
      methodForm.reset(data?.data)
    }
  }, [data?.data, isUpdate])

  const { mutate, isLoading: isLoadingSubmit } = useMutation(
    isUpdate ? putApproveConfig : postApproveConfig,
    {
      onSuccess: (res) => {
        toastSuccess(t('common:message.success'))
        if (res?.data) {
          refetch()
        }
      },
      onError: (error) => {
        toastError(error)
      },
    }
  )

  const onSubmit = methodForm.handleSubmit(async (data) => {
    mutate(data)
  })
  const onCancel = () => {
    methodForm.reset()
  }

  return [
    {
      methodForm,
      isLoading,
      isLoadingSubmit,
      tokenAccess,
    },
    { t, onSubmit, onCancel },
  ] as const
}
