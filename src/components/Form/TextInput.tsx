import { FormControl, FormLabel, Input } from '@chakra-ui/react'
import { ISingleField } from '@hooks'
import React, { ChangeEvent, memo } from 'react'

interface Props {
  el: ISingleField
  loading: boolean
  formFieldsValues: {
    [x: string]: {
      label: string
      answer: number | string[] | string
    }
  }
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

const TextInput = memo<Props>(
  ({ el, loading, formFieldsValues, handleChange }) => {
    return (
      <FormControl id={el.id} marginBottom="20px" isDisabled={loading}>
        <FormLabel>{el.label}</FormLabel>
        <Input
          isDisabled={loading}
          disabled={loading}
          type={el.fieldType}
          name={el.name}
          value={formFieldsValues[el.name].answer as string}
          onChange={handleChange}
          min={el.min}
          max={el.max}
          placeholder={el.placeholder}
          as={el.fieldType === 'textarea' ? 'textarea' : 'input'}
          required={el.require}
          isRequired={el.require}
        />
      </FormControl>
    )
  }
)

TextInput.displayName = 'Text input'

export default TextInput
