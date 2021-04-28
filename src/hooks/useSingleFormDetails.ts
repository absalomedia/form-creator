import useSWR from 'swr'
import { ISingleForm } from '@hooks'

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
