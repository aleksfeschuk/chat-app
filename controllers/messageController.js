const messages = require('../data/messages');

exports.getIndex = (req, res) => {
    res.render('index', {
        title: 'Mini Message Board',
        messages: messages,
    });
};

exports.getNewForm = (req, res) => {
    req.render('form', { title: 'New Message' });
};

exports.postNewMessage = (req, res) => {
    const newMessage = {
        id: messages.length + 1,
        text: req.body.messageText, 
        user: req.body.messageUser,
        added: new Date(),
    };
    messages.push(newMessage);
    res.redirect('/')
}

exports.getMessageDetails = (req, res) => {
    const message = messages.find((msg) => msg.id === parseInt(req.params.id));
    if(!message) {
        return res.status(404).send('Message not found');
    }
    res.render('message', {
        title: 'Message Details',
        message: message,
    });
};