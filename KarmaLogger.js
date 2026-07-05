/**
 * ==========================================================
 * Project KARMA
 * KarmaLogger.gs
 * ----------------------------------------------------------
 * Central logging utility.
 *
 * All application logging should go through this class.
 * ==========================================================
 */

class KarmaLogger {

  /**
   * Information messages
   */
  static info(event, details) {

    Logger.log("[LOG_LEVELS.INFO] [" + event + "] " + details);

    Repository.appendRow(
      SHEETS.APPLICATION_LOG,
      [
        new Date(),
        LOG_LEVELS.INFO,
        event,
        details
      ]
    );

  }

  /**
   * Warning messages
   */
  static warning(event, details) {

    Logger.log("[LOG_LEVELS.WARNING] [" + event + "] " + details);

    Repository.appendRow(
      SHEETS.APPLICATION_LOG,
      [
        new Date(),
        LOG_LEVELS.WARNING,
        event,
        details
      ]
    );

  }

  /**
   * Error messages
   */
  static error(event, details) {

    const message =
      (details instanceof Error)
        ? details.message
        : details;

    Logger.log("[LOG_LEVELS.ERROR] [" + event + "] " + message);

    Repository.appendRow(
      SHEETS.ERROR_LOG,
      [
        new Date(),
        event,
        message
      ]
    );

  }

}