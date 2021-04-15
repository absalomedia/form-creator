import { Schema, model, Document, Model, models } from 'mongoose'
import { IOption, OptionModel } from './Option'

const InputArr = [
  'checkbox',
  'date',
  'email',
  'number',
  'radio',
  'text',
  'textarea',
]

export type Input =
  | 'checkbox'
  | 'date'
  | 'email'
  | 'number'
  | 'radio'
  | 'text'
  | 'textarea'

export interface IFormField extends Document {
  id: string
  label: string
  require: boolean
  fieldType: Input
  options?: IOption[]
  name: string
  max?: number
  min?: number
  regexp?: string
  placeholder?: string
}

export type FormFieldModel = Model<IFormField>

export const FormField = new Schema<IFormField, FormFieldModel>(
  {
    id: { type: String, required: true },
    label: { type: String, required: false },
    name: { type: String, required: true },
    require: { type: Boolean, required: true },
    fieldType: {
      type: String,
      required: true,
      default: 'text',
      enum: InputArr,
    },
    regexp: { type: String, required: false },
    min: { type: Number, required: false },
    max: { type: Number, required: false },
    maxLength: { type: Number, required: false },
    options: {
      type: [OptionModel],
      required: function (this: IFormField) {
        return this.fieldType === 'checkbox' || this.fieldType === 'radio'
      },
    },
    placeholder: { type: String, required: false },
  },
  { _id: false }
)

export default models.FormField || model<IFormField>('FormField', FormField)
