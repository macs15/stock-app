import { FC } from 'react'

const colors = {
  error: 'text-red-500',
  warning: 'text-yellow-100',
  success: 'text-green-500'
}

const TextAlert: FC<TextAlertProps> = ({ text, className = '', type = 'error' }) => {
  return <p className={`${colors[type]} ${className}`}>{text}</p>
}

interface TextAlertProps {
  text: string
  className?: string
  type?: Types
}

export type Types = keyof typeof colors

export default TextAlert
