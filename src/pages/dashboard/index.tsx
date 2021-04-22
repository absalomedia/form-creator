import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { Center, Spinner } from '@chakra-ui/react'
import { AllForms, Layout, Navbar, NoFormsInfo, ErrorInfo } from '@components'
import { IForm, useForms } from '@hooks'
import React from 'react'

const Dashboard = () => {
  const { isLoading, isError, forms, mutate } = useForms()

  const handleDelete = async (id: string) => {
    const response = await fetch(`/api/forms/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    })

    if (response.ok) {
      mutate({
        forms: [...(forms?.forms.filter((form) => form._id !== id) as IForm[])],
      })
    }
  }

  return (
    <Layout title="Formly | Dashboard">
      <Navbar />
      {isLoading && (
        <Center height="500px">
          <Spinner colorScheme="facebook" size="lg" />
        </Center>
      )}
      {forms &&
        (forms.forms.length === 0 ? (
          <NoFormsInfo />
        ) : (
          <AllForms forms={forms.forms} handleDelete={handleDelete} />
        ))}
      {isError && <ErrorInfo />}
    </Layout>
  )
}

export default Dashboard

export const getServerSideProps = withPageAuthRequired({ returnTo: '/login' })
