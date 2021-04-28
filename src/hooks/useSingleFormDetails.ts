import { Answer, AuthorForm } from '@types'
import useSWR from 'swr'

const useSingleFormDetails = (id: string) => {
  const { data, error } = useSWR<{ form: AuthorForm; answers: Answer[] }>(
    `/api/details/${id}`
  )

  return {
    data,
    isLoading: !data && !error,
    isError: error,
  }
}

export default useSingleFormDetails
