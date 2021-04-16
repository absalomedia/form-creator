import React from 'react'
import { Center, Heading } from '@chakra-ui/react'
import Image from 'next/image'

const ErrorInfo = () => {
  return (
    <Center h="80vh" d="flex" flexDir="column">
      <Heading
        color="red.500"
        textAlign="center"
        fontSize="4xl"
        fontWeight={700}
      >
        Unexpected error occured
      </Heading>
      <Image src="/error.svg" width={500} height={500} alt="error" />
    </Center>
  )
}

export default ErrorInfo
