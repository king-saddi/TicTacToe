var socket = io();

function sendMessage() {
    var msg = document.getElementById('m');
    socket.emit('message', msg.value);
    msg.value = '';
    return false;
}

socket.on('message', function(msg){
    console.log('The message reached the browser:' + msg);

    var node = document.createElement("li");
    var textnode = document.createTextNode(msg);
    node.appendChild(textnode);
    var chatRoom = document.getElementById('messages').appendChild(node);


});