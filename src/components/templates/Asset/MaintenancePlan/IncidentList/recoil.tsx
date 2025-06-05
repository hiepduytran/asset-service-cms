import { atom } from 'recoil'

export const incidentList = atom<any[]>({
    key: 'incidentList',
    default: [],
})

export const planType = atom<string>({
    key: 'planType',
    default: '',
})
