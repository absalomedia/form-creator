import { Schema, model, Document } from 'mongoose'
import { FormField } from './FormField'

interface IForm extends Document {
  title: string
  description: string
  completeTitle: string
  completeDescription: string
  dateOfExipre: Date
  userEmail: string
}

const FormSchema = new Schema(
  {
    userEmail: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    completeTitle: { type: String, required: true },
    completeDescription: { type: String, required: true },
    dateOfExipre: { type: Date, required: true },
    fields: { type: [FormField], required: true },
  },
  { timestamps: true }
)

export default model<IForm>('Form', FormSchema)
