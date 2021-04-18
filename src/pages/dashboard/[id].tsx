import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { Layout, Navbar } from '@components'
import { useRouter } from 'next/router'
import React from 'react'

const Statistics = () => {
  const router = useRouter()

  const { id } = router.query

  return (
    <Layout title="Formly | Statistics">
      <Navbar />
      {id}
    </Layout>
  )
}

export default Statistics

export const getServerSideProps = withPageAuthRequired({ returnTo: '/login' })
