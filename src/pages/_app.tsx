import { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { UserProvider } from '@auth0/nextjs-auth0'
import '@fontsource/inter'
import theme from '../styles/global'
import { FormProvider } from '@store'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <FormProvider>
      <UserProvider>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </UserProvider>
    </FormProvider>
  )
}

export default MyApp
