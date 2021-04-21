import React from 'react'
import { Button, Flex, Heading, Text } from '@chakra-ui/react'
import dayjs from 'dayjs'

interface Props {
  title: string
  description: string
  nextStep: () => void
  expiration: Date
}

const WelcomeScreen = ({ title, description, nextStep, expiration }: Props) => {
  return (
    <Flex w="100%" flexDir="column">
      <Heading as="h3" fontSize="26px" fontWeight={700}>
        {title}
      </Heading>
      <Text fontSize="20px" marginTop="20px">
        {description}
      </Text>
      <Text fontSize="16px" marginTop="20px">
        Date of exipire: <b>{dayjs(expiration).format('DD-MM-YYYY')}</b>
      </Text>
      <Button onClick={() => nextStep()} maxW="fit-content" mt="20px">
        Start filling
      </Button>
    </Flex>
  )
}

export default WelcomeScreen
