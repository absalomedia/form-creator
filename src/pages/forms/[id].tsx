import { Center, Spinner } from '@chakra-ui/react'
import { FormFill, Layout, Navbar } from '@components'

import { useRouter } from 'next/router'
import React from 'react'

const SingleForm = () => {
  const router = useRouter()
  const { id } = router.query

  return (
    <Layout title="FORMLY | Fill form">
      {!id ? (
        <Center w="100%" h="100vh">
          <Spinner size="lg" />
        </Center>
      ) : (
        <>
          <Navbar />
          <FormFill id={id as string} />
        </>
      )}
    </Layout>
  )
}

export default SingleForm
