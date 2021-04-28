import {
  Table,
  TableCaption,
  Tbody,
  Th,
  Thead,
  Tr,
  Spinner,
  Center,
} from '@chakra-ui/react'
import { useSingleFormDetails } from '@hooks'
import ErrorInfo from 'components/Dashboard/ErrorInfo'
import React from 'react'
import TableTr from './TableTr'
interface Props {
  id: string
}

const FormResults = ({ id }: Props) => {
  const { data, isLoading, isError } = useSingleFormDetails(id)

  if (isLoading) {
    return (
      <Center w="100%" h="500px">
        <Spinner size="lg" />
      </Center>
    )
  }

  if (isError) {
    return <ErrorInfo />
  }

  return (
    <Table variant="simple" w="100%" margin="0 20px" overflow="auto">
      <Thead>
        <Tr>
          {data?.form.fields.map((el) => (
            <Th key={el.id}>{el.label}</Th>
          ))}
          <Th>Date of submit</Th>
        </Tr>
      </Thead>
      <TableCaption>
        <b>{data?.form.title} form</b>
      </TableCaption>
      <Tbody>
        {data?.answers.map((el) => (
          <TableTr el={el} key={el._id} />
        ))}
      </Tbody>
    </Table>
  )
}

export default FormResults
