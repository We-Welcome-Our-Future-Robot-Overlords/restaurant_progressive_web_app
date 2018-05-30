var socket = io();

var update_count = 0;
function initSocket(rstrntID) {
    socket.emit('joining', rstrntID)
    socket.on('new review', function(){
        update_count++;
        document.getElementById('new_review').innerHTML = update_count + ' New Review had been sent, refresh to receive';
        $('#new_review_alert').show();
    })
}

function updateIO() {
    var rstrntID = document.getElementById("rstrnt_id").value
    socket.emit('send review', rstrntID);
}