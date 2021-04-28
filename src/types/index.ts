import { Input } from '@models'

export interface IForm {
  _id: string
  createdAt: string
  dateOfExpire: string
  description: string
  fields: number
  title: string
}

export interface IOption {
  _id: string
  value: string
}
export interface ISingleField {
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

export interface ISingleForm {
  _id: string
  title: string
  description: string
  completeTitle: string
  completeDescription: string
  dateOfExpire: Date
  fields: ISingleField[]
}

export interface AuthorForm extends ISingleForm {
  createdAt: Date
  updatedAt: Date
}

export interface Answer {
  _id: string
  createdAt: Date
  answers: {
    _id: string
    label: string
    answer: number | string[] | string
  }[]
}

export interface IFormField {
  id: string
  label: string
  required: boolean
  fieldType: Input
  options?: string[]
  name: string
  max?: string
  min?: string
  regexp?: string
  placeholder?: string
}

export interface FormFieldsValues {
  [key: string]: { label: string; answer: number | string[] | string }
}
