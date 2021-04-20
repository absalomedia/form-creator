import {
  Button,
  Checkbox,
  CheckboxGroup,
  FormControl,
  FormLabel,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Radio,
  RadioGroup,
  Stack,
} from '@chakra-ui/react'
import { IOption, ISingleForm } from '@hooks'

import React, { useState } from 'react'

interface Props {
  form: ISingleForm
}
const Form = ({ form }: Props) => {
  const [formFieldsValues, setFormFieldValues] = useState({
    ...form.fields.reduce((acc, val) => {
      acc[val.name] =
        val.fieldType === 'checkbox'
          ? ([] as string[])
          : val.fieldType === 'number'
          ? val.min
            ? val.min
            : 0
          : val.fieldType === 'radio'
          ? (val.options as IOption[])[0].value
          : ''

      return acc
    }, {} as { [key: string]: number | string[] | string }),
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormFieldValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <form
      style={{
        width: '100%',
        maxWidth: '600px',
        display: 'flex',
        flexDirection: 'column',
      }}
      onSubmit={(e) => {
        e.preventDefault()
        console.log(formFieldsValues)
      }}
    >
      {form.fields.map((el) =>
        ['date', 'email', 'text', 'textarea'].includes(el.fieldType) ? (
          <FormControl id={el.id} key={el.id} marginBottom="20px">
            <FormLabel>{el.label}</FormLabel>
            <Input
              type={el.fieldType}
              name={el.name}
              value={formFieldsValues[el.name] as string}
              onChange={handleChange}
              min={el.min}
              max={el.max}
              placeholder={el.placeholder}
              as={el.fieldType === 'textarea' ? 'textarea' : 'input'}
              required={el.require}
              isRequired={el.require}
            />
          </FormControl>
        ) : el.fieldType === 'radio' ? (
          <RadioGroup
            key={el.id}
            onChange={(e) =>
              setFormFieldValues((prev) => ({ ...prev, [el.name]: e }))
            }
            value={formFieldsValues[el.name] as string}
            name={el.name}
            defaultValue={(el.options as IOption[])[0].value}
          >
            <FormLabel>{el.label}</FormLabel>
            <Stack marginBottom="20px">
              {el.options?.map((el) => (
                <Radio value={el.value} key={el._id}>
                  {el.value}
                </Radio>
              ))}
            </Stack>
          </RadioGroup>
        ) : el.fieldType === 'checkbox' ? (
          <CheckboxGroup
            key={el.id}
            onChange={(value) =>
              setFormFieldValues((prev) => ({
                ...prev,
                [el.name]: value as string[],
              }))
            }
          >
            <FormLabel>{el.label}</FormLabel>
            <Stack marginBottom="20px">
              {el.options?.map((el) => (
                <Checkbox value={el.value} key={el._id}>
                  {el.value}
                </Checkbox>
              ))}
            </Stack>
          </CheckboxGroup>
        ) : (
          <React.Fragment key={el.id}>
            <FormLabel>{el.label}</FormLabel>
            <NumberInput
              isRequired={el.require}
              name={el.name}
              step={1}
              min={el.min}
              max={el.max}
              defaultValue={formFieldsValues[el.name] as number}
              value={formFieldsValues[el.name] as number}
              onChange={(_, valueAsNumber) =>
                setFormFieldValues((prev) => ({
                  ...prev,
                  [el.name]: valueAsNumber,
                }))
              }
              marginBottom="20px"
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </React.Fragment>
        )
      )}
      <Button width="fit-content" margin="100px auto" type="submit">
        Save your answers
      </Button>
    </form>
  )
}

export default Form
