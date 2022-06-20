import express from 'express'
import cors from 'cors'

const server = express()

server.use(express.json());
server.use(cors())


const data = []

let user = {
    username: "username", 
    avatar: "avatarPicture"
}
server.post('/sign-up', (request, response)=>{
    user = request.body
    if(user.username=="" || user.avatar==""){
        response.status(400).send("Todos os campos são obrigatórios!")
    }
    response.status(201).send("OK")

})

server.get('/tweets', (request, response)=>{
    if(data.length>10){
        data.shift()
    response.send(data)
    }
    else{
        response.status(201).send(data)
    }
})


server.post('/tweets', (request, response)=>{
    const newTweet = request.body.tweet
    if(user.username=="" || newTweet==""){
        response.status(400).send("Todos os campos são obrigatórios!")
    }
    else{
        const newdata = {username: user.username,
            avatar: user.avatar,
            tweet: newTweet}
    
        data.push(newdata)
       
        response.status(201).send("OK")
    }
  
})

server.get('/tweets/:USERNAME', (req, res) => {
    const username = req.params.USERNAME;

    const dataUser = data.filter(user=>user.username===username)

    res.send(dataUser)
  });
server.listen(5000)
