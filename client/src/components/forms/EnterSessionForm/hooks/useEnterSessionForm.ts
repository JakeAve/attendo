import { useNavigate } from 'react-router-dom'
import { enterSession } from '../../../../api/actions'
import { FieldInputs, useForm } from '../../../../hooks/useForm'
import { useDialogContext } from '../../../../providers/DialogProvider'
import { AttendFormProps } from '../../AttendForm/AttendForm'

interface UseLoginProps {
  formFields: FieldInputs
  formRef: React.RefObject<HTMLFormElement>
  generateNextForm: React.Dispatch<React.SetStateAction<AttendFormProps | null>>
}

export const useEnterSessionForm = ({
  formFields,
  formRef,
  generateNextForm,
}: UseLoginProps) => {
  const { openDialog } = useDialogContext()
  // const navigate = useNavigate()

  const onSubmit = async (data: any) => {
    const { success, response } = await enterSession(data)
    if (!success)
      openDialog({
        title: 'Error',
        content: response.message || '',
      })

    generateNextForm(response as AttendFormProps)
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
