import { Flex, useMediaQuery } from '@chakra-ui/react'
import { IForm } from '@types'
import React from 'react'
import SingleForm from './SingleForm'

interface Props {
  forms: IForm[]
  handleDelete: (id: string) => Promise<void>
}

const AllForms = ({ forms, handleDelete }: Props) => {
  const [isPhone] = useMediaQuery('(max-width: 500px)')

  return (
    <Flex flexDir="column" maxW="1200px" margin="50px auto" w="100%" p="0 20px">
      {forms &&
        forms.map((form) => (
          <SingleForm
            form={form}
            handleDelete={handleDelete}
            key={form._id}
            isPhone={isPhone}
          />
        ))}
    </Flex>
  )
}

export default AllForms
