/**
 * RotundaLogger is a class that logs errors to a file and sends an email
 * if there are too many errors in a given time period.
 * @param {Object} options - options for the logger
 * @param {number} options.maxErrorsPerMinute - the maximum number of errors per minute. Default is 10.
 * @param {number} options.emailCooldown - the minimum time between emails. Default is 60000 (1 minute).
 */
class RotundaLogger {
  constructor(options = {}) {
    this.options = Object.assign({}, { maxErrorsPerMinute: 10, emailCooldown: 60000 }, options);

    // this could be stored in a cache like Redis or Memcached just in case the server restarts or crashes.
    this.errorTimestamps = [];
    this.lastSentEmailTimestamp = 0;
  }

  logError(error) {
    // log error to file

    const now = Date.now();
    const oneMinuteAgo = now - 60000;

    this.errorTimestamps.push(now);

    const errorsInLastMinute = this.errorTimestamps.filter(timestamp => timestamp > oneMinuteAgo).length;

    const reachedMaxErrorsPerMinute = errorsInLastMinute > this.options.maxErrorsPerMinute;
    if (reachedMaxErrorsPerMinute) {
      // remove the oldest error timestamp, keeping only the most recent maxErrorsPerMinute errors
      // the diffence between the other implementation is that in a hight frequency scenario, the array could grow indefinitely
      this.errorTimestamps = this.errorTimestamps.slice(-(this.options.maxErrorsPerMinute));
    }

    const reachedEmailCooldown = now - this.lastSentEmailTimestamp > this.options.emailCooldown;

    if (reachedMaxErrorsPerMinute && reachedEmailCooldown) {
      this.sendEmail(error);
      this.lastSentEmailTimestamp = now;
    }
  }

  sendEmail(error) {
    // send email
  }
}

module.exports = {
  RotundaLogger
};