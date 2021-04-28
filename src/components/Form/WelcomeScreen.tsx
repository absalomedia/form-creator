import React, { memo } from 'react'
import { Button, Center, Flex, Heading, Text } from '@chakra-ui/react'
import dayjs from 'dayjs'
import Image from 'next/image'
import Link from 'next/link'
interface Props {
  title: string
  description: string
  nextStep: () => void
  expiration: Date
}

const WelcomeScreen = memo(
  ({ title, description, nextStep, expiration }: Props) => {
    const isValid = dayjs(expiration).isAfter(dayjs(Date.now()))

    if (!isValid) {
      return (
        <Center w="100%" d="flex" flexDir="column">
          <Image src="/expired.svg" width={500} height={500} alt="exipred" />
          <Heading
            fontSize="26px"
            textAlign="center"
            color="facebook.600"
            as="h5"
          >
            Sorry form has expired
          </Heading>
          <Link href="/" replace={true}>
            <Button colorScheme="facebook" size="lg" marginTop="20px">
              Back to the main page
            </Button>
          </Link>
        </Center>
      )
    }

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
)

WelcomeScreen.displayName = 'Welcome screen'

export default WelcomeScreen
