import { ButtonHTMLAttributes, FC } from 'react'

const Button: FC<ButtonProps> = ({ text, className = '', ...rest }) => {
  return (
    <button className={`${className} px-2 py-1 border border-blue-500 rounded-md`} {...rest}>
      {text}
    </button>
  )
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string
}

export default Button
