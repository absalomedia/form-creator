import databaseMiddleware from './middleware/db'
import { errorHandler } from './middleware/error'
import asyncHandler from './asyncHandler'
import { createForm, getForms, getSingleForm } from './routes/form'

export {
  databaseMiddleware,
  errorHandler,
  asyncHandler,
  createForm,
  getForms,
  getSingleForm,
}
