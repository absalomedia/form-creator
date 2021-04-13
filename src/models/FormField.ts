import { Schema, model, Document, Model } from 'mongoose'
import { IOption, Option } from './Option'

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
  label: string
  required: boolean
  fieldType: Input
  options?: IOption[]
  name: string
  max?: number
  min?: number
  regexp?: RegExp
  placeholder?: string
}

export type FormFieldModel = Model<IFormField>

export const FormField = new Schema<IFormField, FormFieldModel>({
  label: { type: String, required: true },
  name: { type: String, required: true },
  required: { type: Boolean, required: true },
  fieldType: { type: String, required: true, default: 'text', enum: InputArr },
  regexp: { type: RegExp, required: false },
  min: { type: Number, required: false },
  max: { type: Number, required: false },
  maxLength: { type: Number, required: false },
  options: {
    type: [Option],
    required: function (this: IFormField) {
      return this.fieldType === 'checkbox' || this.fieldType === 'radio'
    },
  },
  placeholder: { type: String, required: false },
})

export default model<IFormField>('FormField', FormField)
