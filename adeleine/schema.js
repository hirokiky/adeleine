/* TODO: Need more validation*/
var messageSchema = {
    "type": "object",
    "properties": {
        "imageUrl": {"type": "string", "required": true}
    }
};

module.exports = {
    messageSchema: messageSchema
};
