import express from 'express'

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.json({
    "message": "Welcome to Leyjo. This is a free API service for testing. You can add some body, headers, query etc...",
    "github": "https://github.com/stormyzio/leyjo",
    "routes": {
      "/": {
        "method": "GET",
        "need": "Nothing",
        "description": "The home, returns this message."
      },
      "/echo": {
        "method": "POST",
        "need": "Body",
        "description": "Returns the request body."
      },
      "/search?letter=[letter]": {
        "method": "GET",
        "need": "Query",
        "description": "Returns the letter before and after the given letter."
      },
      "/auth/create": {
        "method": "POST",
        "need": "Body and Headers",
        "description": "Set a body, a header and view the result!"
      },
    }
  })
})

app.post('/echo', (req, res) => {
  res.json(req.body)
})

app.get('/search', (req, res) => {
  const letter = req.query.letter
  if(!letter) return res.json({
    "message": "Please provide a letter."
  })

  const alphabet = 'abcdefghijklmnopqrstuvwxyz'
  const index = alphabet.indexOf(letter)
  const before = alphabet[index - 1]
  const after = alphabet[index + 1]
  res.json({
    "before": before,
    "after": after
  })
})

app.post('/auth/create', (req, res) => {
  const body = req.body
  const headers = req.headers
  res.json({
    "message": "Account created!",
    "body": body,
    "headers": headers,
    "ps": "There is no account system, this is just an example."
  })
})

app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
})