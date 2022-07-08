import { useState } from 'react'

export interface DialogProps {
  title: string
  content: string | JSX.Element
  buttonText?: string
}

export const useDialog = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState<string | JSX.Element>('')
  const [buttonText, setButtonText] = useState('')

  const openDialog = (dialogProps: DialogProps) => {
    setTitle(dialogProps.title)
    setContent(dialogProps.content)
    setButtonText(dialogProps.buttonText || 'Close')
    setIsOpen(true)
  }
  const closeDialog = () => setIsOpen(false)

  return {
    isOpen,
    title,
    content,
    buttonText,
    openDialog,
    closeDialog,
  }
}
