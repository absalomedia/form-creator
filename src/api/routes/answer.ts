/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorWithHttpCode } from 'api/middleware/error'
import { FormModel, AnswerModel } from '@models'
import { NextApiResponse } from 'next'
import { NextHandler } from 'next-connect'
import { RequestWithParams } from './form'

const createAnswer = async (
  req: RequestWithParams,
  res: NextApiResponse,
  _next: NextHandler
) => {
  const { formId } = req.params
  const { answers } = req.body

  const form = await FormModel.findById(formId)

  if (!form) {
    throw new ErrorWithHttpCode('Cannot find given form', 404)
  }

  const answer = await AnswerModel.create({
    formId: form._id,
    answers: Object.values(answers),
  })

  res.json({ answer })
}

export { createAnswer }
