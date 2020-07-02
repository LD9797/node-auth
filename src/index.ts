import * as express from 'express'
import * as session from 'express-session'

const startServer = async () => {
  const app = express()
  app.use(
    session({
      secret: 'asdjlfkaasdfkjlads',
      resave: false,
      saveUninitialized: false,
    })
  )
  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000`)
  )
}

startServer().then(() => console.log('Done'))
