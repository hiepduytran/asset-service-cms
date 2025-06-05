import { AnotherAddress } from '@/service/partner/partner/get/type'
import { useQueryGetRegionListByCountryId } from '@/service/resource/region/list'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Props } from '.'

export const useAddressDialog = (arg: Props) => {
  const { isEdit, data } = arg
  const { control, watch, reset, setValue, handleSubmit } =
    useForm<AnotherAddress>({
      defaultValues: {
        addressType: 'INVOICE_ADDRESS',
      },
      mode: 'onTouched',
    })
  const [countryId] = watch(['countryId'])

  const { data: regionList, isLoading: isLoadingRegionList } =
    useQueryGetRegionListByCountryId(
      { countryId: Number(countryId) },
      { enabled: !!Number(countryId) }
    )

  useEffect(() => {
    if (isEdit) {
      reset(data)
    }
  }, [data, isEdit, reset])
  return [
    { control, regionList: regionList?.data ?? [], isLoadingRegionList },
    { handleSubmit, watch, setValue },
  ] as const
}
