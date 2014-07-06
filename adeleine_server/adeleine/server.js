/**
 * Main module to launch an adeleine server.
 */
var jsonschema = require('jsonschema');
var ws = require('ws');

var schema = require('./schema');
var imagestore = require('./imagestore');

var server = new ws.Server({port: 8888}, function() {
    console.log("Adeleine woke up on 0.0.0.0:8888");
});

server.broadcast = function(data) {
    this.clients.forEach(function(client) {
        client.send(data);
    });
};
server.send_random_image_url = function() {
    imagestore.get_random_image_url(function(err, ret) {
        if (!err && ret) {
            server.broadcast(JSON.stringify({imageUrl: ret, client: "Server"}));
        }
    });
};


server.on('connection', function(socket) {
    socket.on('message', function(data) {
        var message, validated;
        try {
            message = JSON.parse(data);
        } catch (e) {
            socket.send("Invalid request");
            return;
        }
        validated = jsonschema.validate(message, schema.messageSchema);
        if (validated.errors.length !== 0) {
            socket.send("Invalid message");
            return;
        }
        imagestore.store_image_url(message.imageUrl, function() {
            socket.send("Image stored");
        });

        message.client = socket.upgradeReq.connection.remoteAddress;
        server.broadcast(JSON.stringify(message));
    });

    setInterval(server.send_random_image_url, 60 * 1000);
});
