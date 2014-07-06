function image_response(url, client) {
    return JSON.stringify({
        imageUrl: url,
        client: client
    });
}
function notice_response(status, body) {
    return JSON.stringify({
        noticeStatus: status,
        message: body
    });
}

module.exports = {
    image_response: image_response,
    notice_response: notice_response
};
