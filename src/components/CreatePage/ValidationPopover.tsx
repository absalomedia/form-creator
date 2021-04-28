import React, { useState } from 'react'
import {
  Button,
  Flex,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from '@chakra-ui/react'
import { updateValidation, useForm } from '@store'
import { IFormField } from '@types'

interface Props {
  input: IFormField
}

const ValidationPopover = ({ input }: Props) => {
  const [regexp, setRegexp] = useState(input.regexp || '')
  const [min, setMin] = useState(input.min || '')
  const [max, setMax] = useState(input.max || '')
  const { dispatch } = useForm()

  const handleValidationChange = () => {
    dispatch(updateValidation(input.id, { regexp, min, max }))
  }

  return (
    <Popover>
      <PopoverTrigger>
        <Button w="fit-content" mt="20px">
          Validate?
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader fontWeight={700}>Validation?</PopoverHeader>
        <PopoverBody d="flex" flexDirection="column">
          {input.fieldType !== 'date' && (
            <Flex
              w="100%"
              alignItems="center"
              justifyContent="center"
              mt="10px"
            >
              <Text mr="10px" w="60px">
                Regex:
              </Text>
              <Input
                type="text"
                value={regexp}
                onChange={(e) => setRegexp(e.target.value)}
              />
            </Flex>
          )}
          {input.fieldType !== 'email' && (
            <>
              <Flex
                w="100%"
                alignItems="center"
                justifyContent="center"
                mt="10px"
              >
                <Text mr="10px" w="60px">
                  Min
                </Text>
                {input.fieldType === 'date' ? (
                  <Input
                    type="date"
                    value={min}
                    onChange={(e) => setMin(e.target.value)}
                  />
                ) : (
                  <NumberInput value={min} onChange={(e) => setMin(e)}>
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                )}
              </Flex>
              <Flex
                w="100%"
                alignItems="center"
                justifyContent="center"
                mt="10px"
              >
                <Text mr="10px" w="60px">
                  Max:
                </Text>
                {input.fieldType === 'date' ? (
                  <Input
                    type="date"
                    value={max}
                    onChange={(e) => setMax(e.target.value)}
                  />
                ) : (
                  <NumberInput value={max} onChange={(e) => setMax(e)}>
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                )}
              </Flex>
            </>
          )}
          <Button mt="20px" onClick={() => handleValidationChange()}>
            Save
          </Button>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

export default ValidationPopover
