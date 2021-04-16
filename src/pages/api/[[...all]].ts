import nc from 'next-connect'
import {
  errorHandler,
  databaseMiddleware,
  asyncHandler,
  createForm,
  getForms,
} from '@api'

const handler = nc({ attachParams: true, onError: errorHandler })
  .use(databaseMiddleware)
  .get('/api/get-forms', asyncHandler(getForms))
  .post('/api/form', asyncHandler(createForm))

export default handler
