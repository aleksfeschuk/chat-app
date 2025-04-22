const socket = io();

const form = document.getElementById('new-message-form');
const input = document.getElementById('message-input');
const messagesList = document.querySelector('#messages ul');

socket.on('initMessages', (messages) => {
    messages.forEach((message) => {
        addMessage(message);
    });
});

socket.on('newMessage', (message) => {
    addMessage(message);
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (text) {
        socket.emit('sendMessage', text);
        input.value = '';
    }
});

function addMessage(message) {
    const li = document.createElement('li');
    li.textContent = `${message.text} (${new Date(message.createdAt).toLocaleTimeString()})`;
    messagesList.appendChild(li);
    messagesList.scrollTop = messagesList.scrollHeight;
}