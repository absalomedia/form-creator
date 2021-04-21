import { Button, Flex, Heading, Text } from '@chakra-ui/react'
import React from 'react'
import Link from 'next/link'
interface Props {
  title: string
  description: string
}

const EndingScreen = ({ title, description }: Props) => {
  return (
    <Flex w="100%" flexDir="column">
      <Heading as="h3" fontSize="26px" fontWeight={700}>
        {title}
      </Heading>
      <Text fontSize="20px" marginTop="20px">
        {description}
      </Text>
      <Link href="/" replace={true}>
        <Button w="fit-content" mt="20px">
          Back to main page
        </Button>
      </Link>
    </Flex>
  )
}

export default EndingScreen
