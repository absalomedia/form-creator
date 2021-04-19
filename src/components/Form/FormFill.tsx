import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Stack,
} from '@chakra-ui/react'
import { IOption, useSingleForm } from '@hooks'
import React, { useState } from 'react'

interface Props {
  id: string
}

const FormFill = ({ id }: Props) => {
  const { form, isError, isLoading } = useSingleForm(id)
  console.log(form)
  const Form = () => {
    const [formFieldsValues, setFormFieldValues] = useState({
      ...form?.form.fields.reduce((acc, val) => {
        acc[val.name] =
          val.fieldType === 'checkbox'
            ? ([] as string[])
            : val.fieldType === 'number'
            ? 0
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
      <div>
        {form?.form.fields.map((el) =>
          ['date', 'email', 'text', 'textarea'].includes(el.fieldType) ? (
            <FormControl id={el.id} key={el.id}>
              <FormLabel>{el.label}</FormLabel>
              <Input
                type={el.fieldType}
                name={el.name}
                value={formFieldsValues.name}
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
              onChange={(e) =>
                setFormFieldValues((prev) => ({ ...prev, [el.fieldType]: e }))
              }
              value={formFieldsValues.name as string}
              name={el.fieldType}
            >
              <Stack direction="row">
                <Radio value="1">First</Radio>
                <Radio value="2">Second</Radio>
                <Radio value="3">Third</Radio>
              </Stack>
            </RadioGroup>
          ) : (
            <div>To implement</div>
          )
        )}
      </div>
    )
  }

  return (
    <Flex w="100%" maxW="1200px" margin="50px auto">
      {!isLoading && !isError && <Form />}
    </Flex>
  )
}

export default FormFill
