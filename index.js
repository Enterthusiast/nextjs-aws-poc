const { createServer } = require('http')
const next = require('next')
const dev = (process.env.NODE_ENV || '').startsWith('dev')
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer(handle).listen(2999, err => {
    if (err) throw err
    console.log('> Ready on http://localhost:2999')
  })
})