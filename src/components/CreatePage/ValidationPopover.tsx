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
} from '@chakra-ui/react'
import { IFormField } from '@store'
import React from 'react'
import { useState } from 'react'

interface Props {
  input: IFormField
}

const ValidationPopover = ({ input }: Props) => {
  const [regex, setRegex] = useState('')
  const [min, setMin] = useState('')
  const [max, setMax] = useState('')

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
                value={regex}
                onChange={(e) => setRegex(e.target.value)}
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
                <Input
                  type={input.fieldType === 'date' ? 'date' : 'number'}
                  value={min}
                  onChange={(e) => setMin(e.target.value)}
                />
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
                <Input
                  type={input.fieldType === 'date' ? 'date' : 'number'}
                  value={max}
                  onChange={(e) => setMax(e.target.value)}
                />
              </Flex>
            </>
          )}
          <Button mt="20px">Save</Button>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

export default ValidationPopover
