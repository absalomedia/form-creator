import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { Flex } from '@chakra-ui/react'
import { Layout, Navbar, FormResults, FullScreenSpinner } from '@components'
import { useRouter } from 'next/router'
import React from 'react'

const Statistics = () => {
  const router = useRouter()

  const { id } = router.query

  return (
    <Layout title="Formly | Statistics">
      {!id ? (
        <FullScreenSpinner />
      ) : (
        <>
          <Navbar />
          <Flex w="100%" maxW="1200px" margin="100px auto">
            <FormResults id={id as string} />
          </Flex>
        </>
      )}
    </Layout>
  )
}

export default Statistics

export const getServerSideProps = withPageAuthRequired({ returnTo: '/login' })
