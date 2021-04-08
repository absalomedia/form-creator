/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextApiRequest, NextApiResponse } from 'next'
import { NextHandler } from 'next-connect'

class ErrorWithHttpCode extends Error {
  constructor(message: string, private _code: number) {
    super(message)
  }

  get code() {
    return this._code
  }
}

const errorHandler = (
  error: ErrorWithHttpCode,
  _req: NextApiRequest,
  res: NextApiResponse,
  _next: NextHandler
) => {
  res
    .status(error.code | 500)
    .send({ message: error.message || 'Internal server error' })
}

export { ErrorWithHttpCode, errorHandler }
