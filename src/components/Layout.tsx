import React, { memo } from 'react'
import { Flex } from '@chakra-ui/react'
import { NextSeo } from 'next-seo'

interface LayoutProps {
  title: string
  children: React.ReactNode
}

const Layout = memo<LayoutProps>(({ title, children }) => {
  return (
    <>
      <NextSeo title={title} />
      <Flex flexDir="column" w="100%" overflow="hidden">
        {children}
      </Flex>
    </>
  )
})

Layout.displayName = 'Layout'

export default Layout
