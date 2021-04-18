import useSWR from 'swr'

export interface IForm {
  _id: string
  createdAt: string
  dateOfExpire: string
  description: string
  fields: number
  title: string
}

const useForms = () => {
  const { data, error } = useSWR<{ forms: IForm[] }>('/api/get-forms')

  return {
    forms: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export default useForms
