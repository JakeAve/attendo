import { useRef } from 'react'
import { FieldInputs } from '../../../hooks/useForm'
import { AttendFormProps } from '../AttendForm/AttendForm'
import { useEnterSessionForm } from './hooks/useEnterSessionForm'

interface EnterSessionFormProps {
  attendanceCode?: string
  generateNextForm: React.Dispatch<React.SetStateAction<AttendFormProps | null>>
}

export const EnterSessionForm = ({
  attendanceCode = '',
  generateNextForm,
}: EnterSessionFormProps) => {
  const formRef = useRef<HTMLFormElement>(null)

  const formFields: FieldInputs = [
    {
      label: 'Attendance Code',
      name: 'code',
      type: 'text',
      placeholder: 'Enter Code',
      required: true,
      criteria: [[(c) => !!c, 'Code cannot be blank']],
      defaultValue: attendanceCode,
    },
  ]

  const { submit, change, fieldElements } = useEnterSessionForm({
    formFields,
    formRef,
    generateNextForm,
  })

  // const shouldHide = !!attendanceCode

  return (
    <>
      <form
        // hidden={shouldHide}
        onSubmit={submit}
        onChange={change}
        ref={formRef}
      >
        {fieldElements}
        <button type="submit">Enter Session</button>
      </form>
    </>
  )
}
