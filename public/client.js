const socket = io();

let Name;
let msgarea = document.querySelector(".message_area");
let textarea = document.querySelector("#textarea")
do {
    Name = prompt("please enter your name")
}while(!Name)

textarea.addEventListener('keyup' , (e) => {
    if(e.key == 'Enter') {
        sendMessage(e.target.value)
    }
})

function sendMessage(msg){
    let mesg = {
        user : Name , 
        message : msg.trim()
    }
    // appendmessage
    appendMessage(mesg , 'outgoing');
    textarea.value = ''
    scrollToBottom()

    // send it to server
    socket.emit('message' , mesg)
}




function appendMessage(msg , type){
    let myDiv = document.createElement('div')
    let className = type
    myDiv.classList.add(className , "message")
    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `
    myDiv.innerHTML = markup
    msgarea.appendChild(myDiv)
}

// reecieve message
socket.on("message" , (msg) => {
    appendMessage(msg , 'incoming')
    scrollToBottom()
})

function scrollToBottom() {
    msgarea.scrollTop = msgarea.scrollHeight
}