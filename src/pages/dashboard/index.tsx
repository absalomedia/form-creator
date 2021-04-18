import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { Center, Spinner } from '@chakra-ui/react'
import { AllForms, Layout, Navbar, NoFormsInfo, ErrorInfo } from '@components'
import { useForms } from '@hooks'
import React from 'react'

const Dashboard = () => {
  const { isLoading, isError, forms } = useForms()

  console.log(forms)
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
          <AllForms forms={forms.forms} />
        ))}
      {isError && <ErrorInfo />}
    </Layout>
  )
}

export default Dashboard

export const getServerSideProps = withPageAuthRequired({ returnTo: '/login' })
