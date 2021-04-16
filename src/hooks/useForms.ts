import useSWR from 'swr'

const useForms = () => {
  const { data, error } = useSWR('/api/get-forms')

  return {
    forms: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export default useForms
