/**
 * Module to store and get image url.
 * This module only provides some API for another modules.
 * It actually depends on Redis.
 */
var redis = require('redis');

var rediscli = redis.createClient();

// TODO: Configurable
var IMAGE_URL_SET_KEY = 'adeleine.image_url_set';

/**
 * Storing an image url to a set.
 */
function store_image_url(value, callback) {
    return rediscli.sadd(IMAGE_URL_SET_KEY, value, callback);
}

/**
 * Getting an image url from set randomly.
 */
function get_random_image_url(callback) {
    return rediscli.srandmember(IMAGE_URL_SET_KEY, 1, function(err, ret) {
        if (err) {
            return callback(err, null);
        }
        if (ret.length == 0) {
            return callback(null, null);
        }

        return callback(null, ret[0]);
    });
}


module.exports = {
    store_image_url: store_image_url,
    get_random_image_url: get_random_image_url
};
