import {
  Editable,
  EditablePreview,
  EditableInput,
  Input,
  Checkbox,
  Divider,
  Flex,
  Radio,
  Text,
  Textarea,
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
import { deleteInput, deleteOption } from 'store/actions'
import ValidationPopover from './ValidationPopover'
interface Props {
  input: IFormField
  isSmallLaptop: boolean
}
const SignleInput = ({ input, isSmallLaptop }: Props) => {
  const { dispatch } = useForm()

  return (
    <Flex maxW="400px" mt="30px" flexDir="column" w="100%">
      <Flex justifyContent="space-between" mb="20px">
        <Text fontWeight={700}>Input type: {input.fieldType}</Text>
        <Flex
          alignSelf="flex-end"
          justifyContent="space-between"
          alignItems="center"
          cursor="pointer"
          onClick={() => dispatch(deleteInput(input.id))}
        >
          Delete Input
          <DeleteIcon ml="5px" />
        </Flex>
      </Flex>
      <Editable
        value={input.label}
        onChange={(e) => dispatch(handleLabelChange(input.id, e))}
      >
        <EditablePreview w="100%" />
        <EditableInput w="100%" />
      </Editable>
      {input.fieldType !== 'checkbox' && input.fieldType !== 'radio' ? (
        input.fieldType === 'textarea' ? (
          <Textarea
            placeholder="Type placeholder of the input here"
            rows={5}
            resize="none"
            mt="10px"
            value={input.placeholder}
            onChange={(e) =>
              dispatch(handlePlaceholderChange(input.id, e.target.value))
            }
          />
        ) : (
          <Input
            placeholder="Type placeholder of the input here"
            mt="10px"
            type="text"
            value={input.placeholder}
            onChange={(e) =>
              dispatch(handlePlaceholderChange(input.id, e.target.value))
            }
          />
        )
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
                <Checkbox disabled>{option}</Checkbox>
                <DeleteIcon
                  cursor="pointer"
                  onClick={() => dispatch(deleteOption(input.id, option))}
                />
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
                <Radio disabled>{option}</Radio>
                <DeleteIcon
                  cursor="pointer"
                  onClick={() => dispatch(deleteOption(input.id, option))}
                />
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
      {input.fieldType !== 'checkbox' && input.fieldType !== 'radio' && (
        <ValidationPopover input={input} />
      )}
      <Divider colorScheme="facebook" mt="30px" />
    </Flex>
  )
}

export default SignleInput
