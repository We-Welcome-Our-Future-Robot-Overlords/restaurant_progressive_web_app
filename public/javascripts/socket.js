var socket = io();

function initSocket(rstrntID) {
    socket.emit('joining', rstrntID)
    socket.on('new review', function(data){
        document.getElementById('new_review').innerHTML = data;
    })
}

function updateIO(data) {
    var rstrntID = document.getElementById("rstrnt_id").value
    socket.emit('send review', rstrntID, data);
}