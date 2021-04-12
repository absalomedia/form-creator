import {
  Editable,
  EditablePreview,
  EditableInput,
  Input,
  Checkbox,
  Divider,
  Flex,
  Radio,
} from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'
import { OptionInput } from '@components'
import {
  handleCheckboxChange,
  handleLabelChange,
  handlePlaceholderChange,
  IFormField,
  useForm,
} from '@store'
import React from 'react'
interface Props {
  input: IFormField
}
const SignleInput = ({ input }: Props) => {
  const { dispatch } = useForm()

  return (
    <Flex maxW="400px" mt="30px" flexDir="column">
      <Flex
        alignSelf="flex-end"
        justifyContent="space-between"
        alignItems="center"
      >
        Delete Input
        <DeleteIcon ml="5px" />
      </Flex>
      <Editable
        value={input.label}
        onChange={(e) => dispatch(handleLabelChange(input.id, e))}
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
            dispatch(handlePlaceholderChange(input.id, e.target.value))
          }
        />
      ) : (
        <OptionInput id={input.id} />
      )}
      {input.options &&
        (input.fieldType === 'checkbox' ? (
          <Flex w="100%" flexDir="column">
            {input.options.map((option, i) => (
              <Flex
                key={i}
                justifyContent="space-between"
                alignItems="center"
                m="5px 0"
              >
                <Checkbox>{option}</Checkbox>
                <DeleteIcon />
              </Flex>
            ))}
          </Flex>
        ) : (
          <Flex w="100%" flexDir="column">
            {input.options.map((option, i) => (
              <Flex
                key={i}
                justifyContent="space-between"
                alignItems="center"
                m="5px 0"
              >
                <Radio>{option}</Radio>
                <DeleteIcon />
              </Flex>
            ))}
          </Flex>
        ))}
      <Checkbox
        mt="20px"
        checked={input.required}
        onChange={(e) =>
          dispatch(handleCheckboxChange(input.id, e.target.checked))
        }
      >
        Mark as required?
      </Checkbox>
      <Divider colorScheme="facebook" mt="30px" />
    </Flex>
  )
}

export default SignleInput
