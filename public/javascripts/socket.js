var socket = io();

var update_count = 0;

/**
 * join room of current restaurant page, on hold for receiving new review notice
 * @param rstrntID join room with id = rstrntID
 */
function initSocket(rstrntID) {
    socket.emit('joining', rstrntID)
    socket.on('new review', function(){
        update_count++;
        document.getElementById('new_review').innerHTML = update_count + ' New Review had been sent, refresh to receive';
        $('#new_review_alert').show();
    })
}

/**
 * update socket of room with id = rstrnt_id
 */
function updateIO() {
    var rstrntID = document.getElementById("rstrnt_id").value
    socket.emit('send review', rstrntID);
}
