const app = require('express')()
app.get('/getJSON', (req, res) => {
  const temp = `<!DOCTYPE html>
    <html lang="en">
      <head>
      <meta property="og:url" content="https://punkrockcompound.com/bands/86">
      <meta property="og:type" content="website">
      <meta property="og:title" content="this is my new meta tag">
      <meta property="og:description" content="my best description ever ">
      <meta property="og:image" content="https://punkrockcompund.s3.amazonaws.com/akshay_chauhan_1_Sgz_Vj4_Pfa4_unsplash_cc8e9b1203.jpg">
      </head>
      <body>
      </body>
    </html>`
  res.send(temp)
})

module.exports = app
