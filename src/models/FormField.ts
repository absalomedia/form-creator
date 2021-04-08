import { Schema, model, Document, Model } from 'mongoose'
import { IOption, Option } from './Option'

const InputArr = [
  'checkbox',
  'date',
  'email',
  'number',
  'radio',
  'select',
  'text',
  'textarea',
]

type Input =
  | 'checkbox'
  | 'date'
  | 'email'
  | 'number'
  | 'radio'
  | 'select'
  | 'text'
  | 'textarea'

interface IFormField extends Document {
  label: string
  required: boolean
  fieldType: Input
  options?: IOption[]
  name: string
  maxLength?: string
  max?: number
  min?: number
  autofocus?: boolean
  regexp?: RegExp
  placeholder?: string
}

export type FormFieldModel = Model<IFormField>

export const FormField = new Schema<IFormField, FormFieldModel>({
  label: { type: String, required: true },
  name: { type: String, required: true },
  required: { type: Boolean, required: true },
  fieldType: { type: String, required: true, default: 'text', enum: InputArr },
  autofocus: { type: Boolean, default: false },
  regexp: { type: RegExp, required: false },
  min: { type: Number, required: false },
  max: { type: Number, required: false },
  maxLength: { type: Number, required: false },
  options: {
    type: [Option],
    required: function (this: IFormField) {
      return (
        this.fieldType === 'checkbox' ||
        this.fieldType === 'select' ||
        this.fieldType === 'radio'
      )
    },
  },
  placeholder: { type: String, required: false },
})

export default model<IFormField>('FormField', FormField)
