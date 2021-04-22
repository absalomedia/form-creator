import { ObjectId } from 'mongoose'
import { Session } from '@auth0/nextjs-auth0'
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorWithHttpCode } from 'api/middleware/error'
import { FormModel, AnswerModel } from '@models'
import { NextApiResponse } from 'next'
import { NextHandler } from 'next-connect'
import { RequestWithParams } from './form'
import { getSession } from '@auth0/nextjs-auth0'

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

const getAllFormAnswers = async (
  req: RequestWithParams,
  res: NextApiResponse,
  _next: NextHandler
) => {
  const { formId } = req.params

  const session = getSession(req, res) as Session

  if (!session) {
    throw new ErrorWithHttpCode('User unauthorized', 401)
  }

  const form = await FormModel.findOne({
    _id: formId,
    userEmail: session.user.email,
  }).select({ userEmail: 0 })

  if (!form) {
    throw new ErrorWithHttpCode('Cannot find given form', 404)
  }

  const answers = await AnswerModel.find({
    formId: (formId as unknown) as ObjectId,
  }).select({ formId: 0, updatedAt: 0 })

  res.json({ form, answers })
}

export { createAnswer, getAllFormAnswers }
