import React from 'react'
import { Box, Button, Input } from '@chakra-ui/react'
import { useState } from 'react'

interface Props {
  handleAddOption: (value: string) => void
}
const OptionInput = ({ handleAddOption }: Props) => {
  const [option, setOption] = useState('')

  return (
    <Box w="100%" mt="10px">
      <Input
        type="text"
        value={option}
        onChange={(e) => setOption(e.target.value)}
        placeholder="Pass avaliable options there"
      />
      <Button onClick={() => handleAddOption(option)} mt="10px">
        Add option
      </Button>
    </Box>
  )
}

export default OptionInput
