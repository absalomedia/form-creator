import {
  Button,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useMediaQuery,
} from '@chakra-ui/react'
import React from 'react'
import Image from 'next/image'
import {
  HamburgerIcon,
  AddIcon,
  ViewIcon,
  ArrowBackIcon,
  ArrowForwardIcon,
} from '@chakra-ui/icons'
import Link from 'next/link'
import { useUser } from '@auth0/nextjs-auth0'

const Navbar = () => {
  const [isMobile] = useMediaQuery('(max-width: 768px)')
  const { user, isLoading } = useUser()
  return (
    <Flex
      w="100%"
      padding="10px 30px"
      justifyContent="space-between"
      alignItems="center"
    >
      <Image src="/logo.png" alt="logo" width="125px" height="125px" />
      <Flex alignItems="center" display={isMobile ? 'none' : 'flex'}>
        {!isLoading &&
          user &&
          links.map((el, i) => (
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
          {user ? (
            <Link href="/api/auth/logout">
              <Button colorScheme="facebook" size="lg">
                Logout
              </Button>
            </Link>
          ) : (
            <Link href="/">
              <Button colorScheme="facebook" size="lg" isLoading={isLoading}>
                Login now!
              </Button>
            </Link>
          )}
        </Flex>
      </Flex>

      {isMobile && (
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<HamburgerIcon />}
            variant="outline"
          />
          <MenuList>
            {!isLoading && user && (
              <>
                <Link href="/dashboard">
                  <MenuItem icon={<ViewIcon />}>Go to dashboard</MenuItem>
                </Link>
                <Link href="/create">
                  <MenuItem icon={<AddIcon />}>Create new form</MenuItem>
                </Link>
              </>
            )}

            {user ? (
              <Link href="/api/auth/logout">
                <MenuItem icon={<ArrowBackIcon />}>Logout</MenuItem>
              </Link>
            ) : (
              <Link href="/">
                <MenuItem icon={<ArrowForwardIcon />}>Login</MenuItem>
              </Link>
            )}
          </MenuList>
        </Menu>
      )}
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
