import express from "express"
import { chatService } from './services/chatService.js'

const PORT = 3000

const app = express()
app.use(express.json())

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
})

app.options('/*splat',(req,res) => {
    res.sendStatus(204);
})

app.get('/' , (req,res) => {
    res.send("Hello World!")
})

app.post('/api/chat',chatService)

app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`))