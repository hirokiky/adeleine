var MAX_MESSAGES_NUM = 5;

function AdeleineViewModel() {
    var self = this;
    self.ws = new WebSocket('ws://127.0.0.1:8888');
    self.messages = ko.observableArray([]);

    /* WebSocket */
    self.ws.onmessage = function(event) {
        var message = JSON.parse(event.data),
            messages = self.messages();
        queue_push(messages, MAX_MESSAGES_NUM, message);
        self.messages(messages);
    };
    self.ws.onopen = function() {
        console.log("Connected to WebSocket server");
    };
}
ko.applyBindings(new AdeleineViewModel());
