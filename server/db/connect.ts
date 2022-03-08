import { connect } from 'mongoose'

export const connectDb = () => {
  connect(process.env.DB_CONNECTION as string)
  console.log('MongoDB Connected')
}
