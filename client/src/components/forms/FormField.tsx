import { useState } from 'react'

interface FormFieldProps {
  label: string
  name: string
  type: string
  placeholder: string
  required: boolean
  hasSubmitted: boolean
  defaultValue?: string
}

export const genId = (length: number) => {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789'
  let code = ''
  for (let i = 0; i < length; i++)
    code += chars.charAt(Math.floor(Math.random() * chars.length))

  return code
}

export const FormField = (props: FormFieldProps) => {
  const {
    label,
    name,
    type,
    placeholder,
    required,
    hasSubmitted = false,
    defaultValue = '',
  } = props
  const [hasFocused, setHasFocused] = useState(hasSubmitted)
  const randomId = genId(5)
  return (
    <div>
      <label htmlFor={randomId}>{label}</label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        id={randomId}
        onFocus={() => setHasFocused(true)}
        defaultValue={defaultValue}
      />
      {hasFocused && <span></span>}
    </div>
  )
}
