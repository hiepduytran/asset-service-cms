import { atom } from 'recoil'

export const isOpenDialog = atom({
  key: 'hooks/dialog/isOpenDialog',
  default: false,
})

export const dialogNode = atom({
  key: 'hooks/dialog/dialogNode',
  default: undefined as JSX.Element | undefined,
})

export const isOpenDialog2 = atom({
  key: 'hooks/dialog/isOpenDialog2',
  default: false,
})

export const dialogNode2 = atom({
  key: 'hooks/dialog/dialogNode2',
  default: undefined as JSX.Element | undefined,
})
