import { useState } from 'react'
import { FormField } from '../components/forms/FormField'

interface FieldInput {
  label: string
  name: string
  type: string
  placeholder: string
  required: boolean
  criteria: [
    validator: (value: string, data: any) => boolean,
    message: string,
  ][]
}

export type FieldInputs = FieldInput[]

interface UseFormProps {
  onSubmit: (...args: any) => void
  fields: FieldInputs
}

interface FormErrors {
  [key: string]: string
}

export const useForm = (props: UseFormProps) => {
  const { onSubmit, fields } = props

  const [hasSubmitted, setHasSubmitted] = useState(false)

  const getData = (form: HTMLFormElement) => {
    const formData = new FormData(form)
    const data: any = {}
    for (const [key, value] of formData) {
      if (data[key]) data[key] = [...data[key], value]
      data[key] = value
    }
    return data
  }

  const validate = (data: any) => {
    const errors: FormErrors = {}
    for (const field of fields) {
      const { name, criteria } = field
      const value = data[name]
      for (const [validator, message] of criteria) {
        if (!validator(value, data)) {
          errors[name] = message
          break
        }
      }
    }
    return errors
  }

  const handleErrors = (errors: FormErrors, form: HTMLFormElement) => {
    form
      .querySelectorAll('span')
      .forEach((span: HTMLSpanElement) => (span.innerText = ''))
    for (const [name, message] of Object.entries(errors)) {
      const field = form.querySelector(`[name="${name}"]`)
      if (field && field.parentElement) {
        const error = field.parentElement.querySelector(
          'span',
        ) as HTMLSpanElement
        if (error) error.innerText = message
      }
    }
  }

  const submit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    setHasSubmitted(true)
    const form = e.target as HTMLFormElement
    const data = getData(form)
    const errors = validate(data)
    handleErrors(errors, form)
    if (Object.keys(errors).length) return
    onSubmit(data)
  }

  const fieldElements = fields.map((field, idx) => (
    <FormField key={idx} hasSubmitted={hasSubmitted} {...field} />
  ))

  const change = (e: React.ChangeEvent<HTMLFormElement>) => {
    const form = e.target.closest('form') as HTMLFormElement
    const data = getData(form)
    const errors = validate(data)
    handleErrors(errors, form)
  }

  return { submit, fieldElements, change }
}
