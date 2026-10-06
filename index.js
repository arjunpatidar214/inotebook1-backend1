const connectToMongo = require('./db');
const express = require('express');
const app = express()
connectToMongo();
const port = 5000

app.use(express.json()) //middleware body hai

  
  //Available Routes
app.use('/api/auth', require('./routes/auth'))   
app.use('/api/notes', require('./routes/notes'))


app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})
