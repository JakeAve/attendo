interface UseFormProps {
  onSubmit: (...args: any) => void
}

export const useForm = (props: UseFormProps) => {
  const { onSubmit } = props
  const submit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    console.log(e)
    const form = e.currentTarget as HTMLFormElement
    const formData = new FormData(form)
    const data: any = {}
    for (const [key, value] of formData) {
      if (data[key]) data[key] = [...data[key], value]
      data[key] = value
    }
    onSubmit(data)
  }

  return { submit }
}
