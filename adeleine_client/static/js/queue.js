/**
 * Module to handle Array as queue which has max length.
 */
function queue_push(array, num, member) {
    var fired;

    if (array.length >= num) {
        fired = array.pop();
    } else {
        fired = null;
    }
    array.unshift(member);
    return fired;
}
