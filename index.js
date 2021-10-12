const express = require("express")
const http = require("http")
// const { Socket } = require("socket.io")
const PORT  = process.env.PORT || 3000

const app = express()

const server = http.createServer(app)
const io = require("socket.io")(server)

app.use(express.static("public"))

app.get('/', (req, res) => {
    res.sendFile(__dirname + "public/index.html")
})

let connectedPeers = []

io.on("connection", (socket) => {

    connectedPeers.push(socket.id)
    socket.on("disconnect", () => {
        console.log("user disconnected")

        let newConnectedPeers = connectedPeers.filter((peerId) => {peerId !== socket.id})
        connectedPeers = newConnectedPeers
    })
    console.log("user connected to socket.io server")
    console.log(socket.id)
})


server.listen(PORT, () =>{ 
    console.log(`server running at port ${PORT}`)
})
