import { createContext, useContext } from 'react'
import { Dialog } from '../components/dialog/Dialog'
import { DialogProps, useDialog } from '../components/dialog/useDialog'

interface DialogContext {
  isOpen: boolean
  openDialog: (dialogProps: DialogProps) => void
  closeDialog: () => void
}

const dialogContext = createContext<DialogContext>({
  isOpen: false,
  openDialog: (dialogProps: DialogProps) => {},
  closeDialog: () => {},
})

export const DialogProvider = (props: { children: JSX.Element }) => {
  const { children } = props
  const { isOpen, openDialog, closeDialog, title, content, buttonText } =
    useDialog()
  return (
    <dialogContext.Provider value={{ isOpen, openDialog, closeDialog }}>
      {children}
      <Dialog
        isOpen={isOpen}
        onClose={() => {}}
        closeDialog={closeDialog}
        title={title}
        content={content}
        buttonText={buttonText}
      />
    </dialogContext.Provider>
  )
}

export const useDialogContext = () => useContext(dialogContext)
