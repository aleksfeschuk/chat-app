const express = require('express');
const path = require('path');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));

const messages = [
    {
        text: 'Hi there!',
        user: 'Amando',
        added: new Date()
    },
    {
        text: "Hello World!",
        user: 'Charles',
        added: new Date()
    }
];

app.get('/', (req, res) => {
    res.render('index', {title: 'Mini Messageboard', messages: messages });
});

app.get('/new', (req, res) => {
    res.render('form', { title: 'New Message' });
});

app.get('/message/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const message = messages[id];
    if (message) {
        res.render('message', { title: 'Message Details', message: message });
    } else {
        res.status(404).send('Message not found');
    }
});

app.post ('/new', (req, res) => {
    const { messageText, messageUser } = req.body;
    if (messageText && messageUser) {
        messages.push({ text: messageText, user: messageUser, added: new Date() });
    }
    res.redirect('/');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});