import useModal from '@hooks/useModal'
import { createContext, FC, useContext } from 'react'

interface ContextProps {
  open: boolean
  openModal: () => void
  closeModal: () => void
  toggleModal: () => void
}

export const ModalContext = createContext({} as ContextProps)

export const ModalProvider: FC = ({ children }) => {
  const { open, openModal, closeModal, toggleModal } = useModal()

  return (
    <ModalContext.Provider
      value={{
        open,
        openModal,
        closeModal,
        toggleModal
      }}
    >
      {children}
    </ModalContext.Provider>
  )
}

export const useModalContext = () => {
  const context = useContext(ModalContext)
  if (typeof context === 'undefined') {
    throw new Error('useModalContext must be use within a ModalProvider')
  }
  return context
}
