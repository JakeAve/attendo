import { useNavigate } from 'react-router-dom'
import { login } from '../../../../api/actions'
import { FieldInputs, useForm } from '../../../../hooks/useForm'
import { useDialogContext } from '../../../../providers/DialogProvider'
import { useUserContext } from '../../../../providers/UserProvider'

interface UseLoginProps {
  formFields: FieldInputs
  formRef: React.RefObject<HTMLFormElement>
}

export const useLogin = ({ formFields, formRef }: UseLoginProps) => {
  const { openDialog } = useDialogContext()
  const { setUser } = useUserContext()
  const navigate = useNavigate()

  const onSubmit = async (data: any) => {
    try {
      const { success, response } = await login(data)
      if (!success)
        return openDialog({
          title: 'Login Failed',
          content: response.message,
        })
      openDialog({
        title: 'Login Successful',
        content: 'You have successfully logged in',
      })
      resetForm()
      setUser({ ...response.data, ...response })
      navigate('/')
    } catch (err) {
      console.error(err)
      openDialog({
        title: 'Login Failed',
        content: 'Something went wrong',
      })
    }
  }

  const {
    submit,
    change,
    fieldElements,
    reset: resetForm,
  } = useForm({
    onSubmit,
    fields: formFields,
    formRef,
  })

  return {
    submit,
    change,
    fieldElements,
  }
}
