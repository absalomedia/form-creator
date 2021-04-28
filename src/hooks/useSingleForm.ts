import { ISingleForm } from '@types'
import useSWR from 'swr'

const useSingleForm = (id: string) => {
  const { data, error } = useSWR<{ form: ISingleForm }>(`/api/forms/${id}`)

  return {
    form: data as { form: ISingleForm },
    isLoading: !data && !error,
    isError: error,
  }
}

export default useSingleForm
