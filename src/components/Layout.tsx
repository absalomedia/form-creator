import { Flex } from '@chakra-ui/react'
import React from 'react'
import { NextSeo } from 'next-seo'

interface LayoutProps {
  title: string
  children: React.ReactNode
}

const Layout = ({ title, children }: LayoutProps) => {
  return (
    <>
      <NextSeo title={title} />
      <Flex flexDir="column" w="100%" overflow="hidden">
        {children}
      </Flex>
    </>
  )
}

export default Layout
