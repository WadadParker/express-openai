import express from "express"
import { chatService } from './services/chatService.js'

const PORT = 3000

const app = express()
app.use(express.json())

app.get('/' , (req,res) => {
    res.send("Hello World!")
})

app.post('/api/chat',chatService)

app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`))