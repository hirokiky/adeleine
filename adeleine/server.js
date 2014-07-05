var jsonschema = require('jsonschema');
var ws = require('ws');

var schema = require('./schema');

var server = new ws.Server({port: 8888}, function() {
    console.log("Adeleine woke up on 0.0.0.0:8888")
});

server.on('connection', function(socket) {
    socket.on('message', function(data) {
        try {
            var message = JSON.parse(data);
        } catch(e) {
            socket.send("Invalid request");
            return
        }
        var validated = jsonschema.validate(message, schema.messageSchema);
        if (validated.errors.length != 0) {
            socket.send("Invalid message");
            return
        }

        server.clients.forEach(function(client) {
            client.send(data);
        })
    });
});
