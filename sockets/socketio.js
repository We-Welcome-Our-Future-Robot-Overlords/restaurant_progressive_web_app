module.exports = function (io) {
    io.on('connection', function (socket) {
        socket.on('joining', function (rstrntID) {
            socket.join(rstrntID);
        });
        socket.on('send review', function (rstrntID, data) {
            console.log(data)
            io.sockets.in(rstrntID).emit('new review', data);
        });
    });
};