import { useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import {
  AttendForm,
  AttendFormProps,
} from '../components/forms/AttendForm/AttendForm'
import { EnterSessionForm } from '../components/forms/EnterSessionForm/EnterSessionForm'

export const AttendSession = () => {
  const { attendanceCode } = useParams()
  const [attendFormProps, setAttendFormProps] =
    useState<AttendFormProps | null>(null)

  return (
    <div>
      <h1>Enter Session Info</h1>
      {
        <EnterSessionForm
          attendanceCode={attendanceCode}
          generateNextForm={setAttendFormProps}
        />
      }
      {attendFormProps && <AttendForm {...attendFormProps} />}
    </div>
  )
}
