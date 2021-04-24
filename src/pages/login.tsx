import { Flex, Box, Heading } from '@chakra-ui/layout'
import { Layout } from '@components'
import React from 'react'
import Image from 'next/image'
import { Button } from '@chakra-ui/button'
import { Text, useMediaQuery } from '@chakra-ui/react'
import Link from 'next/link'
import { GetServerSideProps } from 'next'
import { getSession } from '@auth0/nextjs-auth0'

const Login = () => {
  const [isMobile] = useMediaQuery('(max-width: 768px)')

  return (
    <Layout title="Formly | Login">
      <Flex minH="100vh" flexDir="column" p="0 10px">
        <Box p={5} d="flex" justifyContent={isMobile ? 'center' : 'flex-start'}>
          <Image src="/logo.png" alt="logo" width="150" height="150" />
        </Box>
        <Flex
          alignSelf="center"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Heading
            as="h2"
            fontSize={isMobile ? '2xl' : '4xl'}
            textAlign="center"
            color="gray.800"
          >
            Start creating awesome forms!
          </Heading>
          <Text
            mt="20px"
            fontSize={isMobile ? 'lg' : 'xl'}
            fontWeight="600"
            color="gray.500"
          >
            Just in few steps
          </Text>
          <Image
            src="/login.svg"
            alt="login"
            width={isMobile ? '400' : '500'}
            height={isMobile ? '400' : '500'}
          />
          <Button size="lg" colorScheme="facebook">
            <Link href="/api/auth/login">Start with an account</Link>
          </Button>
        </Flex>
      </Flex>
    </Layout>
  )
}

export default Login

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const user = getSession(req, res)

  if (user) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      },
    }
  }

  return { props: {} }
}
