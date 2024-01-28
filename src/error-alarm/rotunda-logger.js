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
    this.errorTimestamps = [];
    this.lastSentEmailTimestamp = 0;
  }

  logError(error) {
    // log error to file

    const now = Date.now();
    this.errorTimestamps.push(now);

    const oneMinuteAgo = now - 60000;
    // remove timestamps older than one minute. this is a simple way to keep the array from growing too large.
    this.errorTimestamps = this.errorTimestamps.filter(timestamp => timestamp > oneMinuteAgo);
    
    const errorsInLastMinute = this.errorTimestamps.length;
    const reachedMaxErrorsPerMinute = errorsInLastMinute > this.options.maxErrorsPerMinute;
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