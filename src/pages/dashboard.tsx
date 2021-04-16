import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { Layout, Navbar } from '@components'
import { useForms } from '@hooks'
import React from 'react'

const Dashboard = () => {
  const { forms } = useForms()
  console.log(forms)
  return (
    <Layout title="Formly | Dashboard">
      <Navbar />
    </Layout>
  )
}

export default Dashboard

export const getServerSideProps = withPageAuthRequired({ returnTo: '/login' })
