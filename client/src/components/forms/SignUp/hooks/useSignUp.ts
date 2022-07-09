import { ErrorCode } from '../../../../../../server/src/handlers/errorHandler'
import { register } from '../../../../api/actions'
import { FieldInputs, useForm } from '../../../../hooks/useForm'
import { useDialogContext } from '../../../../providers/DialogProvider'

interface UseSignUpProps {
  formFields: FieldInputs
  formRef: React.RefObject<HTMLFormElement>
}

export const useSignUp = ({ formFields, formRef }: UseSignUpProps) => {
  const { openDialog } = useDialogContext()

  const onSubmit = async (data: any) => {
    try {
      const { success, response } = await register(data)
      if (!success) {
        if (response.code === ErrorCode.MONGOOSE_DUPLICATE_KEY) {
          const fieldName = response.data.fields?.[0]?.[0]
          const label = formFields.find(({ name }) => name === fieldName)?.label
          if (label)
            return openDialog({
              title: 'Sign Up Failed',
              content: `"${label}" is already taken`,
            })
        }
        return openDialog({
          title: 'Registration Failed',
          content: response.message,
        })
      }

      openDialog({
        title: 'Registration Successful',
        content: 'You have successfully registered',
      })
      resetForm()
    } catch (err) {
      console.error(err)
      openDialog({
        title: 'Registration Failed',
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
