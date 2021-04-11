import React from 'react'
import { Box, Button, Input } from '@chakra-ui/react'
import { useState } from 'react'

interface Props {
  handleAddOption: (id: string, value: string) => void
  id: string
}
const OptionInput = ({ handleAddOption, id }: Props) => {
  const [option, setOption] = useState('')

  return (
    <Box w="100%" mt="10px">
      <Input
        type="text"
        value={option}
        onChange={(e) => setOption(e.target.value)}
        placeholder="Pass avaliable options there"
      />
      <Button onClick={() => handleAddOption(id, option)} mt="10px">
        Add option
      </Button>
    </Box>
  )
}

export default OptionInput
