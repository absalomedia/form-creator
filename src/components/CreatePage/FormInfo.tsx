import { Box, Input, Flex, Button, Text } from '@chakra-ui/react'
import { useForm } from '@store'
import React, { useState } from 'react'

const FormInfo = () => {
  const { form, handleCreateNewForm } = useForm()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [completeTitle, setCompleteTitle] = useState('')
  const [completeDescription, setCompleteDescription] = useState('')
  const [dateOfExpire, setDateOfExpire] = useState('')

  return (
    <>
      <Box maxWidth="400px">
        <Text>Title</Text>
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Text>Description</Text>
        <Input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Text>Complete Title</Text>
        <Input
          type="text"
          value={completeTitle}
          onChange={(e) => setCompleteTitle(e.target.value)}
        />
        <Text>Complete Description</Text>
        <Input
          type="text"
          value={completeDescription}
          onChange={(e) => setCompleteDescription(e.target.value)}
        />
        <Text>Date of exipre</Text>
        <Input
          type="date"
          value={dateOfExpire}
          onChange={(e) => setDateOfExpire(e.target.value)}
        />
      </Box>
      
  )
}

export default FormInfo
