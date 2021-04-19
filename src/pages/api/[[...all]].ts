import nc from 'next-connect'
import {
  errorHandler,
  databaseMiddleware,
  asyncHandler,
  createForm,
  getForms,
  getSingleForm,
} from '@api'

const handler = nc({ attachParams: true, onError: errorHandler })
  .use(databaseMiddleware)
  .get('/api/get-forms', asyncHandler(getForms))
  .post('/api/form', asyncHandler(createForm))
  .get('/api/forms/:id', asyncHandler(getSingleForm))

export default handler
