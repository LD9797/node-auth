import createApp from './app'
import connectRedis from 'connect-redis'
import http from 'http'
import { HTTP_PORT, REDIS_OPTIONS } from './config'
import Redis from 'ioredis'
import session from 'express-session'
//
;(async () => {
  try {
    const RedisStore = connectRedis(session)
    const store = new RedisStore({ client: new Redis(REDIS_OPTIONS) })
    const { app, server } = await createApp(store)
    const httpServer = http.createServer(app)
    server.installSubscriptionHandlers(httpServer)
    httpServer.listen(HTTP_PORT, () => {
      console.log(`http://localhost:${HTTP_PORT}${server.graphqlPath}`)
      console.log(`ws://localhost:${HTTP_PORT}${server.subscriptionsPath}`)
    })
  } catch (e) {
    console.error(e)
  }
})()
