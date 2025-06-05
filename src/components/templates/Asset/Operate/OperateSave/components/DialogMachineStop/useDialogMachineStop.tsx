import { useDialog } from '@/components/hooks/dialog/useDialog'
import { TRANSLATE } from '@/routes'
import { postMachineStop, putMachineStop } from '@/service/asset/operate/save/machineStop/save'
import { toastError, toastSuccess } from '@/toast'
import { useTranslation } from 'next-i18next'
import { useMutation } from 'react-query'

export const useDialogMachineStop = (props: any) => {
    const { type, methodForm, index, refetch, refetchAll, assetId, shift, setUpdatedItemsMS } = props
    const { hideDialog } = useDialog()
    const { t } = useTranslation(TRANSLATE.OPERATE)
    const { handleSubmit, setValue } = methodForm

    const { mutate, isLoading: isLoadingSubmit } = useMutation(
        type === 'ADD_NEW' ? postMachineStop : putMachineStop,
        {
            onSuccess: (res) => {
                toastSuccess(t('common:message.success'));

                if (res?.data) {
                    if (type === 'ADD_NEW') {
                        refetch();
                        refetchAll();
                    } else {
                        refetch();
                    }

                    setUpdatedItemsMS((prev: any) => [...prev, res?.data?.data?.id]);
                    hideDialog();
                }
            },
            onError: (error) => {
                toastError(error);
            },
        }
    );

    const onSubmit = handleSubmit(async (input: any) => {
        const payload = {
            ...input.machineStop[index],
            selfMaintenanceType: 'OPERATE',
            shift: shift,
            asset: {
                id: assetId
            }
        };
        mutate(payload);
    });

    const onCancel = () => {
        if (type === 'ADD_NEW') {
            setValue(`machineStop.${index}`, {})
        }
        hideDialog()
    }

    return [
        { isLoadingSubmit },
        { t, onSubmit, onCancel },
    ] as const
}
