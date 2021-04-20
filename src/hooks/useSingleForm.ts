import { Input } from '@models'
import useSWR from 'swr'

export interface IOption {
  _id: string
  value: string
}

export interface ISingleForm {
  _id: string
  title: string
  description: string
  completeTitle: string
  completeDescription: string
  dateOfExpire: Date
  fields: {
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
  }[]
}

const useSingleForm = (id: string) => {
  const { data, error } = useSWR<{ form: ISingleForm }>(`/api/forms/${id}`)

  return {
    form: data as { form: ISingleForm },
    isLoading: !data && !error,
    isError: error,
  }
}

export default useSingleForm
