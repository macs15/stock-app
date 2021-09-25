import { FC, InputHTMLAttributes } from 'react'

import TextAlert from './TextAlert'

const InputForm: FC<InputFormProps> = ({ register, labelText, error = '', ...rest }) => {
  return (
    <div className="mb-5 text-left">
      <label htmlFor={rest.name}>{labelText}</label>
      <input className="bg-gray-100 rounded-md p-2 w-full" {...rest} {...register(rest.name)} />
      {error && <TextAlert text={error} />}
    </div>
  )
}

interface InputFormProps extends InputHTMLAttributes<HTMLInputElement> {
  register: <T extends unknown>(name: T) => void
  error?: string
  labelText: string
}

export default InputForm
