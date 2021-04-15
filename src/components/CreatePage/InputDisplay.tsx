import React from 'react'
import {
  Box,
  Button,
  Center,
  Flex,
  Input,
  Text,
  Textarea,
} from '@chakra-ui/react'
import { useForm } from '@store'
import SignleInput from './SignleInput'
import { useState } from 'react'
import Img from 'next/image'

const InputDisplay: React.FC = (): JSX.Element => {
  const { form, handleCreateNewForm } = useForm()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [completeTitle, setCompleteTitle] = useState('')
  const [completeDescription, setCompleteDescription] = useState('')
  const [dateOfExpire, setDateOfExpire] = useState('')

  return (
    <>
      <Flex width="100%" mt="50px" justifyContent="space-between">
        <Flex flexDir="column" w="50%" minW="500px">
          {form.length !== 0 ? (
            form.map((input) => <SignleInput key={input.id} input={input} />)
          ) : (
            <Center height="600px" d="flex" flexDir="column">
              <Text fontSize="26px" fontWeight="700">
                Click button above to add input
              </Text>
              <Img src="/add.svg" alt="add" width={400} height={440} />
            </Center>
          )}
        </Flex>
        <Box minWidth="400px" w="30%">
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
        </Box>
      </Flex>

      <Button
        isDisabled={
          form.length === 0 ||
          !title ||
          !description ||
          !completeDescription ||
          !completeTitle ||
          !dateOfExpire
        }
        maxWidth="fit-content"
        margin="100px auto"
        onClick={async () => {
          handleCreateNewForm({
            title,
            description,
            completeDescription,
            completeTitle,
            dateOfExpire,
          })
        }}
      >
        Create
      </Button>
    </>
  )
}

export default InputDisplay
