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
  Text,
} from '@chakra-ui/react'
import { IOption, ISingleForm } from '@hooks'
import axios from 'axios'

import React, { useState } from 'react'

interface Props {
  form: ISingleForm
  nextStep: () => void
}

interface FormFieldsValues {
  [key: string]: { label: string; answer: number | string[] | string }
}
const validateAnswers = (form: ISingleForm, values: FormFieldsValues) => {
  form.fields.forEach((el) => {
    const value = values[el.name].answer
    if (el.require) {
      if (!value) {
        throw Error(`${el.label} field is required`)
      }

      if (el.fieldType === 'checkbox' && (value as string[]).length === 0) {
        throw Error(`${el.label} field is required`)
      }
    }
    if (el.regexp) {
      const regexp = new RegExp(el.regexp)

      if (!regexp.test(String(value))) {
        throw Error(`${el.label} field value is incorrect`)
      }
    }
  })

  return true
}

const Form = ({ form, nextStep }: Props) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formFieldsValues, setFormFieldValues] = useState({
    ...form.fields.reduce((acc, val) => {
      acc[val.name] = {
        label: val.label,

        answer:
          val.fieldType === 'checkbox'
            ? ([] as string[])
            : val.fieldType === 'number'
            ? val.min
              ? val.min
              : 0
            : val.fieldType === 'radio'
            ? (val.options as IOption[])[0].value
            : '',
      }

      return acc
    }, {} as FormFieldsValues),
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormFieldValues((prev) => ({
      ...prev,
      [e.target.name]: {
        ...prev[e.target.name],
        answer: e.target.value,
      },
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    try {
      validateAnswers(form, formFieldsValues)
    } catch (error) {
      setError(error.message)
      return
    }

    setLoading(true)
    try {
      await axios.post(`/api/answers/${form._id}`, {
        answers: formFieldsValues,
      })

      setLoading(false)
      nextStep()
    } catch (error) {
      setLoading(false)
    }
  }

  return (
    <form
      style={{
        width: '100%',
        maxWidth: '600px',
        display: 'flex',
        flexDirection: 'column',
      }}
      onSubmit={handleSubmit}
    >
      {form.fields.map((el) =>
        ['date', 'email', 'text', 'textarea'].includes(el.fieldType) ? (
          <FormControl
            id={el.id}
            key={el.id}
            marginBottom="20px"
            isDisabled={loading}
          >
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
        ) : el.fieldType === 'radio' ? (
          <RadioGroup
            key={el.id}
            onChange={(e) =>
              setFormFieldValues((prev) => ({
                ...prev,
                [el.name]: { ...prev[el.name], answer: e },
              }))
            }
            value={formFieldsValues[el.name].answer as string}
            name={el.name}
            defaultValue={(el.options as IOption[])[0].value}
          >
            <FormLabel>{el.label}</FormLabel>
            <Stack marginBottom="20px">
              {el.options?.map((el) => (
                <Radio
                  value={el.value}
                  key={el._id}
                  isDisabled={loading}
                  disabled={loading}
                >
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
                [el.name]: { ...prev[el.name], answer: value as string[] },
              }))
            }
          >
            <FormLabel>{el.label}</FormLabel>
            <Stack marginBottom="20px">
              {el.options?.map((el) => (
                <Checkbox
                  value={el.value}
                  key={el._id}
                  isDisabled={loading}
                  disabled={loading}
                >
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
              isDisabled={loading}
              disabled={loading}
              defaultValue={formFieldsValues[el.name].answer as number}
              value={formFieldsValues[el.name].answer as number}
              onChange={(_, valueAsNumber) =>
                setFormFieldValues((prev) => ({
                  ...prev,
                  [el.name]: { ...prev[el.name], answer: valueAsNumber },
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
      {error && (
        <Text color="red.600">
          <b>{error}. </b>
          <br />
          Correct your answer to procced.
        </Text>
      )}
      <Button
        width="fit-content"
        margin="100px auto"
        type="submit"
        isDisabled={loading}
        disabled={loading}
      >
        Save your answers
      </Button>
    </form>
  )
}

export default Form
