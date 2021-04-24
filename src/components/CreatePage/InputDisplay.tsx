import React from 'react'
import {
  Button,
  Center,
  Flex,
  Heading,
  Input,
  Text,
  Textarea,
  useMediaQuery,
} from '@chakra-ui/react'
import { useForm } from '@store'
import SignleInput from './SignleInput'
import { useState } from 'react'
import Img from 'next/image'
import { useRouter } from 'next/dist/client/router'
import axios from 'axios'

function hasDuplicates(array: string[]) {
  return Array.from(new Set(array)).length !== array.length
}

const InputDisplay: React.FC = (): JSX.Element => {
  const { form } = useForm()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [completeTitle, setCompleteTitle] = useState('')
  const [completeDescription, setCompleteDescription] = useState('')
  const [dateOfExpire, setDateOfExpire] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const [isSmallLaptop] = useMediaQuery('(max-width: 1024px)')

  const handleCreateNewForm = async () => {
    if (hasDuplicates(form.map((el) => el.label))) {
      setError('Inputs contain duplicate labels')
      return
    }

    setLoading(true)
    setError('')
    try {
      await axios.post(
        '/api/form',
        {
          title,
          description,
          completeTitle,
          completeDescription,
          dateOfExpire,
          formFields: form,
        },
        { withCredentials: true }
      )

      setLoading(false)
      router.push('/dashboard')
    } catch (error) {
      setError(error.response.data.message)
      setLoading(false)
    }
  }

  return (
    <>
      <Flex
        width="100%"
        mt="50px"
        justifyContent={isSmallLaptop ? 'center' : 'space-between'}
        alignItems={isSmallLaptop ? 'center' : 'flex-start'}
        p="0 10px"
        flexDir={isSmallLaptop ? 'column' : 'row'}
      >
        <Flex
          flexDir="column"
          w={isSmallLaptop ? '100%' : '50%'}
          alignItems={isSmallLaptop ? 'center' : 'flex-start'}
        >
          {form.length !== 0 ? (
            form.map((input) => (
              <SignleInput
                key={input.id}
                input={input}
                isSmallLaptop={isSmallLaptop}
              />
            ))
          ) : (
            <Center height="600px" d="flex" flexDir="column">
              <Text fontSize="26px" fontWeight="700">
                Click button to add input
              </Text>
              <Img src="/add.svg" alt="add" width={400} height={440} />
            </Center>
          )}
        </Flex>
        <Flex
          w={isSmallLaptop ? '100%' : '30%'}
          maxW="400px"
          flexDir="column"
          marginTop={isSmallLaptop ? '30px' : '0'}
        >
          <Text fontWeight="600">Title</Text>
          <Input
            placeholder="What is the title of your form?"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            mb="20px"
          />
          <Text fontWeight="600">Description</Text>
          <Textarea
            type="text"
            value={description}
            placeholder="What is the description of your form?"
            onChange={(e) => setDescription(e.target.value)}
            mb="20px"
            resize="none"
            rows={5}
          />
          <Text fontWeight="600">Complete Title</Text>
          <Input
            type="text"
            placeholder="What title will user see after finishing?"
            value={completeTitle}
            onChange={(e) => setCompleteTitle(e.target.value)}
            mb="20px"
          />
          <Text fontWeight="600">Complete Description</Text>
          <Textarea
            resize="none"
            type="text"
            placeholder="What description will user see after finishing?"
            value={completeDescription}
            onChange={(e) => setCompleteDescription(e.target.value)}
            mb="20px"
            rows={5}
          />
          <Text fontWeight="600">
            Date of exipre (When will the form be unvaliable?)
          </Text>
          <Input
            type="date"
            value={dateOfExpire}
            onChange={(e) => setDateOfExpire(e.target.value)}
          />
        </Flex>
      </Flex>
      <Button
        isLoading={loading}
        isDisabled={
          form.length === 0 ||
          !title ||
          !description ||
          !completeDescription ||
          !completeTitle ||
          !dateOfExpire
        }
        maxWidth="fit-content"
        margin="50px auto"
        onClick={() => {
          handleCreateNewForm()
        }}
      >
        Create
      </Button>
      {error && (
        <Heading margin="30px auto 0 auto" color="red.500" fontSize="28px">
          {error}
        </Heading>
      )}
    </>
  )
}

export default InputDisplay
