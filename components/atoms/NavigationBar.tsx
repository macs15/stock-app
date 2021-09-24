import { FC } from 'react'

const NavigationBar: FC<NavigationBarProps> = ({ children, title }) => {
  return (
    <nav className="header shadow-md fixed top-0 left-0 z-10 px-5 py-3 w-full flex justify-between border-b bg-gray-50">
      <h1 className="text-xl font-bold">{title}</h1>
      {children}
    </nav>
  )
}

type NavigationBarProps = {
  title: string
}

export default NavigationBar
