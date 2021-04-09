import { Flex, Text } from '@chakra-ui/layout'
import { InputsDrawer, Layout, Navbar } from '@components'
import React from 'react'

const CreatePage = () => {
  return (
    <Layout title="Formly | New form">
      <Navbar />
      <Flex w="80%" margin="100px auto" flexDirection="column">
        <Flex alignSelf="center" justifyContent="center" alignItems="center">
          <Text fontSize="24px" fontWeight="600" mr="50px">
            It is time to create new form!
          </Text>
          <InputsDrawer />
        </Flex>
      </Flex>
    </Layout>
  )
}

export default CreatePage
