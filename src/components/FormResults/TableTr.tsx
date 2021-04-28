import React, { memo } from 'react'
import dayjs from 'dayjs'
import { Tr, Td } from '@chakra-ui/react'
import { Answer } from '@types'

interface Props {
  el: Answer
}
const TableTr = memo<Props>(({ el }) => {
  return (
    <Tr>
      {el.answers.map((el) => (
        <Td key={el._id}>
          {Array.isArray(el.answer) ? el.answer.join(' ') : el.answer}
        </Td>
      ))}
      <Td>{dayjs(el.createdAt).format('MM-DD-YYYY HH:mm:ss')}</Td>
    </Tr>
  )
})

TableTr.displayName = 'Table tr'

export default TableTr
