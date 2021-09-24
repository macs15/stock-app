import { FC } from 'react'

const colors = {
  error: 'text-red-500',
  warning: 'text-yellow-100',
  success: 'text-green-500'
}

const TextAlert: FC<TextAlertProps> = ({ text, type = 'error' }) => {
  return <p className={`${colors[type]}`}>{text}</p>
}

interface TextAlertProps {
  text: string
  type?: Types
}

type Types = keyof typeof colors

export default TextAlert
