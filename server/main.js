import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send("Hi!")
})

app.listen(8081, () => {
  
})
