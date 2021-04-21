import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react'
import { IForm } from '@hooks'
import React from 'react'
import dayjs from 'dayjs'
import Link from 'next/link'
interface Props {
  forms: IForm[]
}

const AllForms = ({ forms }: Props) => {
  return (
    <Flex flexDir="column" maxW="1200px" margin="50px auto" w="100%">
      {forms &&
        forms.map((form) => (
          <Flex
            w="100%"
            key={form._id}
            alignItems="center"
            justifyContent="space-between"
            p={8}
            borderStyle="solid"
            borderWidth="2px"
            borderRadius="8px"
            borderColor="facebook.400"
            marginTop="20px"
          >
            <Box>
              <Heading as="h4" fontSize="md" fontWeight={400}>
                Title: <b>{form.title}</b>
              </Heading>
              <Text>
                Description: <b>{form.description}</b>
              </Text>
              <Text>
                Date of creation:{' '}
                <b>{dayjs(form.createdAt).format('DD-MM-YYYY')}</b>
              </Text>
              <Text>
                Date of exipre:{' '}
                <b>{dayjs(form.dateOfExpire).format('DD-MM-YYYY')}</b>
              </Text>
            </Box>
            <Box d="flex" flexDir="column">
              <Link href={`/dashboard/${form._id}`}>
                <Button marginBottom="20px">Checkout statistics</Button>
              </Link>
              <Button
                onClick={() => {
                  typeof window !== 'undefined' &&
                    window.navigator.clipboard.writeText(
                      `https://form-creator.vercel.app/dashboard/${form._id}`
                    )
                }}
              >
                Copy link
              </Button>
            </Box>
          </Flex>
        ))}
    </Flex>
  )
}

export default AllForms
