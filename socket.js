module.exports = (http) => {
    const sockets = []
    let history = []
    const io = require('socket.io')(http)
    io.on('connection', (socket) => {
        sockets.push(socket)
        socket.emit('history', history)
        
        socket.on('clear', () => {
            sockets.forEach(s => s.emit('clear'))
            history = []
        })

        socket.on('draw', (circle) => {
            history.push(circle)
            sockets.forEach(s => {
                if(s !== socket) {
                    s.emit('draw', circle)
                }
            })
        })
    })
}