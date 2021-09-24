import { FC, InputHTMLAttributes } from 'react'

import TextAlert from './TextAlert'

const InputForm: FC<InputFormProps> = ({ register, error = '', ...rest }) => {
  return (
    <div className="mb-5">
      <input className="bg-gray-100 rounded-md p-2 w-full" {...rest} {...register(rest.name)} />
      {error && <TextAlert text={error} />}
    </div>
  )
}

interface InputFormProps extends InputHTMLAttributes<HTMLInputElement> {
  register: <T extends unknown>(name: T) => void
  error?: string
}

export default InputForm
