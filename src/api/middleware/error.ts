/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextApiRequest, NextApiResponse } from 'next'
import { NextHandler } from 'next-connect'

class ErrorWithHttpCode extends Error {
  code: number

  constructor(message: string, code: number) {
    super(message)
    this.code = code
  }
}

const errorHandler = (
  error: ErrorWithHttpCode,
  _req: NextApiRequest,
  res: NextApiResponse,
  _next: NextHandler
) => {
  res
    .status(error.code || 500)
    .send({ message: error.message || 'Internal server error' })
}

export { ErrorWithHttpCode, errorHandler }
