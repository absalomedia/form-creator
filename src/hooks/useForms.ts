import { IForm } from '@types'
import useSWR from 'swr'

const useForms = () => {
  const { data, error, mutate } = useSWR<{ forms: IForm[] }>('/api/get-forms')

  return {
    forms: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  }
}

export default useForms
