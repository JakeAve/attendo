import { useState } from 'react'
import { Dialog } from '../dialog/Dialog'

interface UseDialogProps {
  onClose: () => void
  isOpen: boolean
}

export const useDialog = (props: UseDialogProps) => {
  const { onClose, isOpen: _isOpen = false } = props

  const [isOpen, setIsOpen] = useState(_isOpen)
  const closeDialog = () => {
    setIsOpen(false)
    onClose()
  }
  const openDialog = () => setIsOpen(true)

  return {
    isOpen,
    openDialog,
    closeDialog,
  }
}
