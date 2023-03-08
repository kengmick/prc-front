const app = require('express')()
app.get('/getJSON', (req, res) => {
  fetch(`https://punkrockcompound-backend-lb57o.ondigitalocean.app/bands/86`)
    .then((response) => response.json())
    .then((data) => {
      const temp = `<!DOCTYPE html>
        <html lang="en">
          <head>
          <meta property="og:url" content="https://punkrockcompound.com/bands/86">
          <meta property="og:type" content="website">
          <meta property="og:title" content="this is my new meta tag">
          <meta property="og:description" content="my best description ever ">
          <meta property="og:image" content="${data.bandProfileImg.url}">
          </head>
          <body>
          </body>
        </html>`
      res.send(temp)
    })
})

module.exports = app
