import { attendById } from '../../../../api/actions'
import { FieldInputs, useForm } from '../../../../hooks/useForm'

interface UseAttendFormProps {
  formRef: React.RefObject<HTMLFormElement>
  type: 'text' | 'select'
  sessionId: string
  code: string
  list?: string[]
}

export const useAttendForm = ({
  formRef,
  type: formType,
  sessionId,
  list = [],
  code,
}: UseAttendFormProps) => {
  const formFields: FieldInputs = []
  let selectEl = <></>
  if (formType === 'text')
    formFields.push({
      label: 'Name',
      name: 'name',
      type: 'text',
      placeholder: 'Enter name',
      required: true,
      criteria: [[(c: string) => !!c, 'Name cannot be blank']],
    })
  else if (list.length)
    selectEl = (
      <select defaultValue={list[0]}>
        {list.map((l, i) => (
          <option value={l} key={i}>
            {l}
          </option>
        ))}
      </select>
    )

  const onSubmit = async (data: any) => {
    const { success } = await attendById({
      attendeeId: 'foo',
      session: '123',
      code: '44',
    })
  }

  const { submit, fieldElements: _fieldElements } = useForm({
    onSubmit,
    fields: formFields,
    formRef,
  })

  const fieldElements = (
    <>
      {_fieldElements}
      {selectEl}
      <input
        type="text"
        readOnly
        hidden={true}
        name="sessionId"
        value={sessionId}
      />
      <input type="text" readOnly hidden={true} name="code" value={code} />
    </>
  )

  return { submit, fieldElements }
}
