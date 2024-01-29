const { RotundaLogger } = require('./rotunda-logger');

describe('Rotunda Logger', () => {
  it('should log an error', () => {
    const logger = new RotundaLogger();

    logger.logError('test');

    expect(logger.errorTimestamps).toHaveLength(1);
  });

  it('should send email', () => {
    const logger = new RotundaLogger({ maxErrorsPerMinute: 1 });
    jest.spyOn(logger, 'sendEmail');

    logger.logError('test');
    logger.logError('test');

    expect(logger.sendEmail).toHaveBeenCalledTimes(1);
  });

  it('should not send email if max errors per minute is not reached', () => {
    const logger = new RotundaLogger({ maxErrorsPerMinute: 2 });
    jest.spyOn(logger, 'sendEmail');

    logger.logError('test');

    expect(logger.errorTimestamps).toHaveLength(1);
    expect(logger.sendEmail).not.toHaveBeenCalled();
  });

  it('should send email again after email cooldown is reached', () => {
    jest.useFakeTimers();
    const logger = new RotundaLogger({ maxErrorsPerMinute: 1, emailCooldown: 1000 });
    jest.spyOn(logger, 'sendEmail');

    logger.logError('test');
    logger.logError('test');
    expect(logger.sendEmail).toHaveBeenCalledTimes(1); // Email is sent since email cooldown has been reached because its initial value is 0

    jest.advanceTimersByTime(500);

    logger.logError('test');
    logger.logError('test');
    expect(logger.sendEmail).toHaveBeenCalledTimes(1); // Email is not sent again because email cooldown is not reached yet

    // Advance time by another 1000 ms, exceeding the cooldown period
    jest.advanceTimersByTime(1000);

    logger.logError('test');
    expect(logger.sendEmail).toHaveBeenCalledTimes(2); // Email should be sent again now

    jest.useRealTimers();
  });

  it('should not send an email if diff between error timestamps exceeds one minute', () => {
    jest.useFakeTimers();
    const logger = new RotundaLogger({ maxErrorsPerMinute: 1, emailCooldown: 1000 });
    jest.spyOn(logger, 'sendEmail');

    logger.logError('test');
    expect(logger.sendEmail).not.toHaveBeenCalled();

    jest.advanceTimersByTime(61000);

    logger.logError('test');
    expect(logger.sendEmail).not.toHaveBeenCalled();

    jest.useRealTimers();
  });
});