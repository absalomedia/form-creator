import { Center, Heading, Link } from '@chakra-ui/react'
import { Layout } from '@components'
import Image from 'next/image'
import React from 'react'
import NextLink from 'next/link'

const NotFound = () => {
  return (
    <Layout title="Formly | Not found">
      <Center w="100%" minH="100vh" d="flex" flexDir="column">
        <Image src="/notfound.svg" width={500} height={400} />
        <Heading as="h3" textAlign="center">
          Page not found
        </Heading>
        <Link
          fontSize="26px"
          marginTop="20px"
          color="facebook.600"
          fontWeight={700}
        >
          <NextLink href="/">Go to main page</NextLink>
        </Link>
      </Center>
    </Layout>
  )
}

export default NotFound
