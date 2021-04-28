import React, { ChangeEvent, memo } from 'react'
import { FormControl, FormLabel, Input } from '@chakra-ui/react'
import { FormFieldsValues, ISingleField } from '@types'

interface Props {
  el: ISingleField
  loading: boolean
  formFieldsValues: FormFieldsValues
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
