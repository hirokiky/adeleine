/**
 * A schema for client posts
 */
var messageSchema = {
    "type": "object",
    "properties": {
        "imageUrl": {"type": "string", "required": true},
    }
};

module.exports = {
    messageSchema: messageSchema
};
