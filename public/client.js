const socket = io();
let userName;

let textarea = document.querySelector("#textarea"
)

let messageArea = document.querySelector(".message_area");

do {
    userName = prompt('Please enter your name');
} while (userName == null || userName === "")




textarea.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        sendMessage(e.target.value);
    }
})

function sendMessage(msg) {

    let msgObj = {
        user: userName,
        message: msg.trim()
    }
    //append msgObj
    appendMessage(msgObj, 'outgoing')

    textarea.value = '';
    scrollToBottom();
    //send to the server

    socket.emit('message', msgObj)

}

function appendMessage(msg, type) {

    let mainDiv = document.createElement('div')
    let className = type;
    mainDiv.classList.add(className, 'message')


    let markup = `
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup;
    messageArea.appendChild(mainDiv)
}


// Recive the message

socket.on('message', (msg) => {
    console.log(msg);
    appendMessage(msg, 'incomming')
    scrollToBottom();
})


function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight;
}