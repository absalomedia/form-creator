import { Button } from '@chakra-ui/button'
import Image from 'next/image'
import { Flex, Heading, Text } from '@chakra-ui/layout'
import { Layout } from '@components'
import { useRouter } from 'next/dist/client/router'
import { useUser } from '@auth0/nextjs-auth0'

export default function Home() {
  const { user, isLoading } = useUser()
  const router = useRouter()

  return (
    <Layout title="Home">
      <Flex
        w="100%"
        minHeight="100vh"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Image alt="logo" src="/logo.png" width="175px" height="175px" />
        <Heading
          as="h1"
          fontSize="44px"
          maxWidth="750px"
          textAlign="center"
          lineHeight="1.1"
          mt="20px"
        >
          Create forms with amazing speed!
        </Heading>
        <Text
          fontSize="25px"
          color="gray.500"
          mt="30px"
          maxWidth="600px"
          textAlign="center"
        >
          Formly is a tool that allows you to make greate forms very quickly!
        </Text>
        <Flex maxWidth="700px" mt="30px">
          <Button
            size="lg"
            colorScheme="facebook"
            isLoading={isLoading}
            onClick={() => router.push(user ? '/dashboard' : '/login')}
          >
            Get started now!
          </Button>
        </Flex>
      </Flex>
    </Layout>
  )
}
