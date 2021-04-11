import { Flex, Text } from '@chakra-ui/layout'
import { InputsDrawer, Layout, Navbar, InputDisplay } from '@components'
import { Input } from 'models/FormField'
import React, { ChangeEvent, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
export interface IFormField {
  id: string
  label: string
  required: boolean
  fieldType: Input
  options?: string[]
  name: string
  maxLength?: string
  max?: number
  min?: number
  regexp?: RegExp
  placeholder?: string
}

const CreatePage = () => {
  const [form, setForm] = useState<IFormField[]>([] as IFormField[])

  const handleNewInput = (inputType: Input) => {
    setForm((prev) => [
      ...prev,
      {
        id: uuidv4(),
        label: 'Default label',
        required: false,
        fieldType: inputType,
        name: '',
      },
    ])
  }

  const handleLabelChange = (id: string, inputValue: string) => {
    setForm((prev) => {
      const index = prev.findIndex((el) => el.id === id)
      prev[index] = { ...prev[index], label: inputValue }
      return [...prev]
    })
  }

  const handleCheckboxChange = (id: string, checked: boolean) => {
    setForm((prev) => {
      const index = prev.findIndex((el) => el.id === id)
      prev[index] = { ...prev[index], required: checked }
      return [...prev]
    })
  }

  const handlePlaceholderChange = (id: string, inputValue: string) => {
    setForm((prev) => {
      const index = prev.findIndex((el) => el.id === id)
      prev[index] = { ...prev[index], placeholder: inputValue }
      return [...prev]
    })
  }

  return (
    <Layout title="Formly | New form">
      <Navbar />
      <Flex w="80%" margin="100px auto" flexDirection="column">
        <Flex alignSelf="center" justifyContent="center" alignItems="center">
          <Text fontSize="24px" fontWeight="600" mr="50px">
            It is time to create new form!
          </Text>
          <InputsDrawer handleClick={handleNewInput} />
        </Flex>
        <InputDisplay
          inputs={form}
          handleLabelChange={handleLabelChange}
          handleCheckboxChange={handleCheckboxChange}
          handlePlaceholderChange={handlePlaceholderChange}
        />
      </Flex>
    </Layout>
  )
}

export default CreatePage
