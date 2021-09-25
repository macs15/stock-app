import { forwardRef, ReactNode } from 'react'

const Modal = forwardRef<HTMLDivElement, ModalProps>(({ children, open = false }, ref) => {
  return (
    <div ref={ref} className={`${open ? 'open' : ''} fixed shadow-md bg-white right-0 z-50 modal`}>
      {children}
    </div>
  )
})

type ModalProps = {
  children: ReactNode
  open?: boolean
}

export default Modal
