import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { Flex, Text } from '@chakra-ui/layout'
import { useMediaQuery } from '@chakra-ui/react'
import { InputsDrawer, Layout, Navbar, InputDisplay } from '@components'
import React from 'react'

const CreatePage = () => {
  const [isSmallLaptop] = useMediaQuery('(max-width: 1024px)')
  return (
    <Layout title="Formly | New form">
      <Navbar />
      <Flex
        w="80%"
        margin={isSmallLaptop ? 'auto' : '100px auto'}
        flexDirection="column"
        position="relative"
      >
        <Flex alignSelf="center" justifyContent="center" alignItems="center">
          <Text
            fontSize="24px"
            fontWeight="600"
            mr="50px"
            textAlign="center"
            display={isSmallLaptop ? 'none' : 'block'}
          >
            It is time to create new form!
          </Text>
          <InputsDrawer />
        </Flex>
        <InputDisplay />
      </Flex>
    </Layout>
  )
}

export default CreatePage

export const getServerSideProps = withPageAuthRequired({ returnTo: '/login' })
