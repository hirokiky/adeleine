/**
 * Main module to launch an adeleine server.
 */
var jsonschema = require('jsonschema');
var ws = require('ws');

var schema = require('./schema');
var imagestore = require('./imagestore');
var response = require('./response');

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
            server.broadcast(response.image_response(ret, "Server"));
        }
    });
};


server.on('connection', function(socket) {
    socket.send(response.notice_response(200, "Successfully connected"));
    socket.on('message', function(data) {
        var message, validated;
        try {
            message = JSON.parse(data);
        } catch (e) {
            socket.send(response.notice_response(400, "Invalid request"));
            return;
        }
        validated = jsonschema.validate(message, schema.messageSchema);
        if (validated.errors.length !== 0) {
            socket.send(response.notice_response(400, "Invalid message"));
            return;
        }
        imagestore.store_image_url(message.imageUrl, function() {
            socket.send(response.notice_response(200, "Image stored:" + message.imageUrl));
        });

        server.broadcast(response.image_response(
            message.imageUrl,
            socket.upgradeReq.connection.remoteAddress
        ));
    });

    setInterval(server.send_random_image_url, 60 * 1000);
});
