import nc from 'next-connect'
import {
  errorHandler,
  databaseMiddleware,
  asyncHandler,
  createForm,
} from '@api'

const handler = nc({ attachParams: true, onError: errorHandler })
  .use(databaseMiddleware)
  .post('/api/form', asyncHandler(createForm))

export default handler
