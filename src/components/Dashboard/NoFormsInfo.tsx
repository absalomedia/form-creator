import { Center, Link, Text } from '@chakra-ui/react'
import React from 'react'
import NextLink from 'next/link'
import Image from 'next/image'

const NoFormsInfo = () => {
  return (
    <Center h="80vh" flexDir="column" d="flex">
      <Text fontSize="4xl" textAlign="center" fontWeight={700}>
        No forms
      </Text>
      <NextLink href="/create">
        <Link fontSize="4xl" textAlign="center" fontWeight={700}>
          Go to create page!
        </Link>
      </NextLink>
      <Image src="/compose.svg" width={500} height={500} alt="compose" />
    </Center>
  )
}

export default NoFormsInfo
