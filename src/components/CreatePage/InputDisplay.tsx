import React from 'react'
import { Box } from '@chakra-ui/react'
import { useForm } from '@store'
import SignleInput from './SignleInput'

const InputDisplay: React.FC = (): JSX.Element => {
  const { form } = useForm()
  return (
    <Box width="100%" mt="50px">
      {form.map((input) => (
        <SignleInput key={input.id} input={input} />
      ))}
    </Box>
  )
}

export default InputDisplay
