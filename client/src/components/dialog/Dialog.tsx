interface DialogProps {
  isOpen: boolean
  onClose?: () => void
  closeDialog: () => void
  title?: string
  content: string | JSX.Element
  buttonText?: string
  form?: any
}

export const Dialog = (props: DialogProps) => {
  const { isOpen, title, content, buttonText = 'Close', closeDialog } = props

  return (
    <dialog open={isOpen}>
      <div>
        {title && <h2>{title}</h2>}
        {typeof content === 'string' ? <p>{content}</p> : content}
        <button onClick={closeDialog}>{buttonText}</button>
      </div>
    </dialog>
  )
}
