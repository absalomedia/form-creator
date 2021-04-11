import { IFormField } from 'pages/create'
import React from 'react'
import {
  Box,
  Input,
  Checkbox,
  Editable,
  EditableInput,
  EditablePreview,
  Divider,
} from '@chakra-ui/react'
import OptionInput from './OptionInput'

interface Props {
  inputs: IFormField[]
  handleLabelChange: (id: string, e: string) => void
  handleCheckboxChange: (id: string, e: boolean) => void
  handlePlaceholderChange: (id: string, e: string) => void
}

const InputDisplay: React.FC<Props> = ({
  inputs,
  handleLabelChange,
  handleCheckboxChange,
  handlePlaceholderChange,
}): JSX.Element => {
  const handleAddOption = (newOption: string) => {
    console.log(newOption)
  }

  return (
    <Box width="100%" mt="50px">
      {inputs.map((input) => (
        <Box key={input.id} maxW="400px" mt="30px">
          <Editable
            value={input.label}
            onChange={(e) => handleLabelChange(input.id, e)}
          >
            <EditablePreview w="100%" />
            <EditableInput w="100%" />
          </Editable>
          {input.fieldType !== 'checkbox' && input.fieldType !== 'radio' ? (
            <Input
              placeholder="Type placeholder of the input here"
              type="text"
              mt="10px"
              value={input.placeholder}
              onChange={(e) =>
                handlePlaceholderChange(input.id, e.target.value)
              }
            />
          ) : (
            <OptionInput handleAddOption={handleAddOption} />
          )}
          <Checkbox
            mt="20px"
            checked={input.required}
            onChange={(e) => handleCheckboxChange(input.id, e.target.checked)}
          >
            Mark as required?
          </Checkbox>
          <Divider colorScheme="facebook" mt="30px" />
        </Box>
      ))}
    </Box>
  )
}

export default InputDisplay
