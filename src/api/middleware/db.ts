import { NextApiRequest, NextApiResponse } from 'next'
import { NextHandler } from 'next-connect'
import mongoose from 'mongoose'

const datebaseMiddleware = async (
  req: NextApiRequest,
  res: NextApiResponse,
  next: NextHandler
) => {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.DATEBASE_URI as string, {
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useNewUrlParser: true,
    })
  }
  next()
}

export default datebaseMiddleware
