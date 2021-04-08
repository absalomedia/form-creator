import { Flex, Box, Heading } from '@chakra-ui/layout'
import { Layout } from '@components'
import React from 'react'
import Image from 'next/image'
import { Button } from '@chakra-ui/button'
import { Text } from '@chakra-ui/react'
import Link from 'next/link'

const Login = () => {
  return (
    <Layout title="Login">
      <Flex minH="100vh" flexDir="column">
        <Box p={5}>
          <Image src="/logo.png" alt="logo" width="150" height="150" />
        </Box>
        <Flex
          alignSelf="center"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Heading as="h2" fontSize="4xl" textAlign="center" color="gray.800">
            Start creating awesome forms!
          </Heading>
          <Text mt="20px" fontSize="25px" fontWeight="600" color="gray.500">
            Just in few steps
          </Text>
          <Image src="/login.svg" alt="login" width="500" height="500" />
          <Button size="lg" colorScheme="purple">
            <Link href="/api/auth/login">Start with an account</Link>
          </Button>
        </Flex>
      </Flex>
    </Layout>
  )
}

export default Login
