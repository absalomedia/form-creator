import nc from 'next-connect'
import { errorHandler, databaseMiddleware } from '@api'
const handler = nc({ attachParams: true, onError: errorHandler })
  .use(databaseMiddleware)
  .get('/api', (req, res) => {
    res.json({ message: 'working' })
  })

export default handler
