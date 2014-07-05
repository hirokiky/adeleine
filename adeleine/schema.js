/* TODO: Need more validation*/
/**
 * A schema for client messagess.
 */
var messageSchema = {
    "type": "object",
    "properties": {
        "imageUrl": {"type": "string", "required": true}
    }
};

module.exports = {
    messageSchema: messageSchema
};
