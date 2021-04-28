import React, { memo } from 'react'
import dayjs from 'dayjs'
import {
  Flex,
  Box,
  Heading,
  Button,
  Text,
  useClipboard,
} from '@chakra-ui/react'
import Link from 'next/link'
import { IForm } from '@hooks'
import WarnDialog from 'components/Shared/WarnDialog'

interface Props {
  form: IForm
  handleDelete: (id: string) => Promise<void>
  isPhone: boolean
}
const SingleForm = memo<Props>(({ form, handleDelete, isPhone }) => {
  const { hasCopied, onCopy } = useClipboard(
    `${
      process.env.NODE_ENV === 'production'
        ? 'https://form-creator.vercel.app/'
        : 'http://localhost:3000/'
    }forms/${form._id}`
  )

  return (
    <Flex
      w="100%"
      alignItems="center"
      justifyContent="space-between"
      p={8}
      borderStyle="solid"
      borderWidth="2px"
      borderRadius="8px"
      borderColor="facebook.400"
      marginTop="20px"
      flexDir={isPhone ? 'column' : 'row'}
    >
      <Box textAlign={isPhone ? 'center' : 'left'}>
        <Heading as="h4" fontSize="md" fontWeight={400}>
          Title: <b>{form.title}</b>
        </Heading>
        <Text>
          Description: <b>{form.description}</b>
        </Text>
        <Text>
          Date of creation: <b>{dayjs(form.createdAt).format('DD-MM-YYYY')}</b>
        </Text>
        <Text>
          Date of exipre: <b>{dayjs(form.dateOfExpire).format('DD-MM-YYYY')}</b>
        </Text>
      </Box>

      <Box d="flex" flexDir="column" marginTop={isPhone ? '20px' : '0'}>
        <Link href={`/dashboard/${form._id}`}>
          <Button marginBottom="20px">Checkout statistics</Button>
        </Link>
        <Button marginBottom="20px" onClick={onCopy}>
          {hasCopied ? 'Link copied' : 'Copy link'}
        </Button>

        <WarnDialog close={() => handleDelete(form._id)} />
      </Box>
    </Flex>
  )
})

SingleForm.displayName = 'Single form'

export default SingleForm
