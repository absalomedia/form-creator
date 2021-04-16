import { Button, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Navbar = () => {
  return (
    <Flex
      w="100%"
      padding="10px 30px"
      justifyContent="space-between"
      alignItems="center"
    >
      <Image src="/logo.png" alt="logo" width="125px" height="125px" />
      <Flex alignItems="center">
        {links.map((el, i) => (
          <Text
            fontSize="20px"
            colorScheme="facebook"
            cursor="pointer"
            fontWeight="600"
            width="210px"
            textAlign="center"
            key={i}
          >
            <Link href={el.link}>{el.text}</Link>
          </Text>
        ))}

        <Flex w="225px" justifyContent="center">
          <Link href="/api/auth/logout">
            <Button colorScheme="facebook" size="lg">
              Logout
            </Button>
          </Link>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Navbar

const links = [
  {
    text: 'Dashboard',
    link: '/dashboard',
  },
  {
    text: 'Create new form',
    link: '/create',
  },
]
