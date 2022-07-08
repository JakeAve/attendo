import { useDialog } from './useDialog'

interface DialogProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  content: string | JSX.Element
  buttonText?: string
}

export const Dialog = (props: DialogProps) => {
  const {
    isOpen: _isOpen,
    onClose,
    title,
    content,
    buttonText = 'Close',
  } = props
  const { isOpen, closeDialog, openDialog } = useDialog({
    onClose,
    isOpen: _isOpen,
  })
  return {
    JSX: (
      <dialog open={isOpen}>
        <div>
          {title && <h2>{title}</h2>}
          {typeof content === 'string' ? <p>{content}</p> : content}
          <button onClick={closeDialog}>{buttonText}</button>
        </div>
      </dialog>
    ),
    openDialog,
  }
}
