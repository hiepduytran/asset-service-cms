import { FORMAT_DATE_TIME_API, useDate } from '@/components/hooks/date/useDate'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import { getUserIdToken } from '@/config/token'
import { TRANSLATE } from '@/routes'
import { postIncident, putIncident } from '@/service/asset/operate/save/incident/save'
import { toastError, toastSuccess } from '@/toast'
import { useTranslation } from 'next-i18next'
import { useMutation } from 'react-query'

export const useDialogIncident = (props: any) => {
    const userId = getUserIdToken()
    const { serviceType, data, type, methodForm, index, assetId, refetch, refetchAll, numberOfReviewType, setUpdatedItemsIncident, setUpdatedItemsIncidentAddNew } = props
    const { hideDialog } = useDialog()
    const { getDateNow } = useDate()
    const { t } = useTranslation(TRANSLATE.OPERATE)
    const { handleSubmit, setValue } = methodForm

    const { mutate, isLoading: isLoadingSubmit } = useMutation(
        type === 'CREATE_NEW' ? postIncident : putIncident,
        {
            onSuccess: (res) => {
                toastSuccess(t('common:message.success'))

                if (res?.data) {
                    if (type === 'CREATE_NEW') {
                        refetch();
                        refetchAll();
                    } else {
                        refetch();
                    }

                    if (type === 'REVIEW_AGAIN') {
                        setUpdatedItemsIncident((prev: any) => [...prev, res?.data?.data?.id]);
                    }
                    if (type === 'CREATE_NEW') {
                        setUpdatedItemsIncidentAddNew((prev: any) => [...prev, res?.data?.data?.id]);
                    }
                    hideDialog();
                }
            },
            onError: (error) => {
                toastError(error)
            },
        }
    )

    const onSubmit = handleSubmit(async (input: any) => {
        const commonPayload = {
            ...input.incident[index],
            selfMaintenanceType: serviceType,
            recorder: {
                id: userId,
            },
            recordingTime: getDateNow(FORMAT_DATE_TIME_API),
            actionType: type,
            recordingStatus: type,
            isFinalReview: true,
            asset: {
                id: assetId
            }
        };
        const numberOfReviewTypePayload =
            type === 'REVIEW_AGAIN'
                ? `Review_${numberOfReviewType + 1}`
                : `Review_${numberOfReviewType}`;
        const approveStatus = type === 'CREATE_NEW' ? 'PENDING' : input.incident[index].approveStatus
        mutate({
            ...commonPayload,
            numberOfReviewType: numberOfReviewTypePayload,
            approveStatus
        });
    });

    const onCancel = (buttonType: string) => {
        if (type === 'CREATE_NEW') {
            setValue(`incident.${index}`, {})
        }
        if (buttonType === 'delete') {
            setValue(`incident.${index}`, data)
        } else {
            hideDialog()
        }
    }

    return [
        { isLoadingSubmit },
        { t, onSubmit, onCancel },
    ] as const
}
