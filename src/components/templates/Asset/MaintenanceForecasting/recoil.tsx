import { atom } from 'recoil'

export const arrRecoil = atom<any[]>({
    key: 'arrRecoil',
    default: [],
})
