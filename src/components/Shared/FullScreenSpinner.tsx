import React from 'react'
import { Center, Spinner } from '@chakra-ui/react'

const FullScreenSpinner = () => {
  return (
    <Center w="100%" h="100vh">
      <Spinner size="lg" />
    </Center>
  )
}

export default FullScreenSpinner
