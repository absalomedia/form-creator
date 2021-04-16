import { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { UserProvider } from '@auth0/nextjs-auth0'
import '@fontsource/inter'
import theme from '../styles/global'
import { FormProvider } from '@store'
import { SWRConfig } from 'swr'

const fetcher = (input: RequestInfo, init?: RequestInit) =>
  fetch(input, init).then((res) => res.json())

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig value={{ fetcher }}>
      <FormProvider>
        <UserProvider>
          <ChakraProvider theme={theme}>
            <Component {...pageProps} />
          </ChakraProvider>
        </UserProvider>
      </FormProvider>
    </SWRConfig>
  )
}

export default MyApp
