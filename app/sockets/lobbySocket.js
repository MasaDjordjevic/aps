import Games from '../Redis/Games';

var users = {};

module.exports = function (socket) {

    var name = '';
    var creatorName = '';
    console.log('user connected to lobbySocket');

    socket.on('join', (creatorUsername, username) => {
        name = username;
        creatorName = creatorUsername;

        Games.addToLobby(creatorUsername, username, creatorUsername === username)
            .then(() => {
                Games.getLobby(creatorUsername)
                    .then((users)=>  socket.emit('init', users));
                socket.broadcast.emit('user:join', username);
            });
    });

    socket.on('user:ready', (username) => {
        Games.setUserReadyFromLobby(creatorName, username, 'true');
        console.log('user ready: ' + username);
        socket.broadcast.emit('user:ready', username);
    });

    socket.on('game:started', () => {
        Games.setGameState(creatorName, 'started');
        socket.broadcast.emit('game:started');
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
        Games.removeFromLobby(creatorName, name);
        socket.broadcast.emit('user:left', name);
    });



};