const clear = document.querySelector('#button-clear')
const colors = document.querySelector('#block-colors')
const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')
const socket = io()


socket.on('history', (history) => {
    drawHistory(history)
})

socket.on('draw', (circle) => {
    drawCircle(circle)
})

socket.on('clear', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
})

const mouse = { x: 0, y: 0 }
const canvX = () => canvas.getBoundingClientRect().x
const canvY = () => canvas.getBoundingClientRect().y

let draw = false
let color = 'black'

let drawing = false

canvas.onmousedown = (e) => {
    let x = e.offsetX
    let y = e.offsetY
    const circle = { x, y, color }
    drawCircle(circle)
    drawing = true
    socket.emit('draw', circle)
}

canvas.onmousemove = (e) => {
    if (drawing) {
        let x = e.offsetX
        let y = e.offsetY
        const circle = { x, y, color }
        drawCircle(circle)
        socket.emit('draw', circle)
    }
}

canvas.onmouseup = (e) => {
    drawing = false
}

canvas.onmouseout = (e) => {
    drawing = false
}


canvas.ontouchstart = (e) => {
    let x = e.touches[0].clientX - canvX()
    let y = e.touches[0].clientY - canvY()
    const circle = { x, y, color }
    drawCircle(circle)
    socket.emit('draw', circle)
    return false;
}

canvas.ontouchmove = (e) => {
    let x = e.touches[0].clientX - canvX()
    let y = e.touches[0].clientY - canvY()
    const circle = { x, y, color }
    drawCircle(circle)
    socket.emit('draw', circle)
    return false;
}

canvas.ontouchend = (e) => {
    return false;
}

// canvas.addEventListener("click", (e) => {
//     let x = e.offsetX
//     let y = e.offsetY
//     const circle = { x, y, color }
//     drawCircle(circle)
//     socket.emit('draw', circle)
// })

function drawCircle(circle) {
    ctx.beginPath()
    ctx.strokeStyle = circle.color
    ctx.arc(circle.x, circle.y, 5, 0, 2 * Math.PI)
    ctx.fillStyle = circle.color
    ctx.fill()
    ctx.stroke()
}

clear.onclick = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    socket.emit('clear')
}

colors.onclick = (e) => {
    color = e.path[0].style.backgroundColor
}

function drawHistory(history) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    history.forEach(circle => {
        drawCircle(circle)
    });
}