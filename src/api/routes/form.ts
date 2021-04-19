/* eslint-disable @typescript-eslint/no-unused-vars */
import OptionModel from 'models/Option'
import FormField from 'models/FormField'
import Form from 'models/Form'
import { IFormField } from '@store'
import { NextApiRequest, NextApiResponse } from 'next'
import { NextHandler } from 'next-connect'
import { getSession, Session } from '@auth0/nextjs-auth0'
import { ErrorWithHttpCode } from 'api/middleware/error'
import { assert } from 'superstruct'
import FormValidation from 'api/validation/form'

const createForm = async (
  req: NextApiRequest,
  res: NextApiResponse,
  _next: NextHandler
) => {
  const {
    formFields,
    title,
    description,
    completeTitle,
    completeDescription,
    dateOfExpire,
  } = req.body

  try {
    assert(
      {
        formFields,
        title,
        description,
        completeDescription,
        completeTitle,
        dateOfExpire,
      },
      FormValidation
    )
  } catch (error) {
    console.log(error)
    throw new ErrorWithHttpCode(
      'Form properties does not match given schema',
      400
    )
  }

  const user = getSession(req, res) as Session

  if (!user) {
    throw new ErrorWithHttpCode('User unauthorized', 401)
  }

  const fields = (formFields as IFormField[]).map((el) => {
    const { options, required, id, ...rest } = el

    const newField = new FormField({
      ...rest,
      name: rest.label.toLowerCase().split(' ').join('-'),
      require: required,
      id,
    })

    if (options) {
      const insertedOptions = options.map((option) => {
        return new OptionModel({ value: option })
      })

      newField.options = insertedOptions
    }

    return newField
  })

  await new Form({
    title,
    description,
    completeTitle,
    completeDescription,
    dateOfExpire,
    fields,
    userEmail: user.user.email,
  }).save()

  res.json({ success: true })
}

const getForms = async (
  req: NextApiRequest,
  res: NextApiResponse,
  _next: NextHandler
) => {
  const user = getSession(req, res) as Session

  if (!user) {
    throw new ErrorWithHttpCode('User unauthorized', 401)
  }

  const data = await Form.aggregate([
    { $match: { userEmail: user.user.email } },
    {
      $project: {
        fields: { $size: '$fields' },
        title: 1,
        description: 1,
        createdAt: 1,
        dateOfExpire: 1,
      },
    },
  ])

  res.json({ forms: data })
}

interface RequestWithParams extends NextApiRequest {
  params: {
    [key: string]: string
  }
}

const getSingleForm = async (
  req: RequestWithParams,
  res: NextApiResponse,
  _next: NextHandler
) => {
  const { id } = req.params

  const form = await Form.findById(id).select({ userEmail: 0 })

  if (!form) {
    throw new ErrorWithHttpCode('Cannot find form', 404)
  }

  res.json({ form })
}

export { createForm, getForms, getSingleForm }
