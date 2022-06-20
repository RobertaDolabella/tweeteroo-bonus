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

server.get('/tweets?page', (request, response) => {
    const params = new URLSearchParams('/tweets?page')
    const page = params.get("page")
   
    if(data.length>10 && page!==1){ 
    const totalpages = Math.ceil(data.length/10)
    if(page>totalpages){
        response.status(400)
    }else{
        let pages = []
        for(let itens=0; itens<data.length; itens= itens+10){
        let add = data.splice(itens, itens+10)
        pages.push({add})    
        }
        let pagesToReturn =[]
        for(let until=0; until<=page; until++){
        pagesToReturn.push(pages[until])
        }
        response.send(pagesToReturn)
        }
    }
})
 
server.get('/tweets', (request, response)=>{
    if(data.length>10){
        let datareverse = []
        for(let datas=data.length-1;datas>=data.length-10; datas--){
            datareverse.push(data[datas])
        }
    response.status(201).send(datareverse)
    }
    else{
        let datareverse = []
        for(let datas=data.length-1;datas>=0; datas--){
            datareverse.push(data[datas])
        }
        response.status(201).send(datareverse)
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

server.get('/tweets/:USERNAME', (request, response) => {
    const username = request.params.USERNAME;

    const dataUser = data.filter(user=>user.username===username)

    response.send(dataUser)
  });



server.listen(5000)
