import { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { UserProvider } from '@auth0/nextjs-auth0'
import axios from 'axios'
import theme from '../styles/global'
import { FormProvider } from '@store'
import { SWRConfig } from 'swr'
import '@fontsource/inter'

const fetcher = (url: string) => axios.get(url).then((res) => res.data)

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
