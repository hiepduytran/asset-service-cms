import { ReactNode, useCallback } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { dialogNode, dialogNode2, isOpenDialog, isOpenDialog2 } from './recoil'

export function useDialog() {
  const setOpenDialog = useSetRecoilState(isOpenDialog)
  const setDialogNode = useSetRecoilState(dialogNode)
  const showDialog = useCallback(
    (props: JSX.Element) => {
      setOpenDialog(true)
      setDialogNode(props)
    },
    [setOpenDialog, setDialogNode]
  )
  const hideDialog = useCallback(() => {
    setOpenDialog(false)
  }, [setOpenDialog])

  return { showDialog, hideDialog } as const
}

function useRenderDialog() {
  const isOpen = useRecoilValue(isOpenDialog)
  const node = useRecoilValue(dialogNode)
  return useCallback(() => {
    if (!isOpen || !node) return null
    return <>{node}</>
  }, [isOpen, node])
}

export function useDialog2() {
  const setOpenDialog = useSetRecoilState(isOpenDialog2)
  const setDialogNode = useSetRecoilState(dialogNode2)
  const showDialog2 = useCallback(
    (props: JSX.Element) => {
      setOpenDialog(true)
      setDialogNode(props)
    },
    [setOpenDialog, setDialogNode]
  )
  const hideDialog2 = useCallback(() => {
    setOpenDialog(false)
  }, [setOpenDialog])

  return { showDialog2, hideDialog2 } as const
}

function useRenderDialog2() {
  const isOpen = useRecoilValue(isOpenDialog2)
  const node = useRecoilValue(dialogNode2)
  return useCallback(() => {
    if (!isOpen || !node) return null
    return <>{node}</>
  }, [isOpen, node])
}

export const DialogProvider = ({ children }: { children: ReactNode }) => {
  const renderDialog = useRenderDialog()
  const renderDialog2 = useRenderDialog2()
  return (
    <>
      {children}
      {renderDialog()}
      {renderDialog2()}
    </>
  )
}
