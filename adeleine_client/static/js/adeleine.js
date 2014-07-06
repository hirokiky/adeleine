var MAX_IMAGES_NUM = 5;
var MAX_NOTICES_NUM = 5;

function AdeleineViewModel() {
    var self = this;
    self.ws = new WebSocket('ws://127.0.0.1:8888');
    self.images = ko.observableArray([]);
    self.notices = ko.observableArray([]);
    self.image_url = ko.observable('');

    self.post_image = function() {
        var url = self.image_url();
        self.ws.send(JSON.stringify({
            imageUrl: url
        }));
    };

    /* WebSocket */
    self.ws.onmessage = function(event) {
        var images, notices,
            message = JSON.parse(event.data);
        if (message.noticeStatus) {
            notices = self.notices();
            queue_push(notices, MAX_NOTICES_NUM, message);
            self.notices(notices);
        } else {
            images = self.images();
            queue_push(images, MAX_IMAGES_NUM, message);
            self.images(images);
        }
    };
    self.ws.onopen = function() {
        console.log("Connected to WebSocket server");
    };
}
ko.applyBindings(new AdeleineViewModel());
