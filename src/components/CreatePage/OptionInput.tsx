import React, { memo } from 'react'
import { Box, Button, Input } from '@chakra-ui/react'
import { useState } from 'react'
import { handleAddingNewOption, useForm } from '@store'

interface Props {
  id: string
}

const OptionInput = memo<Props>(({ id }) => {
  const [option, setOption] = useState('')
  const { dispatch } = useForm()
  return (
    <Box w="100%" mt="10px">
      <Input
        type="text"
        value={option}
        onChange={(e) => setOption(e.target.value)}
        placeholder="Pass avaliable options there"
      />
      <Button
        onClick={() => {
          if (option) {
            dispatch(handleAddingNewOption(id, option))
            setOption('')
          }
        }}
        mt="10px"
      >
        Add option
      </Button>
    </Box>
  )
})

OptionInput.displayName = 'Option Input'

export default OptionInput
