import { Schema, model, Document, models, Model } from 'mongoose'
import { FormField } from './FormField'

interface IForm extends Document {
  title: string
  description: string
  completeTitle: string
  completeDescription: string
  dateOfExpire: Date
  userEmail: string
}

const FormSchema = new Schema(
  {
    userEmail: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    completeTitle: { type: String, required: true },
    completeDescription: { type: String, required: true },
    dateOfExpire: { type: Date, required: true },
    fields: { type: [FormField], required: true },
  },
  { timestamps: true }
)

export default (models.Form as Model<IForm>) || model<IForm>('Form', FormSchema)
