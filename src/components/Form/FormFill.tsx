import { Flex } from '@chakra-ui/react'
import { useSingleForm } from '@hooks'
import React from 'react'
import Form from './Form'

interface Props {
  id: string
}

const FormFill = ({ id }: Props) => {
  const { form, isError, isLoading } = useSingleForm(id)

  return (
    <Flex w="100%" maxW="1200px" margin="50px auto">
      {!isLoading && !isError && <Form form={form.form} />}
    </Flex>
  )
}

export default FormFill
