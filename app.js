const express = require("express")

const port = 9417
const app = express()

app.use(express.json())

const pelisDB = []
let id = 1

app.get('/', (req, res) => {
    res.json({
        message: 'OK'
    })
})

app.get('/pelis', (req, res)=>{
    res.status(200).json(pelisDB)
})

app.post('/pelis', (req, res)=>{
    const {title, year, director} = req.body

    if (title && year && director){
        const newPelis = {
            id: id++,
            title,
            year,
            director
        }
        pelisDB.push(newPelis)
        res.status(200).json(newPelis)
    }else{
        res.status(400).json({message: "Invalid Data"})
    }
})

app.get('/pelis/:id', (req, res)=>{
    const id = req.params.id
    const pelis = pelisDB.find(item =>  item.id == id)
    if (pelis){
        res.status(200).json(pelis)
    } else {
        res.status(400).json({message: "Invalid Id"})
    }
})

app.listen(port, () => {
    console.log(`server started at port ${port}`)
})
