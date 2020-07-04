import createApp from './app'
import http from 'http'
import { HTTP_PORT } from './config'
//
;(async () => {
  try {
    const { app, server } = createApp()
    const httpServer = http.createServer(app)
    server.installSubscriptionHandlers(httpServer)
    httpServer.listen(HTTP_PORT, () => {
      console.log(`http://localhost:${HTTP_PORT}${server.graphqlPath}`)
      console.log(`ws://localhost:${HTTP_PORT}${server.subscriptionsPath}`)
    })
  } catch (e) {
    console.log(e)
  }
})()
