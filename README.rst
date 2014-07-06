Adeleine
========

An image chat server.

Run Chat Server
===============
::

    cd adeleine_server
    npm install
    npm start

Distribute the HTML
===================

Distribute `adeleine/adeleine_client` by using nginx or something.

Chatting locally
================
::

    wscat -c ws://127.0.0.1:8888/
    connected (press CTRL+C to quit)
    > {"imageUrl": "http://image.example.com/prettycat.jpg"}
    < {"imageUrl": "http://image.example.com/prettycat.jpg"}
    < Image stored
    >
    ... wait a moment, the server will broadcast random image.
    < {"imageUrl": "http://image.example.com/prettycat.jpg"}
    >

