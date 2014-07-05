Adeleine
========

An image chat server.

Run
===

::

    npm install
    npm start

Trying
======

::

    wscat -c ws://127.0.0.1:8888/
    connected (press CTRL+C to quit)
    > {"imageUrl": "http://image.example.com/prettycat.jpg"}
    < {"imageUrl": "http://image.example.com/prettycat.jpg"}
    >

