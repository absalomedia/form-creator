import {
  Table,
  TableCaption,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Spinner,
  Center,
} from '@chakra-ui/react'
import { useSingleFormDetails } from '@hooks'
import ErrorInfo from 'components/Dashboard/ErrorInfo'
import React from 'react'

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
      {!isLoading && !isError && (
        <>
          <Thead>
            <Tr>
              {data?.form.fields.map((el) => (
                <Th key={el.id}>{el.label}</Th>
              ))}
            </Tr>
          </Thead>
          <TableCaption>
            <b>{data?.form.title} form</b>
          </TableCaption>
          <Tbody>
            {data?.answers.map((el) => (
              <Tr key={el._id}>
                {el.answers.map((el) => (
                  <Td key={el._id}>
                    {Array.isArray(el.answer) ? el.answer.join(' ') : el.answer}
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </>
      )}
    </Table>
  )
}

export default FormResults
