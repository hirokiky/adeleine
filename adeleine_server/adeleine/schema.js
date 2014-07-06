/**
 * A schema for client messagess.
 */
/* TODO: Need more validation*/
var messageSchema = {
    "type": "object",
    "properties": {
        "imageUrl": {"type": "string", "required": true},
        "client": {"type": "string", "required": false}
    }
};

module.exports = {
    messageSchema: messageSchema
};
