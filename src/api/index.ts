import databaseMiddleware from './middleware/db'
import { errorHandler } from './middleware/error'
import asyncHandler from './asyncHandler'
import { createForm, getForms, getSingleForm } from './routes/form'
import { createAnswer } from './routes/answer'

export {
  databaseMiddleware,
  errorHandler,
  asyncHandler,
  createForm,
  getForms,
  getSingleForm,
  createAnswer,
}
