import { useState } from 'react'

const useModal = () => {
  const [open, setOpen] = useState(false)

  const openModal = () => !open && setOpen(true)
  const closeModal = () => open && setOpen(false)
  const toggleModal = () => setOpen(!open)

  return {
    open,
    openModal,
    closeModal,
    toggleModal
  }
}

export default useModal
