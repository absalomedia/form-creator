import { FormFill, FullScreenSpinner, Layout, Navbar } from '@components'
import { useRouter } from 'next/router'
import React from 'react'

const SingleForm = () => {
  const router = useRouter()
  const { id } = router.query

  return (
    <Layout title="FORMLY | Fill form">
      {!id ? (
        <FullScreenSpinner />
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
