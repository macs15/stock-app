import { FC, InputHTMLAttributes } from 'react'

const SubmitButton: FC<SubmitButtonProps> = ({ className = '', ...rest }) => {
  return (
    <input
      className={`${className} bg-blue-500 rounded-md cursor-pointer text-white px-2 py-1 w-1/2`}
      type="submit"
      {...rest}
    />
  )
}

interface SubmitButtonProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
}

export default SubmitButton
